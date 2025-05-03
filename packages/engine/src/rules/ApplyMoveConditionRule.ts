import { ActionType } from '@repo/enums';
import { ApplyMoveConditionRule, GameState, PlayerTargetType, RuleType } from '@repo/schemas';
import { PromptAction } from '../actions/actions.types.js';
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
    let requiresActions = false;

    if (playerTarget.type === PlayerTargetType.custom) {
      // Provide an action for the current player to choose who the effect should go to
      requiresActions = true;
      ctx.update_setPlayerActions<PromptAction>(
        [
          {
            id: createId(),
            playerId: currentPlayer.id,
            type: ActionType.promptSelectPlayer,
            candidateIds: getPlayerIdsForPlayerTarget(ctx, playerTarget),
            initiator: rule.id,
          },
        ],
        'promptActions',
      );
    } else {
      // Set move condition for players
      const playerIds = getPlayerIdsForPlayerTarget(ctx, playerTarget);

      playerIds.forEach((pid) => {
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
      const actions = createNActionObjects({
        n: rule.condition.diceRolls?.numRequired || 1,
        playerId: currentPlayer.id,
        initiator: rule.id,
      });
      ctx.update_setPlayerActions(actions);
    }

    if (!requiresActions) {
      ctx.update_setPromptActionsClosable();
    }
  },
  postActionExecute: () => {
    const { arePromptActionsCompleted: isDone, allActions, currentPlayer, nextGame } = ctx;

    if (isDone) {
      const promptActions = allActions.filter((a) => (a as PromptAction).initiator === rule.id);

      if (rule.condition?.immediate) {
        // TODO - Currently this is only supported with self targets, but if that ever changes
        // this should be updated to account for there being player selection actions here
        const rolls = promptActions.map((a) => a.result) as number[];
        const moveResult = canPlayerMove(ctx, currentPlayer.id, rule.condition, rolls);

        if (Number(rule.condition?.diceRolls?.numRequired) > 1) {
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
            // TODO- update message override on the prompt based on moveResult
          } else if (nextGame.metadata.state === GameState.TurnMultirollConditionCheck) {
            const nextGameState = moveResult.canMove ? GameState.RollStart : GameState.TurnEnd;

            ctx.update_setPromptActionsClosable();
            ctx.update_setGamePrompt({
              ...nextGame.prompt,
              nextGameState,
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
      }

      ctx.update_setPromptActionsClosable();
    }
  },
  ruleType: RuleType.ApplyMoveConditionRule,
});
