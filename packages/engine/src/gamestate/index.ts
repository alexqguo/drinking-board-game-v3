import { GameState, ZoneType } from '../enums.js';
// import { getBoard } from '../boards';
import { BaseContext } from '../engine.js';
import { type GameStateHandler } from './types.js';
import { gameStartHandler } from './gameStart.js';
import { turnCheckHandler } from './turnCheck.js';
import { zoneCheckHandler } from './zoneCheck.js';

export abstract class BaseGameStateHandler {
  ctx: BaseContext;

  constructor(ctx: BaseContext) {
    this.ctx = ctx;
  }

  abstract execute(): void
}

export const gameStateHandlerMap: {
  [key: string]: GameStateHandler
} = {
  [GameState.GAME_START]: gameStartHandler,
  [GameState.TURN_CHECK]: turnCheckHandler,
  [GameState.ZONE_CHECK]: zoneCheckHandler,
  [GameState.TURN_START]: () => {}
};

const defaultHandler = (ctx: BaseContext) => {
  ctx.loggers.debug('No handler found.');
};

export const findGameStateHandler = (ctx: BaseContext, state: GameState): GameStateHandler => {
  ctx.loggers.debug(`Finding game state handler for ${state}`);
  const handler = gameStateHandlerMap[state];

  if (handler) return handler;
  return defaultHandler;
};