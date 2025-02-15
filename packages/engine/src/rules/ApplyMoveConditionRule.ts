import { RuleHandlerFactory } from './types.js';

export const ApplyMoveConditionRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: 'ApplyMoveConditionRule',
});