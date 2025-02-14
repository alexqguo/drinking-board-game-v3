import { findGameStateHandler } from './index.js';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';

export const GameStart: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const firstPlayer = ctx.sortedPlayers[0];

    ctx.update_setGameMetadataPartial({
      currentPlayerId: firstPlayer?.id || '',
    })
    return findGameStateHandler(ctx, GameState.TurnCheck).execute();
  },
  gameState: GameState.GameStart,
});