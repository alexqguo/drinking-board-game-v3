import { ActionType } from '../actions/actions.types.js';
import { createId } from '../utils/ids.js';
import { GroupRollRule, RuleHandlerFactory } from './rules.types.js';

// Safari zone rule. Everyone rolls a die and that's it
export const handler: RuleHandlerFactory<GroupRollRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const playerIds = Object.keys(ctx.nextGame.players);
    playerIds.forEach(id => {
      ctx.update_setPlayerActions(
        [{
          id: createId(),
          playerId: id,
          type: ActionType.promptRoll,
        }],
      );
    });
  },
  postActionExecute: () => {
    if (ctx.arePromptActionsCompleted) {
      ctx.update_setPromptActionsClosable();
    }
  },
  ruleType: 'GroupRollRule',
});