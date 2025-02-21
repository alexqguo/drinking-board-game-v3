import { ActionType } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { createId } from '../utils/ids.js';
import { GameState, GameStateHandlerFactory } from './gamestate.types.js';

// This should really be called like "RollReady" or something
export const RollStart: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    ctx.update_setPlayerActions(
      currentPlayer.id,
      [
        {
          id: createId(),
          type: ActionType.turnRoll,
        },
        {
          id: createId(),
          type: ActionType.turnRollSkip,
        },
      ],
      'setNew',
      'turnActions'
    );
  },
  gameState: GameState.RollStart
});