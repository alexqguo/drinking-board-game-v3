import { ActionType } from '../enums.js';
import { createId } from '../utils/ids.js';
import { RuleHandlerFactory } from './types.js';

// Safari zone rule. Everyone rolls a die and that's it
export const GroupRollRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const playerIds = Object.keys(ctx.nextGame.players);
    playerIds.forEach(id => {
      ctx.update_setPlayerActions(
        id,
        [{
          id: createId(),
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