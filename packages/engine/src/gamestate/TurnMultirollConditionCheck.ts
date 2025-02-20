import { findGameStateHandler } from './index.js';
import { GameState } from '../types.js';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { createNDiceRollActionObjects } from '../utils/actions.js';

export const TurnMultirollConditionCheck: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    const turnConditionRule = ctx.boardHelper.boardModule.board.tiles[currentPlayer.tileIndex]?.rule;
    const actions = createNDiceRollActionObjects({
      n: turnConditionRule?.condition!.diceRolls?.numRequired || 1,
    });

    ctx.update_setPlayerActions(
      ctx.currentPlayer.id,
      actions,
    );
  },
  gameState: GameState.TurnMultirollConditionCheck
});