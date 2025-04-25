import { Context } from '../context.js';
import { GameState, GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const TurnCheck: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;

    if (currentPlayer?.hasWon) {
      return findGameStateHandler(ctx, GameState.TurnEnd).execute();
    }

    return findGameStateHandler(ctx, GameState.ZoneCheck).execute();
  },
  gameState: GameState.TurnCheck,
});
