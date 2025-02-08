import { getHandler } from './index';
import { BaseRequest } from '../request';
import { GameStateHandler } from './types';
import { GameState } from '../enums';

export const gameStartHandler: GameStateHandler = (req: BaseRequest) => {
  return getHandler(req, GameState.TURN_CHECK)(req);
};