import { GameState } from '@repo/schemas';
import { ActionType } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { createId } from '../utils/ids.js';
import { GameStateHandlerFactory } from './gamestate.types.js';

// This should really be called like "RollReady" or something
export const RollStart: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    ctx.update_clearActions(currentPlayer.id);
    const newTurnActions = [
      {
        id: createId(),
        playerId: currentPlayer.id,
        type: ActionType.turnRoll,
      },
      {
        id: createId(),
        playerId: currentPlayer.id,
        type: ActionType.turnRollSkip,
      },
    ];

    if (currentPlayer.effects.rollAugmentation.numTurns > 0) {
      newTurnActions.splice(1, 0, {
        id: createId(),
        playerId: currentPlayer.id,
        type: ActionType.turnRollAugment,
      });
    }

    ctx.update_setPlayerActions(newTurnActions, 'turnActions');
  },
  gameState: GameState.RollStart,
});
