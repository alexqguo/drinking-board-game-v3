import { RuleHandlerFactory, SkipTurnRule } from './rules.types.js';

export const handler: RuleHandlerFactory<SkipTurnRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { numTurns } = rule;
    ctx.update_setPlayerEffectsPartial(ctx.currentPlayer.id, {
      skippedTurns: {
        numTurns: numTurns!,
        message: '[todo-i18n] lost turn general message'
      }
    });
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: 'SkipTurnRule',
});