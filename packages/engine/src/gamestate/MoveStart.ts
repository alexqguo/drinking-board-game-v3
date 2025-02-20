import { findGameStateHandler } from './index.js';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { GameState } from '../types.js';

export const MoveStart: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    return findGameStateHandler(ctx, GameState.MoveEnd).execute();
  },
  gameState: GameState.MoveStart,
});