import { findGameStateHandler } from './index.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';

export const TurnEnd: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const { currentPlayer, sortedPlayers, nextGame } = ctx;
    const sortedPlayerIds = sortedPlayers.map(p => p.id);
    const currentPlayerIdx = sortedPlayerIds.indexOf(currentPlayer.id);
    const { turnOrder } = nextGame.metadata;
    const playerIds = Object.keys(nextGame.players);
    let nextPlayerId;

    if (currentPlayer.effects.extraTurns > 0) {
      nextPlayerId = currentPlayer.id;
      ctx.updatePlayerEffectsPartial(currentPlayer.id, {
        extraTurns: currentPlayer.effects.extraTurns - 1,
      });
    } else {
      const pos = currentPlayerIdx + turnOrder;
      const length = sortedPlayers.length;
      // Wrap back around if necessary
      const nextPlayerIdx = (pos < 0 ? length - (-pos % length) : pos) % length;
      nextPlayerId = playerIds[nextPlayerIdx];
    }

    ctx.updateGameMetadataPartial({
      currentPlayerId: nextPlayerId,
    });

    return findGameStateHandler(ctx, GameState.TurnCheck).execute();
  },
  gameState: GameState.TurnEnd,
});