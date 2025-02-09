import { findGameStateHandler } from './index.js';
import { GameState } from '../enums.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';

export const ZoneCheck: GameStateHandlerFactory = (ctx: BaseContext) => ({
  gameState: GameState.ZoneCheck,
  execute: () => {
    // TODO if player is in a zone with a rule and active type
    // execute rule handler
    // otherwise,
    return findGameStateHandler(ctx, GameState.TurnStart).execute();
  }
});