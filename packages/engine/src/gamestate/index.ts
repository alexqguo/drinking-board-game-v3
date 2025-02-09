import { GameState, ZoneType } from '../enums.js';
// import { getBoard } from '../boards';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory, GameStateHandler } from './types.js';
import { GameStart } from './GameStart.js';
import { TurnCheck } from './TurnCheck.js';
import { ZoneCheck } from './ZoneCheck.js';

const defaultHandlerFactory = (
  ctx: BaseContext,
  missingState: GameState
): GameStateHandler => ({
  execute: () => ctx.loggers.debug(`[Default Handler] No handler found for state: ${missingState}.`),
  gameState: GameState.NotStarted,
});

// Game state handlers should export named export matching their GameState enum value
const handlerFactoryMap: {
  [key: string]: GameStateHandlerFactory
} = {
  GameStart,
  TurnCheck,
  ZoneCheck,
};

const withCommonBehavior = (
  ctx: BaseContext,
  handler: GameStateHandler
): GameStateHandler => Object.freeze({
  execute: () => {
    ctx.loggers.debug(`Executing game handler ${handler.gameState}`);
    return handler.execute();
  },
  gameState: handler.gameState,
});

export const findGameStateHandler = (ctx: BaseContext, state: GameState): GameStateHandler => {
  ctx.loggers.debug(`Finding game state handler for ${state}`);
  const factory = handlerFactoryMap[state];


  if (factory) {
    const handler = withCommonBehavior(ctx, factory(ctx));
    return handler;
  }
  return defaultHandlerFactory(ctx, state);
};