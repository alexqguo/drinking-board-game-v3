import { performance } from 'node:perf_hooks';
import { ActionType, findActionHandler, Payloads } from './actions/index.js';
import { Context, Loggers } from './context.js';
import { Game } from './gamestate/gamestate.types.js';

type RequestArgs<T extends ActionType> = {
  action: T,
  actionArgs: Payloads[T],
  prevGame: Game | null,
  loggers?: Loggers
}

type Response = {
  game: Game,
  animationHints?: any[],
}

export const requestHandler = <T extends ActionType>(args: RequestArgs<T>): Response => {
  const start = performance.now();
  const ctx = new Context(args); // these args and ContextArgs are currently compatible
  const actionHandler = findActionHandler(ctx, args.action);

  actionHandler.prevalidate?.(ctx, args.actionArgs);
  ctx.loggers.debug(`Executing action ${args.action} with request arguments ${JSON.stringify(args.actionArgs)}`);
  actionHandler.execute(ctx, args.actionArgs);
  actionHandler.postvalidate?.(ctx.nextGame);

  const end = performance.now();
  const duration = end - start;
  ctx.loggers.debug(`Action ${args.action} completed in ${duration}ms.`);
  return {
    game: ctx.nextGame,
    animationHints: ctx.animationHints,
  };
};