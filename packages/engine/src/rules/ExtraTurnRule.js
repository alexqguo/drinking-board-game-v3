export const ExtraTurnRule = (ctx, rule) => ({
    ctx,
    rule,
    execute: () => {
        ctx.update_setPlayerEffectsPartial(ctx.currentPlayer.id, {
            extraTurns: ctx.currentPlayer.effects.extraTurns + 1,
        });
        ctx.update_setPromptActionsClosable();
    },
    ruleType: 'ExtraTurnRule',
});
