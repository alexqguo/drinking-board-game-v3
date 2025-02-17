import { GameState } from '../enums.js';
import { findRuleHandler } from '../rules/index.js';
export const RuleTrigger = (ctx) => ({
    execute: () => {
        // Should be safe to clear out turn actions at this point
        ctx.update_setPlayerActions(ctx.currentPlayer.id, [], 'setNew', 'turnActions');
        const idx = ctx.currentPlayer.tileIndex;
        return findRuleHandler(ctx, ctx.boardHelper.boardModule.board.tiles[idx]?.rule).execute();
    },
    gameState: GameState.RuleTrigger,
});
