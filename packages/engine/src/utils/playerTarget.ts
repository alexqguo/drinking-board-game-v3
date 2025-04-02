import { Context } from '../context.js';
import { beta_PlayerTarget, PlayerTargetType } from '../rules/rules.types.js';

function assertNever(neverPtType: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(neverPtType)}`);
}

export const getPlayerIdsForPlayerTarget = (ctx: Context, pt: beta_PlayerTarget): string[] => {
  switch (pt.type) {
    case PlayerTargetType.custom:
      return []; // Caller needs to handle this case
    case PlayerTargetType.self:
      return [ctx.currentPlayer.id];
    case PlayerTargetType.allOthers:
      return ctx.otherPlayerIds;
    case PlayerTargetType.all:
      return ctx.allPlayerIds;
    case PlayerTargetType.closestAhead:
      return []; // todo
    case PlayerTargetType.zone:
      return []; // todo
    case PlayerTargetType.range:
      return []; // todo

    // Ensures an compile error when a PlayerTargetType is not covered
    default:
      assertNever(pt);
  }
}