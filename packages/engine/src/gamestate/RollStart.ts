import { ActionType, GameState } from '../enums.js';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './types.js';

// This should really be called like "RollReady" or something
export const RollStart: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    ctx.update_setPlayerActions(
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