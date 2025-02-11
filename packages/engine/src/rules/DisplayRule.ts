import { RuleHandlerFactory } from './types.js';

export const DisplayRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.updatePromptActions_canClose();
  },
  ruleType: 'DisplayRule',
})