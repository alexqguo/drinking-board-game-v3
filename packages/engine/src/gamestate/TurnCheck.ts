import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const TurnCheck: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const { currentPlayer, nextGame } = ctx;
    const { players } = nextGame;
    const hasEveryoneWon = Object.values(players).every((p) => p.hasWon);

    if (hasEveryoneWon) {
      return findGameStateHandler(ctx, GameState.GameOver).execute();
    }

    if (currentPlayer?.hasWon) {
      return findGameStateHandler(ctx, GameState.TurnEnd).execute();
    }

    // We don't check skipped turns here because they still require the user to confirm
    // So it's really still part of their turn

    return findGameStateHandler(ctx, GameState.ZoneCheck).execute();
  },
  gameState: GameState.TurnCheck,
});
