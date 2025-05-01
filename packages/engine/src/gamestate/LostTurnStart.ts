import { GameStateEnum } from '@repo/schemas';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';

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
      nextGameState: GameStateEnum.TurnEnd,
      // TODO: i18n?
      messageOverride: currentPlayer.effects.skippedTurns.message,
    });

    ctx.update_setPromptActionsClosable();

    ctx.loggers.display(`${currentPlayer.name} cannot take their turn!`);
  },
  gameState: GameStateEnum.LostTurnStart,
});
