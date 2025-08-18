import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { findGameStateHandler } from '../gamestate/index.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TurnRollSkipArguments {}

export const turnRollSkipHandler = (ctx: Context) => ({
  execute: () => {
    findGameStateHandler(ctx, GameState.TurnSkip).execute();
  },
  prevalidate: () => {},
});
