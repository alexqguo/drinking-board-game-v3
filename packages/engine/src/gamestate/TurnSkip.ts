import { GameStateEnum } from '@repo/schemas';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const TurnSkip: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    // Clear out turn actions
    ctx.update_clearActions(ctx.currentPlayer.id);
    ctx.loggers.display(`${ctx.currentPlayer.name} skips their turn`);
    return findGameStateHandler(ctx, GameStateEnum.TurnEnd).execute();
  },
  gameState: GameStateEnum.TurnSkip,
});
