import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { findGameStateHandler } from '../gamestate/index.js';

export interface TurnRollSkipArguments {}

export const turnRollSkipHandler = (ctx: Context) => ({
  execute: () => {
    findGameStateHandler(ctx, GameState.TurnSkip).execute();
  },
  prevalidate: () => {},
});
