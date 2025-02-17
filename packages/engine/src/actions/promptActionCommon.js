import { findRuleHandler } from '../rules/index.js';
export const promptActionCommonHandler = (ctx) => ({
    execute: (ctx, args) => {
        const { actionId, result } = args;
        const { boardHelper, nextGame } = ctx;
        // Current rule would be the prompt's ruleId or last subsequentRuleId if it exists
        const currentRuleId = nextGame.prompt?.subsequentRuleIds?.length ?
            [...nextGame.prompt?.subsequentRuleIds].pop() : nextGame.prompt?.ruleId;
        const currentRule = boardHelper.rulesById.get(currentRuleId);
        ctx.update_setActionResult(actionId, result);
        const ruleHandler = findRuleHandler(ctx, currentRule);
        ruleHandler.postActionExecute?.();
    },
    prevalidate: () => { }
});
