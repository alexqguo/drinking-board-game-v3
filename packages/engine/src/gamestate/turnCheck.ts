import { findGameStateHandler, gameStateHandlerMap } from './index.js';
import { GameState } from '../enums.js';
import { BaseContext } from '../engine.js';
import { GameStateHandler } from './types.js';

export const turnCheckHandler: GameStateHandler = (ctx: BaseContext) => {
  const currentPlayer = ctx.currentPlayer;

  if (currentPlayer?.hasWon) {
    return gameStateHandlerMap[GameState.TURN_END]!(ctx);
  }

  return gameStateHandlerMap[GameState.ZONE_CHECK]!(ctx);
};