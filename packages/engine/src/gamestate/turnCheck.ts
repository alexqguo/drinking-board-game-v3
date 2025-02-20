import { findGameStateHandler } from './index.js';
import { GameState } from '../types.js';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';

export const TurnCheck: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;

    if (currentPlayer?.hasWon) {
      return findGameStateHandler(ctx, GameState.TurnEnd).execute();
    }

    return findGameStateHandler(ctx, GameState.ZoneCheck).execute();
  },
  gameState: GameState.TurnCheck
});