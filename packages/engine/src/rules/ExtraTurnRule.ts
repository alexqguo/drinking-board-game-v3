import { ExtraTurnRule, RuleHandlerFactory } from './rules.types.js';

export const handler: RuleHandlerFactory<ExtraTurnRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPlayerEffectsPartial(ctx.currentPlayer.id, {
      extraTurns: ctx.currentPlayer.effects.extraTurns + 1,
    });
    ctx.update_setPromptActionsClosable();
  },
  ruleType: 'ExtraTurnRule',
})