import { RuleHandlerFactory } from './types.js';

export const DiceRollRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: 'DiceRollRule',
});