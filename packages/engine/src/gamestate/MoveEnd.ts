import { findGameStateHandler } from './index.js';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';

export const MoveEnd: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    return findGameStateHandler(ctx, GameState.RuleTrigger).execute();
  },
  gameState: GameState.MoveEnd,
});