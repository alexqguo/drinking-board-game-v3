import { Context } from '../context.js';
import { GameState, GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const TurnEnd: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const { currentPlayer, sortedPlayers, nextGame, allPlayerIds } = ctx;
    const sortedPlayerIds = sortedPlayers.map(p => p.id);
    const currentPlayerIdx = sortedPlayerIds.indexOf(currentPlayer.id);
    const { turnOrder } = nextGame.metadata;
    let nextPlayerId;

    const firstPlayerWithImmediateTurns = Object.values(sortedPlayers).find(
      p => p.effects.immediateTurns > 0
    );

    if (firstPlayerWithImmediateTurns) {
      nextPlayerId = firstPlayerWithImmediateTurns.id;
      ctx.update_setPlayerEffectsPartial(nextPlayerId, {
        immediateTurns: firstPlayerWithImmediateTurns.effects.immediateTurns - 1,
      });
    } else if (currentPlayer.effects.extraTurns > 0) {
      nextPlayerId = currentPlayer.id;
      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        extraTurns: currentPlayer.effects.extraTurns - 1,
      });
    } else {
      const pos = currentPlayerIdx + turnOrder;
      const length = sortedPlayers.length;
      // Wrap back around if necessary
      const nextPlayerIdx = (pos < 0 ? length - (-pos % length) : pos) % length;
      nextPlayerId = allPlayerIds[nextPlayerIdx];
    }

    ctx.update_setGameMetadataPartial({
      currentPlayerId: nextPlayerId,
    });

    return findGameStateHandler(ctx, GameState.TurnCheck).execute();
  },
  gameState: GameState.TurnEnd,
});
