import { GameStateEnum } from '@repo/schemas';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const MoveEnd: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    return findGameStateHandler(ctx, GameStateEnum.RuleTrigger).execute();
  },
  gameState: GameStateEnum.MoveEnd,
});
