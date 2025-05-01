import { GameStateEnum } from '@repo/schemas';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const RuleEnd: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    return findGameStateHandler(ctx, GameStateEnum.TurnEnd).execute();
  },
  gameState: GameStateEnum.RuleEnd,
});
