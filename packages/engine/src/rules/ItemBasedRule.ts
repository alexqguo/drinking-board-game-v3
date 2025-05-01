import { findRuleHandler } from './index.js';
import { ItemBasedRule, RuleHandlerFactory, RuleType, RuleTypeEnum } from './rules.types.js';

/**
 * This rule will execute a sub-rule based on whether or not the user has a given item.
 * Note this will execute the first match in the conditions list in the case of multiple matching.
 * If no matches (this should not happen) it won't do anything.
 *
 * @param ctx game context
 * @param rule ItemBasedRule object
 */
export const handler: RuleHandlerFactory<ItemBasedRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { currentPlayer } = ctx;
    const { conditions } = rule;

    for (let i = 0; i < conditions.length; i++) {
      const condition = conditions[i]!;
      const [itemId, hasItemMatcher, rule] = condition;
      const doesUserHaveItem = currentPlayer.effects.itemIds.includes(itemId);
      if (doesUserHaveItem === hasItemMatcher) {
        // Execute the designated rule
        findRuleHandler(ctx, rule).execute();
        return;
      }
    }

    // Fall back to just making the prompt closable
    ctx.loggers.debug(`No rule match found for ${rule.id}`);
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: RuleTypeEnum.ItemBasedRule,
});
