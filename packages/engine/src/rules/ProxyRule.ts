import { findRuleHandler } from './index.js';
import { ProxyRule, RuleHandlerFactory, RuleType } from './rules.types.js';

export const handler: RuleHandlerFactory<ProxyRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { id, proxyRuleId } = rule;
    const referencedRule = ctx.boardHelper.rulesById.get(proxyRuleId);
    if (!referencedRule) throw new Error(`Rule with id ${proxyRuleId} does not exist.`);

    // Create a copy of the proxy rule but with the correct ID, then execute it
    const proxyRule = {
      ...referencedRule,
      id,
    };

    findRuleHandler(ctx, proxyRule).execute();
  },
  postActionExecute: () => {
    const { id, proxyRuleId } = rule;
    const referencedRule = ctx.boardHelper.rulesById.get(proxyRuleId);
    if (!referencedRule) throw new Error(`Rule with id ${proxyRuleId} does not exist.`);

    // Create a copy of the proxy rule but with the correct ID, then execute it
    const proxyRule = {
      ...referencedRule,
      id,
    };

    findRuleHandler(ctx, proxyRule).postActionExecute?.();
  },
  ruleType: RuleType.ProxyRule,
});
