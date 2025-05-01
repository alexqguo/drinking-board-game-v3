import { GameStateEnum } from '@repo/schemas';
import { Context } from '../context.js';
import { ApplyMoveConditionRule } from '../rules/rules.types.js';
import { createNActionObjects } from '../utils/actions.js';
import { GameStateHandlerFactory } from './gamestate.types.js';

export const TurnMultirollConditionCheck: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    // TODO- shouldn't this use the ruleId from the actual moveCondition effect
    // in most cases should end up being the same but that would be how to guarantee it
    const turnConditionRule = ctx.boardHelper.module.board.tiles[currentPlayer.tileIndex]?.rule;
    const actions = createNActionObjects({
      n: (turnConditionRule as ApplyMoveConditionRule)?.condition!.diceRolls?.numRequired || 1,
      playerId: ctx.currentPlayer.id,
      initiator: GameStateEnum.TurnMultirollConditionCheck,
    });

    ctx.update_setPlayerActions(actions);
  },
  gameState: GameStateEnum.TurnMultirollConditionCheck,
});
