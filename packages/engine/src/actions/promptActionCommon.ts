import { Context } from '../context.js';
import { findRuleHandler } from '../rules/index.js';

export interface PromptActionCommonArguments {
  actionId: string,
  result: unknown, // number or string I think?
}

export const promptActionCommonHandler = (ctx: Context) => ({
  execute: (ctx: Context, args: PromptActionCommonArguments) => {
    const { actionId, result } = args;
    const { boardHelper, nextGame } = ctx;
    // Current rule would be the prompt's ruleId or last subsequentRuleId if it exists
    const currentRuleId = nextGame.prompt?.subsequentRuleIds?.length ?
      [...nextGame.prompt?.subsequentRuleIds].pop() : nextGame.prompt?.ruleId
    const currentRule = boardHelper.rulesById.get(currentRuleId!);

    ctx.update_setActionResult(actionId, result);
    const ruleHandler = findRuleHandler(ctx, currentRule)

    ruleHandler.postActionExecute?.();
  },
  prevalidate: () => {}
});