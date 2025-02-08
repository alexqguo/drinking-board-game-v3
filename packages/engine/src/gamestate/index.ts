import { GameState, ZoneType } from '../enums';
import { getBoard } from '../boards';
import { BaseRequest } from '../request';
import { type GameStateHandler } from './types';
import { gameStartHandler } from './gameStart';
import { turnCheckHandler } from './turnCheck';

const handlerMap: {
  [key: string] : GameStateHandler
} = {
  [GameState.GAME_START]: gameStartHandler,
  [GameState.TURN_CHECK]: turnCheckHandler,
};

const defaultHandler = (req: BaseRequest) => {
  req.loggers.debug('No handler found.');
};

export const getHandler = (req: BaseRequest, state: GameState): GameStateHandler => {
  req.loggers.debug(`Finding game state handler for ${state}`);
  const handler = handlerMap[state];

  if (handler) return handler;
  return defaultHandler;
};