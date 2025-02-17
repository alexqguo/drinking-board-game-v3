import { Context } from '../context.js';
import { ActionType } from '../enums.js';
import { createHandler } from './create.js';
import { promptActionCommonHandler } from './promptActionCommon.js';
import { promptCloseHandler } from './promptClose.js';
import { startHandler } from './start.js';
import { turnRollHandler } from './turnRoll.js';
import { turnRollSkipHandler } from './turnRollSkip.js';
import { ActionHandler, ActionHandlerFactory, Payloads } from './types.js';

type HandlerFactoryMap<T extends ActionType> = Record<ActionType, ActionHandlerFactory<T>>

const handlerFactoryMap = {
  [ActionType.gameCreate]: createHandler,
  [ActionType.gameStart]: startHandler,
  [ActionType.turnRoll]: turnRollHandler,
  [ActionType.promptClose]: promptCloseHandler,
  [ActionType.turnRollSkip]: turnRollSkipHandler,
  [ActionType.turnRollAugment]: () => {},
  [ActionType.promptRoll]: promptActionCommonHandler,
  [ActionType.promptSelectPlayer]: promptActionCommonHandler,
  [ActionType.promptSelectStarter]: promptActionCommonHandler,
  [ActionType.promptSelectCustom]: promptActionCommonHandler,
}

const withCommonBehavior = <T extends ActionType>(
  ctx: Context,
  actionHandler: ActionHandler<T>,
): ActionHandler<T> => Object.freeze({
  prevalidate: (ctxArg: Context, args: Payloads[T]) => {
    actionHandler.prevalidate?.(ctxArg, args);
  },
  postvalidate: (g: Game) => {
    actionHandler.postvalidate?.(g);
  },
  execute: (ctxArg: Context, actionArgs: Payloads[T]) => {
    const result = actionHandler.execute(ctxArg, actionArgs);
    ctx.loggers.debug(`Completed action with result ${JSON.stringify(result)}`);
    return result;
  },
})

export const findActionHandler = <T extends ActionType>(ctx: Context, action: ActionType): ActionHandler<T> => {
  ctx.loggers.debug(`Finding action handler for ${action}`);
  const factory = handlerFactoryMap[action];

  if (factory) {
    // TODO remove casing once all action handlers exist
    return withCommonBehavior(ctx, factory(ctx) as ActionHandler<T>);
  }

  const errorMsg = `Could not find action handler for action type: ${action}`;
  ctx.loggers.error(errorMsg);
  throw errorMsg;
};

export * from './types.js';