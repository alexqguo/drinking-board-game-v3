import { ActionType } from './enums.js';
import { Context, Loggers } from './context.js';
import { findActionHandler } from './actions/index.js';
import { Payloads } from './actions/index.js';


type RequestArgs<T extends ActionType> = {
  action: T,
  actionArgs: Payloads[T],
  prevGame: Game | null,
  loggers: Loggers
}

export const requestHandler = <T extends ActionType>(args: RequestArgs<T>): Game => {
  const ctx = new Context(args); // these args and ContextArgs are currently compatible
  const actionHandler = findActionHandler(ctx, args.action);

  actionHandler.prevalidate?.(ctx, args.actionArgs);

  ctx.loggers.debug(`Executing action ${args.action} with request arguments ${JSON.stringify(args.actionArgs)}`);
  const result = actionHandler.execute(ctx, args.actionArgs);

  actionHandler.postvalidate?.(ctx.nextGame);


  return ctx.nextGame;
};