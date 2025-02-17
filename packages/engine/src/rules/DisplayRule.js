export const DisplayRule = (ctx, rule) => ({
    ctx,
    rule,
    execute: () => {
        ctx.update_setPromptActionsClosable();
    },
    ruleType: 'DisplayRule',
});
