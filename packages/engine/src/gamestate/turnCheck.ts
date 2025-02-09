import { findGameStateHandler } from './index.js';
import { GameState } from '../enums.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';

export const TurnCheck: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;

    if (currentPlayer?.hasWon) {
      return findGameStateHandler(ctx, GameState.TurnEnd).execute();
    }

    return findGameStateHandler(ctx, GameState.ZoneCheck).execute();
  },
  gameState: GameState.TurnCheck
});