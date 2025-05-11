import { ProxyRule, RuleType } from '@repo/schemas';
import { findRuleHandler } from './index.js';
import { RuleHandlerFactory } from './rules.types.js';

export const handler: RuleHandlerFactory<ProxyRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { proxyRuleId } = rule;
    const referencedRule = ctx.boardHelper.rulesById.get(proxyRuleId);
    if (!referencedRule) throw new Error(`Rule with id ${proxyRuleId} does not exist.`);

    ctx.update_setGamePromptPartial({
      subsequentRuleIds: [...(ctx.nextGame.prompt?.subsequentRuleIds || []), proxyRuleId],
    });

    findRuleHandler(ctx, referencedRule).execute();
  },
  ruleType: RuleType.ProxyRule,
});
