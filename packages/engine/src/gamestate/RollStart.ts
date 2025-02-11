import { ActionType, GameState } from '../enums.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';

// This should really be called like "RollReady" or something
export const RollStart: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    ctx.updatePlayerActions(
      currentPlayer.id,
      [
        { actionType: ActionType.turnRoll },
        { actionType: ActionType.turnRollSkip },
      ],
      'setNew',
      'turnActions'
    );
  },
  gameState: GameState.RollStart
});