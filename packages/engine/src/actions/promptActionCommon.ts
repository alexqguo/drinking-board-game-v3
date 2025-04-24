import { Context } from '../context.js';
import { findRuleHandler } from '../rules/index.js';
import { PromptAction } from './actions.types.js';

export interface PromptActionCommonArguments {
  actionId: string,
  result: unknown, // number or string I think?
}

export const promptActionCommonHandler = () => ({
  execute: (ctx: Context, args: PromptActionCommonArguments) => {
    const { actionId, result } = args;
    const { boardHelper, nextGame, allActions } = ctx;
    const lastAction = allActions.find(a => a.id === actionId) as PromptAction;

    // Current rule would be the action's initiatorId. Fall back to prompt's ruleId
    // const currentRuleId = nextGame.prompt?.subsequentRuleIds?.length ?
    //   [...nextGame.prompt?.subsequentRuleIds].pop() : nextGame.prompt?.ruleId
    const currentRuleId = lastAction.initiator || nextGame.prompt?.ruleId;
    const currentRule = boardHelper.rulesById.get(currentRuleId!);

    // TODO- display log: "(playername) did X";
    // ctx.loggers.display()

    ctx.update_setActionResult(actionId, result as string | number);
    const ruleHandler = findRuleHandler(ctx, currentRule);
    ruleHandler.postActionExecute?.(lastAction as PromptAction | undefined);
  },
  prevalidate: (ctx: Context, args: PromptActionCommonArguments) => {
    const { result, actionId } = args;
    const actionToUpdate = ctx.allActions.find(a => a.id === actionId);

    if (typeof actionToUpdate?.result !== 'undefined') {
      const msg = `There is already a result for this action: ${result}`;
      ctx.loggers.error(msg);
      throw new Error(msg);
    }
  }
});