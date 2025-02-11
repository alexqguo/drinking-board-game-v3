import { findGameStateHandler } from './index.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';

export const MoveStart: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    return findGameStateHandler(ctx, GameState.MoveEnd).execute();
  },
  gameState: GameState.MoveStart,
});