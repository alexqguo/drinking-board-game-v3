import { RuleHandlerFactory } from './rules.types.js';

export const DisplayRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPromptActionsClosable();
  },
  ruleType: 'DisplayRule',
})