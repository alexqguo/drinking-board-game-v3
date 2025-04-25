import { Context } from '../context.js';
import { GameState } from '../gamestate/gamestate.types.js';
import { findGameStateHandler } from '../gamestate/index.js';

export interface TurnRollSkipArguments {}

export const turnRollSkipHandler = (ctx: Context) => ({
  execute: () => {
    findGameStateHandler(ctx, GameState.TurnSkip).execute();
  },
  prevalidate: () => {},
});
