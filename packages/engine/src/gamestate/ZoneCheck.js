import { findGameStateHandler } from './index.js';
import { GameState, ZoneType } from '../enums.js';
import { findRuleHandler } from '../rules/index.js';
export const ZoneCheck = (ctx) => ({
    gameState: GameState.ZoneCheck,
    execute: () => {
        const { tiles, zones } = ctx.boardHelper.boardModule.board;
        const currentTile = tiles[ctx.currentPlayer.tileIndex];
        const currentZone = zones.find((z) => z.name === currentTile?.zone);
        if (currentZone?.rule && currentZone.type === ZoneType.active) {
            const ruleHandler = findRuleHandler(ctx, currentZone.rule);
            ctx.update_setGamePrompt({
                ruleId: currentZone.rule.id,
                nextGameState: GameState.TurnStart,
            });
            ruleHandler.execute();
            return;
        }
        return findGameStateHandler(ctx, GameState.TurnStart).execute();
    }
});
