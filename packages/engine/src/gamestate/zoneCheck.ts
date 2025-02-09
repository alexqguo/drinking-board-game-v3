import { findGameStateHandler, gameStateHandlerMap } from './index.js';
import { GameState } from '../enums.js';
import { BaseContext } from '../request.js';
import { GameStateHandler } from './types.js';

export const zoneCheckHandler: GameStateHandler = (ctx: BaseContext) => {
  // TODO if player is in a zone with a rule and active type
  // execute rule handler
  // otherwise,
  return gameStateHandlerMap[GameState.TURN_START]!(ctx);
}