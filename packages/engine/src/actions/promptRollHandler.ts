import { Context } from '../context.js';
import { PromptActionCommonArguments, promptActionCommonHandler } from './promptActionCommon.js';

export const promptRollHandler = () => ({
  execute: (ctx: Context, args: PromptActionCommonArguments) => {
    const roll = ctx.rollDie();

    // A bit janky, but just to get it to work with common logic
    args.result = roll;

    promptActionCommonHandler(ctx).execute(ctx, args);
  },
});
