import { GameState, ZoneType } from '../types.js';
import { Context } from '../context.js';
import { GameStateHandlerFactory, GameStateHandler } from './gamestate.types.js';
import { GameStart } from './GameStart.js';
import { TurnCheck } from './TurnCheck.js';
import { TurnStart } from './TurnStart.js';
import { ZoneCheck } from './ZoneCheck.js';
import { TurnMultirollConditionCheck } from './TurnMultirollConditionCheck.js';
import { RollStart } from './RollStart.js';
import { RollEnd } from './RollEnd.js';
import { MoveCalculate } from './MoveCalculate.js';
import { MoveEnd } from './MoveEnd.js';
import { MoveStart } from './MoveStart.js';
import { RuleEnd } from './RuleEnd.js';
import { RuleTrigger } from './RuleTrigger.js';
import { TurnEnd } from './TurnEnd.js';
import { TurnSkip } from './TurnSkip.js';
import { LostTurnStart } from './LostTurnStart.js';

export * from './gamestate.types.js';

const defaultHandlerFactory = (
  ctx: Context,
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
  TurnStart,
  TurnMultirollConditionCheck,
  RollStart,
  RollEnd,
  MoveCalculate,
  MoveStart,
  MoveEnd,
  RuleTrigger,
  RuleEnd,
  TurnEnd,
  TurnSkip,
  LostTurnStart,
  // NotStarted, // noop- default is fine
  // StarterSelect, // noop- default is fine
  // GameOver, // noop- default is fine
  // Battle, // noop- default is fine
};

const withCommonBehavior = (
  ctx: Context,
  handler: GameStateHandler
): GameStateHandler => Object.freeze({
  execute: () => {
    ctx.loggers.debug(`Executing game handler ${handler.gameState}`);
    ctx.update_setGameMetadataPartial({
      state: handler.gameState,
    });
    return handler.execute();
  },
  gameState: handler.gameState,
});

export const findGameStateHandler = (ctx: Context, state: GameState): GameStateHandler => {
  ctx.loggers.debug(`Finding game state handler for ${state}`);
  const factory = handlerFactoryMap[state];

  if (factory) {
    const handler = withCommonBehavior(ctx, factory(ctx));
    return handler;
  }
  return defaultHandlerFactory(ctx, state);
};