import { Context } from '../context.js';
import { ApplyMoveConditionRule } from '../rules/rules.types.js';
import { createNActionObjects } from '../utils/actions.js';
import { GameState, GameStateHandlerFactory } from './gamestate.types.js';

export const TurnMultirollConditionCheck: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    const turnConditionRule = ctx.boardHelper.module.board.tiles[currentPlayer.tileIndex]?.rule;
    const actions = createNActionObjects({
      n: (turnConditionRule as ApplyMoveConditionRule)?.condition!.diceRolls?.numRequired || 1,
      playerId: ctx.currentPlayer.id,
    });

    ctx.update_setPlayerActions(actions);
  },
  gameState: GameState.TurnMultirollConditionCheck
});