import { GameOverRule, RuleHandlerFactory, RuleType, RuleTypeEnum } from './rules.types.js';

export const handler: RuleHandlerFactory<GameOverRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPlayerDataPartial(ctx.currentPlayer.id, {
      hasWon: true,
    });
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: RuleTypeEnum.GameOverRule,
});
