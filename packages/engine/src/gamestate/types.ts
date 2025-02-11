import { BaseContext } from '../engine.js';
import { GameState } from '../enums.js';

export interface GameStateHandler<THandlerArgs = void> {
  execute: (args: THandlerArgs) => void,
  gameState: GameState,
}

export type GameStateHandlerFactory<THandlerArgs = void> = (ctx: BaseContext) => GameStateHandler<THandlerArgs>;