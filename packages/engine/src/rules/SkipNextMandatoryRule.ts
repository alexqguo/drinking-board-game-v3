import { RuleHandlerFactory, SkipNextMandatoryRule } from './rules.types.js';

export const handler: RuleHandlerFactory<SkipNextMandatoryRule> = (ctx, rule) => ({
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