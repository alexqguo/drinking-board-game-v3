import { Context } from '../context.js';
import { findRuleHandler } from '../rules/index.js';
import { GameState, GameStateHandlerFactory } from './gamestate.types.js';

export const RuleTrigger: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    // Should be safe to clear out turn actions at this point
    ctx.update_setPlayerActions(
      ctx.currentPlayer.id,
      [],
      'setNew',
      'turnActions'
    );
    const idx = ctx.currentPlayer.tileIndex;
    const rule = ctx.boardHelper.module.board.tiles[idx]?.rule;
    ctx.loggers.display(rule?.displayText!);

    return findRuleHandler(ctx, rule).execute();
  },
  gameState: GameState.RuleTrigger,
});