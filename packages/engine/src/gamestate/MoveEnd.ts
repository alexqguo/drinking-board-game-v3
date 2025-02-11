import { findGameStateHandler } from './index.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';

export const MoveEnd: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    return findGameStateHandler(ctx, GameState.RuleTrigger).execute();
  },
  gameState: GameState.MoveEnd,
});