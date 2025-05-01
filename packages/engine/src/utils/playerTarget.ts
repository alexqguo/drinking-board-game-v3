/* eslint-disable no-case-declarations */
import { PlayerTarget } from '@repo/schemas';
import { Context } from '../context.js';
import { PlayerTargetTypeEnum } from '../rules/rules.types.js';

function assertNever(neverPtType: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(neverPtType)}`);
}

export const getPlayerIdsForPlayerTarget = (ctx: Context, pt: PlayerTarget): string[] => {
  const { allPlayerIds, otherPlayerIds, currentPlayer } = ctx;
  const { tileIndex: currentTileIndex, id: currentId } = currentPlayer;
  const otherPlayers = otherPlayerIds.map((pid) => ctx.nextGame.players[pid]!);

  switch (pt.type) {
    // A bit weird, if it's a custom type this actually returns the CANDIDATE IDS
    // Caller needs to handle logic of using it in that way and creating an alert
    case PlayerTargetTypeEnum.custom:
      if (pt.candidates) return getPlayerIdsForPlayerTarget(ctx, pt.candidates);
      return otherPlayerIds;
    case PlayerTargetTypeEnum.self:
      return [currentId];
    case PlayerTargetTypeEnum.allOthers:
      return otherPlayerIds;
    case PlayerTargetTypeEnum.all:
      return allPlayerIds;
    case PlayerTargetTypeEnum.closestAhead:
      const closestAhead = otherPlayers
        .filter((p) => p.tileIndex > currentTileIndex)
        .sort((a, b) => a.tileIndex - b.tileIndex)[0];
      return closestAhead ? [closestAhead.id] : [];
    case PlayerTargetTypeEnum.zone:
      // Other players only
      const playersInZone = otherPlayers
        .filter((p) => {
          const playerTile = ctx.boardHelper.module.board.tiles[p.tileIndex];
          return playerTile?.zoneId === pt.zoneId;
        })
        .map((p) => p.id);
      return playersInZone;
    case PlayerTargetTypeEnum.range:
      const [min, max] = pt.range;
      return otherPlayers.filter((p) => p.tileIndex >= min && p.tileIndex <= max).map((p) => p.id);

    // Ensures an compile error when a PlayerTargetType is not covered
    default:
      assertNever(pt);
  }
};
