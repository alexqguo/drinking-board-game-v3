import { ActionType } from '@repo/enums';
import { PromptAction } from '../actions/actions.types.js';
import { createId } from '../utils/ids.js';
import { RollUntilRule, RuleHandlerFactory, RuleType } from './rules.types.js';

export const handler: RuleHandlerFactory<RollUntilRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    // Create a singlular action at first. postActionExecute will add more depending on results
    ctx.update_setPlayerActions([
      {
        id: createId(),
        playerId: ctx.currentPlayer.id,
        type: ActionType.promptRoll,
      },
    ]);
  },
  postActionExecute: (lastAction) => {
    const { allActions, currentPlayer } = ctx;
    const { criteria } = rule;
    const [matchType] = criteria;
    const ruleActions = allActions.filter((a) => (a as PromptAction).initiator === rule.id);
    // allPromptActions here fetches for all players, which should be safe since we only set one
    let isDone = false;

    if (matchType === 'match') {
      const rollsToMatch = criteria[1];
      // Player is done if their last roll matches the criteria
      isDone = rollsToMatch.indexOf(Number(lastAction?.result)) > -1;
    } else if (matchType === 'consecutiveMatch') {
      const numInARowRequired = criteria[1];
      const lastNRolls = ruleActions.slice(-numInARowRequired).map((a) => a.result);
      isDone = lastNRolls.length === numInARowRequired && new Set(lastNRolls).size === 1;
    }

    if (isDone) {
      ctx.update_setPromptActionsClosable();
    } else {
      ctx.update_setPlayerActions([
        {
          id: createId(),
          playerId: currentPlayer.id,
          type: ActionType.promptRoll,
          initiator: rule.id,
        },
      ]);
    }
  },
  ruleType: RuleType.RollUntilRule,
});
