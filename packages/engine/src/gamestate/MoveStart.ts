import { Context } from '../context.js';
import { GameState, GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const MoveStart: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    return findGameStateHandler(ctx, GameState.MoveEnd).execute();
  },
  gameState: GameState.MoveStart,
});
