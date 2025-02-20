import { ReverseTurnOrderRule, RuleHandlerFactory } from './rules.types.js';

export const handler: RuleHandlerFactory<ReverseTurnOrderRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setGameMetadataPartial({
      turnOrder: ctx.nextGame.metadata.turnOrder * -1,
    });
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: 'ReverseTurnOrderRule',
});