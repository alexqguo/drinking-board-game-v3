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

    ctx.update_setActionResult(actionId, result as string | number);
    const ruleHandler = findRuleHandler(ctx, currentRule)

    ruleHandler.postActionExecute?.();
  },
  prevalidate: (ctx: Context, args: PromptActionCommonArguments) => {
    // TODO- validate that a result doesn't already exist
    const { result, actionId } = args;
    const actionToUpdate = ctx.allActions.find(a => a.id === actionId);

    if (typeof actionToUpdate?.result !== 'undefined') {
      const msg = `There is already a result for this action: ${result}`;
      ctx.loggers.error(msg);
      throw new Error(msg);
    }
  }
});