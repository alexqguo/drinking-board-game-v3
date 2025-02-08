import { getHandler } from './index.js';
import { BaseRequest } from '../request.js';
import { GameStateHandler } from './types.js';
import { GameState } from '../enums.js';

export const gameStartHandler: GameStateHandler = (req: BaseRequest) => {
  return getHandler(req, GameState.TURN_CHECK)(req);
};