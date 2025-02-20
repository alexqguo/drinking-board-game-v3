import { RuleHandlerFactory } from './rules.types.js';

export const GameOverRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPlayerDataPartial(ctx.currentPlayer.id, {
      hasWon: true
    });
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: 'GameOverRule',
});