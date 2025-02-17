import { GameState } from '../enums.js';
export const LostTurnStart = (ctx) => ({
    execute: () => {
        const { currentPlayer } = ctx;
        ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
            skippedTurns: {
                ...currentPlayer.effects.skippedTurns,
                numTurns: currentPlayer.effects.skippedTurns.numTurns - 1,
            }
        });
        ctx.update_setGamePrompt({
            nextGameState: GameState.TurnEnd,
            // TODO: i18n?
            messageOverride: currentPlayer.effects.skippedTurns.message,
        });
        ctx.update_setPromptActionsClosable();
        ctx.loggers.display(`${currentPlayer.name} cannot take their turn!`);
    },
    gameState: GameState.LostTurnStart,
});
