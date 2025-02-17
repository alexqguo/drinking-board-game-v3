import { RuleHandlerFactory } from './types.js';

export const RollAugmentationRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    ctx.update_setPlayerEffectsPartial(ctx.currentPlayer.id, {
      rollAugmentation: {
        numTurns: 1,
        operation: rule.modifier![0],
        modifier: rule.modifier![1],
      },
    });
    ctx.update_setPromptActionsClosable();
  },
  postActionExecute: () => {},
  ruleType: 'RollAugmentationRule',
});