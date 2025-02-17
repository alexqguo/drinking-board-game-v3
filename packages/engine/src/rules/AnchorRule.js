export const AnchorRule = (ctx, rule) => ({
    ctx,
    rule,
    execute: () => {
        ctx.update_setPlayerEffectsPartial(ctx.currentPlayer.id, {
            anchors: rule.numTurns
        });
        ctx.update_setPromptActionsClosable();
    },
    postActionExecute: () => { },
    ruleType: 'AnchorRule',
});
