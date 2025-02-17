export const AddMandatoryRule = (ctx, rule) => ({
    ctx,
    rule,
    execute: () => {
        ctx.update_setPlayerEffectsPartial(ctx.currentPlayer.id, {
            customMandatoryTileIndex: rule.tileIndex,
        });
        ctx.update_setPromptActionsClosable();
    },
    ruleType: 'AddMandatoryRule',
});
