import { ActionType } from '../types.js';
import { createId } from '../utils/ids.js';
import { RuleHandlerFactory } from './rules.types.js';

export const RollUntilRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    // Create a singlular action at first. postActionExecute will add more depending on results
    ctx.update_setPlayerActions(
      ctx.currentPlayer.id,
      [{
        id: createId(),
        type: ActionType.promptRoll,
      }],
    );
  },
  postActionExecute: () => {
    const { allPromptActions, currentPlayer } = ctx;
    // allPromptActions here fetches for all players, which should be safe since we only set one
    const lastAction = allPromptActions[allPromptActions.length - 1];
    let isDone = false;

    if (rule.criteria) {
      // Player is done if their last roll matches the criteria
      isDone = rule.criteria!.indexOf(Number(lastAction?.result)) > -1;
    } else {
      // If no criteria was passed, default to requiring two consecutive rolls of the same number
      const lastTwoRolls = allPromptActions.slice(allPromptActions.length - 2)
        .map(a => a.result);
      isDone = lastTwoRolls.length === 2 && lastTwoRolls[0] === lastTwoRolls[1];
    }

    if (isDone) {
      ctx.update_setPromptActionsClosable();
    } else if (!!lastAction?.result && rule.criteria!.indexOf(Number(lastAction.result)) === -1) {
      ctx.update_setPlayerActions(
        currentPlayer.id,
        [{
          id: createId(),
          type: ActionType.promptRoll,
        }],
      );
    }
  },
  ruleType: 'RollUntilRule',
})