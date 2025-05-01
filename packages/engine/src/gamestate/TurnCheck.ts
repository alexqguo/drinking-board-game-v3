import { GameStateEnum } from '@repo/schemas';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const TurnCheck: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;

    if (currentPlayer?.hasWon) {
      return findGameStateHandler(ctx, GameStateEnum.TurnEnd).execute();
    }

    return findGameStateHandler(ctx, GameStateEnum.ZoneCheck).execute();
  },
  gameState: GameStateEnum.TurnCheck,
});
