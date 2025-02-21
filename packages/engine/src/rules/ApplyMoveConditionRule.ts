import { ActionType, PromptAction } from '../actions/actions.types.js';
import { GameState, Prompt } from '../gamestate/gamestate.types.js';
import { createNDiceRollActionObjects } from '../utils/actions.js';
import { createId } from '../utils/ids.js';
import { canPlayerMove } from '../utils/movability.js';
import {
  ApplyMoveConditionRule,
  PlayerTarget,
  RuleHandlerFactory
} from './rules.types.js';

export const handler: RuleHandlerFactory<ApplyMoveConditionRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { playerTarget } = rule;
    const { otherPlayerIds, currentPlayer } = ctx;
    let requiresActions = false;

    if (playerTarget === PlayerTarget.custom) {
      // Provide an action for the current player to choose who the effect should go to
      requiresActions = true;
      ctx.update_setPlayerActions<PromptAction>(
        currentPlayer.id,
        [{
          id: createId(),
          type: ActionType.promptSelectPlayer,
          candidateIds: ctx.otherPlayerIds,
        }],
        'add',
        'promptActions'
      );
    } else {
      // Set move condition for players
      const playerIds = (playerTarget === PlayerTarget.allOthers ? otherPlayerIds : [currentPlayer.id])
      playerIds.forEach(pid => {
        ctx.update_setPlayerEffectsPartial(pid, {
          moveCondition: {
            ruleId: rule.id,
            numCurrentSuccesses: 0,
          },
        });
      })
    }

    // Should only be used with self traget
    if (rule.condition?.immediate) {
      requiresActions = true;
      const actions = createNDiceRollActionObjects({
        n: rule.condition.diceRolls?.numRequired || 1
      });
      ctx.update_setPlayerActions(
        currentPlayer.id,
        actions,
      );
    }

    if (!requiresActions) {
      ctx.update_setPromptActionsClosable();
    }
  },
  postActionExecute: () => {
    const {
      arePromptActionsCompleted: isDone,
      allPromptActions,
      currentPlayer,
      nextGame,
    } = ctx;

    if (isDone) {
      if (rule.condition?.immediate) {
        // TODO - Currently this is only supported with self targets, but if that ever changes
        // this should be updated to account for there being player selection actions here
        const rolls = allPromptActions.map(a => a.result) as number[];
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
            } as Prompt)
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
        const playerId = String(allPromptActions[0]?.result);
        ctx.update_setPlayerEffectsPartial(playerId, {
          moveCondition: {
            ruleId: rule.id,
            numCurrentSuccesses: 0,
          },
        });
      }

      ctx.update_setPromptActionsClosable();
    }
  },
  ruleType: 'ApplyMoveConditionRule',
});