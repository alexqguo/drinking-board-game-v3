import { findGameStateHandler, gameStateHandlerMap } from './index.js';
import { BaseContext } from '../engine.js';
import { GameStateHandler } from './types.js';
import { GameState } from '../enums.js';

export const gameStartHandler: GameStateHandler = (ctx: BaseContext) => {
  return gameStateHandlerMap[GameState.TURN_CHECK]!(ctx);
};