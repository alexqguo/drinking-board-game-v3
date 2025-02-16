import { RuleHandlerFactory } from './types.js';

export const ReverseTurnOrderRule: RuleHandlerFactory = (ctx, rule) => ({
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