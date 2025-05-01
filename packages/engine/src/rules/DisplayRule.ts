import { DisplayRule, RuleHandlerFactory, RuleTypeEnum } from './rules.types.js';

export const handler: RuleHandlerFactory<DisplayRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPromptActionsClosable();
  },
  ruleType: RuleTypeEnum.DisplayRule,
});
