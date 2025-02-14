import { findGameStateHandler } from './index.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';

export const GameStart: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const firstPlayer = ctx.sortedPlayers[0];

    ctx.updateGameMetadataPartial({
      currentPlayerId: firstPlayer?.id || '',
    })
    return findGameStateHandler(ctx, GameState.TurnCheck).execute();
  },
  gameState: GameState.GameStart,
});