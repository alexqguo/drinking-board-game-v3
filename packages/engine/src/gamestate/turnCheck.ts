import { getHandler } from '.';
import { GameState } from '../enums';
import { BaseRequest } from '../request';
import { GameStateHandler } from './types';

export const turnCheckHandler: GameStateHandler = (req: BaseRequest) => {
  const currentPlayer = req.currentPlayer;

  if (currentPlayer?.hasWon) {
    return getHandler(req, GameState.TURN_END)(req)
  }

  return getHandler(req, GameState.ZONE_CHECK)(req);
};