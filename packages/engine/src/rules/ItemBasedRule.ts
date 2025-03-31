import { ItemBasedRule, RuleHandlerFactory, RuleType } from './rules.types.js';

export const handler: RuleHandlerFactory<ItemBasedRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    // todo- implement me
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: RuleType.ItemBasedRule,
});