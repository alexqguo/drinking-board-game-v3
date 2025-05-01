import { GameStateEnum } from '@repo/schemas';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const MoveStart: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    return findGameStateHandler(ctx, GameStateEnum.MoveEnd).execute();
  },
  gameState: GameStateEnum.MoveStart,
});
