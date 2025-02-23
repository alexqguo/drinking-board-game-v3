import { Context } from '../context.js';
import { Game } from '../gamestate/gamestate.types.js';
import { ActionHandler, ActionHandlerFactory, ActionType, Payloads } from './actions.types.js';
import { createHandler } from './create.js';
import { promptActionCommonHandler } from './promptActionCommon.js';
import { promptCloseHandler } from './promptClose.js';
import { promptRollHandler } from './promptRollHandler.js';
import { startHandler } from './start.js';
import { turnRollHandler } from './turnRoll.js';
import { turnRollSkipHandler } from './turnRollSkip.js';

export * from './actions.types.js';

type HandlerFactoryMap = Record<ActionType, ActionHandlerFactory<any> | null>

const handlerFactoryMap: HandlerFactoryMap = {
  [ActionType.gameCreate]: createHandler,
  [ActionType.gameStart]: startHandler,
  [ActionType.turnRoll]: turnRollHandler,
  [ActionType.promptClose]: promptCloseHandler,
  [ActionType.turnRollSkip]: turnRollSkipHandler,
  [ActionType.promptRoll]: promptRollHandler,
  [ActionType.promptSelectPlayer]: promptActionCommonHandler,
  [ActionType.promptSelectStarter]: promptActionCommonHandler,
  [ActionType.promptSelectCustom]: promptActionCommonHandler,
  [ActionType.turnRollAugment]: null, // todo. gen2 only 
  [ActionType.battle]: null, // unused
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
});

export const findActionHandler = <T extends ActionType>(ctx: Context, action: ActionType): ActionHandler<T> => {
  ctx.loggers.debug(`Finding action handler for ${action}`);
  const factory = handlerFactoryMap[action];

  for (
    const [actionKey, customHandler]
    of Object.entries(ctx.boardHelper.module?.gameExtensionInfo?.actions || {})
  ) {
    handlerFactoryMap[actionKey as ActionType] = customHandler;
  }

  if (factory) {
    // TODO remove casing once all action handlers exist
    return withCommonBehavior(ctx, factory(ctx) as ActionHandler<T>);
  }

  const errorMsg = `Could not find action handler for action type: ${action}`;
  ctx.loggers.error(errorMsg);
  throw errorMsg;
};

export * from './actions.types.js';
