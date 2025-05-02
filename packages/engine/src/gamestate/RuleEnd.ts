import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const RuleEnd: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    return findGameStateHandler(ctx, GameState.TurnEnd).execute();
  },
  gameState: GameState.RuleEnd,
});
