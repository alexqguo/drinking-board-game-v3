import { findGameStateHandler } from './index.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';

export const GameStart: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    // todo- make nicer
    const firstPlayer = Object.values(ctx.nextGame.players).find(p => p.order === 0)!;

    ctx.updateGameMetadata({
      ...ctx.nextGame.metadata,
      currentPlayerId: firstPlayer?.id
    })
    return findGameStateHandler(ctx, GameState.TurnCheck).execute();
  },
  gameState: GameState.GameStart,
});