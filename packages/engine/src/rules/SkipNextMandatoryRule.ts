import { RuleHandlerFactory } from './types.js';

export const SkipNextMandatoryRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPlayerEffectsPartial(ctx.currentPlayer.id, {
      mandatorySkips: rule.numSpaces, // Yes, overwrite existing
    });
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: 'SkipNextMandatoryRule',
});