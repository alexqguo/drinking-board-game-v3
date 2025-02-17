import { GameState } from '../enums.js';
import { createNDiceRollActionObjects } from '../utils/actions.js';
export const TurnMultirollConditionCheck = (ctx) => ({
    execute: () => {
        const currentPlayer = ctx.currentPlayer;
        const turnConditionRule = ctx.boardHelper.boardModule.board.tiles[currentPlayer.tileIndex]?.rule;
        const actions = createNDiceRollActionObjects({
            n: turnConditionRule?.condition.diceRolls?.numRequired || 1,
        });
        ctx.update_setPlayerActions(ctx.currentPlayer.id, actions);
    },
    gameState: GameState.TurnMultirollConditionCheck
});
