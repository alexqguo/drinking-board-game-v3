import { Context } from '../context.js';
import { GameState, GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const TurnSkip: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    // Clear out turn actions
    ctx.update_clearActions(ctx.currentPlayer.id);
    return findGameStateHandler(ctx, GameState.TurnEnd).execute();
  },
  gameState: GameState.TurnSkip,
});
