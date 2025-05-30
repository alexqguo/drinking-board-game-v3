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
    ctx.update_setPlayerActions(
      [
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
      ],
      'turnActions',
    );
  },
  gameState: GameState.RollStart,
});
