import { findRuleHandler } from './index.js';
import { ProxyRule, RuleHandlerFactory, RuleType } from './rules.types.js';

export const handler: RuleHandlerFactory<ProxyRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { id, proxyRuleId } = rule;
    const proxyRule = {
      ...ctx.boardHelper.rulesById.get(proxyRuleId)!,
      id,
    };

    findRuleHandler(ctx, proxyRule).execute();
  },
  postActionExecute: () => {},
  ruleType: RuleType.ProxyRule,
});