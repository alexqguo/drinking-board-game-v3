import { Context } from '../context.js';
import { GameState, GameStateHandlerFactory } from './gamestate.types.js';

export const LostTurnStart: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const { currentPlayer } = ctx;
    ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
      skippedTurns: {
        ...currentPlayer.effects.skippedTurns,
        numTurns: currentPlayer.effects.skippedTurns.numTurns - 1,
      },
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
