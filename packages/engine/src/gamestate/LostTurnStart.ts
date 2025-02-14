import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';

export const LostTurnStart: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const { currentPlayer } = ctx;
    ctx.updatePlayerEffectsPartial(currentPlayer.id, {
      skippedTurns: {
        ...currentPlayer.effects.skippedTurns,
        numTurns: currentPlayer.effects.skippedTurns.numTurns - 1,
      }
    });

    ctx.updateGamePrompt({
      nextGameState: GameState.TurnEnd,
      // TODO: i18n?
      messageOverride: currentPlayer.effects.skippedTurns.message,
    });

    ctx.updatePromptActions_canClose();

    ctx.loggers.display(`${currentPlayer.name} cannot take their turn!`);
  },
  gameState: GameState.LostTurnStart,
});