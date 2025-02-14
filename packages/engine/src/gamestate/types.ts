import { Context } from '../context.js';
import { GameState } from '../enums.js';

export interface GameStateHandler<THandlerArgs = void> {
  execute: (args: THandlerArgs) => void,
  gameState: GameState,
}

export type GameStateHandlerFactory<THandlerArgs = void> = (ctx: Context) => GameStateHandler<THandlerArgs>;