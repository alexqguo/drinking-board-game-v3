import { AnchorRule, RuleHandlerFactory } from './rules.types.js';

export const handler: RuleHandlerFactory<AnchorRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPlayerEffectsPartial(ctx.currentPlayer.id, {
      anchors: rule.numTurns!
    });
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: 'AnchorRule',
});