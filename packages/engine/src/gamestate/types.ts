import { BaseContext } from '../engine.js';
import { GameState } from '../enums.js';

export interface GameStateHandler {
  execute: () => void,
  gameState: GameState,
}

export type GameStateHandlerFactory = (ctx: BaseContext) => GameStateHandler;