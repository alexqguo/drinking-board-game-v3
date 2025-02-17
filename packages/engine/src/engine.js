import { performance } from 'node:perf_hooks';
import { Context } from './context.js';
import { findActionHandler } from './actions/index.js';
export const requestHandler = (args) => {
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
