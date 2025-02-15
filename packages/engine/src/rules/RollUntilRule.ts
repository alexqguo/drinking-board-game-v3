import { ActionType } from '../enums.js';
import { RuleHandlerFactory } from './types.js';

export const RollUntilRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    // Create a singlular action at first. postActionExecute will add more depending on results
    ctx.update_setPlayerActions(
      ctx.currentPlayer.id,
      [{ actionType: ActionType.promptRoll }],
      'add',
      'promptActions'
    );
  },
  postActionExecute: () => {
    const { allPromptActions, currentPlayer } = ctx;
    // allPromptActions here fetches for all players, which should be safe since we only set one
    const lastAction = allPromptActions[allPromptActions.length - 1];
    let isDone = false;

    if (rule.criteria) {
      // Player is done if their last roll matches the criteria
      isDone = rule.criteria!.indexOf(lastAction?.actionResult) > -1;
    } else {
      // If no criteria was passed, default to requiring two consecutive rolls of the same number
      const lastTwoRolls = allPromptActions.slice(allPromptActions.length - 2)
        .map(a => a.actionResult);
      isDone = lastTwoRolls.length === 2 && lastTwoRolls[0] === lastTwoRolls[1];
    }

    if (isDone) {
      ctx.update_setPromptActionsClosable();
    } else if (!!lastAction?.actionResult && rule.criteria!.indexOf(lastAction.actionResult) === -1) {
      ctx.update_setPlayerActions(
        currentPlayer.id,
        [{ actionType: ActionType.promptRoll }],
        'add',
        'promptActions',
      );
    }
  },
  ruleType: 'RollUntilRule',
})