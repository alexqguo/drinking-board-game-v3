import { GameOverRule, RuleType } from '@repo/schemas';
import { RuleHandlerFactory } from './rules.types.js';

export const handler: RuleHandlerFactory<GameOverRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPlayerDataPartial(ctx.currentPlayer.id, {
      hasWon: true,
    });
    ctx.update_setPromptActionsClosable();
  },
  ruleType: RuleType.GameOverRule,
});
