import { ApplyMoveConditionRule, GameState, PlayerTargetType, RuleType } from '@repo/schemas';
import { ActionType, PromptAction } from '../actions/actions.types.js';
import { Prompt } from '../gamestate/gamestate.types.js';
import { createNActionObjects } from '../utils/actions.js';
import { createId } from '../utils/ids.js';
import { canPlayerMove } from '../utils/movability.js';
import { getPlayerIdsForPlayerTarget } from '../utils/playerTarget.js';
import { RuleHandlerFactory } from './rules.types.js';

export const handler: RuleHandlerFactory<ApplyMoveConditionRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { playerTarget } = rule;
    const { currentPlayer } = ctx;
    const candidateIds = getPlayerIdsForPlayerTarget(ctx, playerTarget);
    let requiresActions = false;

    if (playerTarget.type === PlayerTargetType.custom && candidateIds.length) {
      // Provide an action for the current player to choose who the effect should go to
      requiresActions = true;
      ctx.update_setPlayerActions<PromptAction>(
        [
          {
            id: createId(),
            playerId: currentPlayer.id,
            type: ActionType.promptSelectPlayer,
            candidateIds,
            initiator: rule.id,
          },
        ],
        'promptActions',
      );
    } else {
      // Set move condition for players
      candidateIds.forEach((pid) => {
        ctx.update_setPlayerEffectsPartial(pid, {
          moveCondition: {
            ruleId: rule.id,
            descriptionStrId: rule.condition.description,
            numCurrentSuccesses: 0,
          },
        });
      });
    }

    // Should only be used with self traget
    if (rule.condition?.immediate) {
      requiresActions = true;
      const numActions = 1; // Right now only 1 roll per turn is supported
      const actions = createNActionObjects({
        n: numActions,
        playerId: currentPlayer.id,
        initiator: rule.id,
      });
      ctx.update_setPlayerActions(actions);
    }

    if (!requiresActions) {
      ctx.update_setPromptActionsClosable();
    }
  },
  postActionExecute: (lastAction) => {
    const { arePromptActionsCompleted: isDone, allActions, currentPlayer, nextGame } = ctx;

    if (isDone) {
      const promptActions = allActions.filter((a) => (a as PromptAction).initiator === rule.id);

      if (rule.condition?.immediate) {
        // TODO - Currently this is only supported with self targets, but if that ever changes
        // this should be updated to account for there being player selection actions here

        if (rule.condition.allowIterativeRolling) {
          // ITERATIVE MODE: Process one roll at a time using the provided lastAction
          // Process the latest roll only - canPlayerMove manages success count internally
          const moveResult = canPlayerMove(ctx, currentPlayer.id, rule.condition, [
            lastAction?.result as number,
          ]);

          if (moveResult.canMove) {
            // Success! All required successes achieved - clear move condition and continue turn
            ctx.update_setPromptActionsClosable();
            ctx.update_setGamePrompt({
              ...nextGame.prompt,
              messageOverride: moveResult.message,
            } as Prompt);
          } else {
            // Check if this was a successful roll but more successes needed, or a failed roll
            if (moveResult.isPartialSuccess) {
              // Successful roll but need more successes - continue rolling in same turn
              ctx.update_setPlayerActions([
                {
                  id: createId(),
                  playerId: currentPlayer.id,
                  type: ActionType.promptRoll,
                  initiator: rule.id,
                },
              ]);
              ctx.update_setGamePrompt({
                ...nextGame.prompt,
                messageOverride: moveResult.message,
              } as Prompt);
            } else {
              // Failed roll - end turn, keep move condition for next turn
              ctx.update_setPromptActionsClosable();
              ctx.update_setGamePrompt({
                ...nextGame.prompt,
                messageOverride: moveResult.message,
                nextGameState: GameState.TurnEnd, // End the turn
              } as Prompt);
            }
          }
        } else {
          // ORIGINAL MODE: One roll per turn (default behavior)
          const rolls = promptActions.map((a) => a.result) as number[];
          const moveResult = canPlayerMove(ctx, currentPlayer.id, rule.condition, rolls);

          if (nextGame.metadata.state === GameState.RuleTrigger) {
            /**
             * (Meaning the success was achieved on the first try)
             *
             * Either if they succeeded or failed, allow the modal to be closed and the turn to end.
             * - If they succeeded, they will take their next turn normally.
             * - If they failed, they will still have the move condition attached and will be forced to reroll
             * upon their next turn starting.
             *
             * Next game state is (by default) RULE_END which is what we want here.
             */
            ctx.update_setPromptActionsClosable();
            ctx.update_setGamePrompt({
              ...nextGame.prompt,
              messageOverride: moveResult.message,
            } as Prompt);
          } else if (nextGame.metadata.state === GameState.TurnMultirollConditionCheck) {
            const nextGameState = moveResult.canMove ? GameState.RollStart : GameState.TurnEnd;

            ctx.update_setPromptActionsClosable();
            ctx.update_setGamePrompt({
              ...nextGame.prompt,
              nextGameState,
              messageOverride: moveResult.message,
            } as Prompt);
          }
        }
      } else {
        // This SHOULD be the custom player selection from above
        const playerId = String(promptActions[0]?.result);
        ctx.update_setPlayerEffectsPartial(playerId, {
          moveCondition: {
            ruleId: rule.id,
            descriptionStrId: rule.condition.description,
            numCurrentSuccesses: 0,
          },
        });
        ctx.update_setPromptActionsClosable();
      }
    }
  },
  ruleType: RuleType.ApplyMoveConditionRule,
});
