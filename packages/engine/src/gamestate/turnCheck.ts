import { getHandler } from './index.js';
import { GameState } from '../enums.js';
import { BaseRequest } from '../request.js';
import { GameStateHandler } from './types.js';

export const turnCheckHandler: GameStateHandler = (req: BaseRequest) => {
  const currentPlayer = req.currentPlayer;

  if (currentPlayer?.hasWon) {
    return getHandler(req, GameState.TURN_END)(req)
  }

  return getHandler(req, GameState.ZONE_CHECK)(req);
};