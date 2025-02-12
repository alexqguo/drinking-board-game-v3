import { findGameStateHandler } from './index.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';

export const TurnSkip: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    // Clear out turn actions
    ctx.updatePlayerActions(
      ctx.currentPlayer.id,
      [],
      'setNew',
      'turnActions'
    );
    return findGameStateHandler(ctx, GameState.TurnEnd).execute();
  },
  gameState: GameState.TurnSkip,
});