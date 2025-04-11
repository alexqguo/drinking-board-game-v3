/* eslint-disable no-case-declarations */
import { Context } from '../context.js';
import { PlayerTarget, PlayerTargetType } from '../rules/rules.types.js';

function assertNever(neverPtType: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(neverPtType)}`);
}

export const getPlayerIdsForPlayerTarget = (ctx: Context, pt: PlayerTarget): string[] => {
  const { allPlayerIds, otherPlayerIds, currentPlayer } = ctx;
  const { tileIndex: currentTileIndex, id: currentId } = currentPlayer;
  const otherPlayers = otherPlayerIds.map(pid => ctx.nextGame.players[pid]!);

  switch (pt.type) {
    // A bit weird, if it's a custom type this actually returns the CANDIDATE IDS
    // Caller needs to handle logic of using it in that way and creating an alert
    case PlayerTargetType.custom:
      if (pt.candidates) return getPlayerIdsForPlayerTarget(ctx, pt.candidates);
      return otherPlayerIds;
    case PlayerTargetType.self:
      return [currentId];
    case PlayerTargetType.allOthers:
      return otherPlayerIds;
    case PlayerTargetType.all:
      return allPlayerIds;
    case PlayerTargetType.closestAhead:
      const closestAhead = otherPlayers
        .filter(p => p.tileIndex > currentTileIndex)
        .sort((a, b) => a.tileIndex - b.tileIndex)[0];
      return closestAhead ? [closestAhead.id] : [];
    case PlayerTargetType.zone:
      // Other players only
      const playersInZone = otherPlayers
        .filter(p => {
          const playerTile = ctx.boardHelper.module.board.tiles[p.tileIndex];
          return playerTile?.zoneId === pt.zoneId;
        })
        .map(p => p.id);
      return playersInZone;
    case PlayerTargetType.range:
      const [min, max] = pt.range;
      return otherPlayers
        .filter(p => p.tileIndex >= min && p.tileIndex <= max)
        .map(p => p.id);

    // Ensures an compile error when a PlayerTargetType is not covered
    default:
      assertNever(pt);
  }
}