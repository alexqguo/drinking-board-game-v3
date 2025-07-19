import { ApplyMoveConditionRule, GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { createNActionObjects } from '../utils/actions.js';
import { GameStateHandlerFactory } from './gamestate.types.js';

export const TurnMultirollConditionCheck: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    // TODO- shouldn't this use the ruleId from the actual moveCondition effect
    // in most cases should end up being the same but that would be how to guarantee it
    const turnConditionRule = ctx.boardHelper.module.board.tiles[currentPlayer.tileIndex]
      ?.rule as ApplyMoveConditionRule;

    // For iterative rolling, only create 1 action at a time
    const isIterative = turnConditionRule?.condition?.allowIterativeRolling;
    const numActions = isIterative ? 1 : turnConditionRule?.condition!.diceRolls?.numRequired || 1;

    const actions = createNActionObjects({
      n: numActions,
      playerId: ctx.currentPlayer.id,
      initiator: turnConditionRule.id,
    });

    ctx.update_setPlayerActions(actions);
    ctx.update_setGamePrompt({
      ruleId: turnConditionRule.id,
      nextGameState: GameState.TurnStart,
    });
  },
  gameState: GameState.TurnMultirollConditionCheck,
});
