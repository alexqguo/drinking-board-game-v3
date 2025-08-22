import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { findRuleHandler } from '../rules/index.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const TurnStartRuleCheck: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    const { effects } = currentPlayer;
    const { turnStartRule } = effects;

    // Execute turn start rule if one exists
    if (turnStartRule) {
      // Decrement turn count or remove if expired
      if (turnStartRule.numTurns > 0) {
        const newNumTurns = turnStartRule.numTurns - 1;

        if (newNumTurns === 0) {
          // Rule expired, remove it
          ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
            turnStartRule: null,
          });
        } else {
          // Decrement turn count
          ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
            turnStartRule: {
              ...turnStartRule,
              numTurns: newNumTurns,
            },
          });
        }
      }

      const ruleHandler = findRuleHandler(ctx, turnStartRule.rule);

      ctx.update_setGamePrompt({
        ruleId: turnStartRule.rule.id,
        nextGameState: GameState.TurnStart, // Route to new TurnStart for validation
      });

      ruleHandler.execute();
      return;
    }

    // No turnStartRule, proceed directly to TurnStart
    findGameStateHandler(ctx, GameState.TurnStart).execute();
  },
  gameState: GameState.TurnStartRuleCheck,
});
