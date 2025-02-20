import { findGameStateHandler } from './index.js';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { GameState } from '../types.js';

export const TurnSkip: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    // Clear out turn actions
    ctx.update_setPlayerActions(
      ctx.currentPlayer.id,
      [],
      'setNew',
      'turnActions'
    );
    return findGameStateHandler(ctx, GameState.TurnEnd).execute();
  },
  gameState: GameState.TurnSkip,
});