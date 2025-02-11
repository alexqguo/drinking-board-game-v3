import { findGameStateHandler } from './index.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { ActionType, GameState } from '../enums.js';
import { getAdjustedRoll } from '../utils/movability.js';

export const MoveCalculate: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const { currentPlayer, nextGame } = ctx;
    const { availableActions } = nextGame;
    const { effects, tileIndex } = currentPlayer;
    // TODO: ugly
    let roll = availableActions[currentPlayer.id]?.turnActions
      .find(a => a.actionType === ActionType.turnRoll)
      ?.actionResult as number;

    if (effects.speedModifier.numTurns > 0) {
      roll = getAdjustedRoll(roll, effects.speedModifier);
      ctx.loggers.display(`${currentPlayer.name}'s roll is adjusted to ${roll}!`);
      ctx.updatePlayerEffectsPartial(currentPlayer.id, {
        speedModifier: {
          ...currentPlayer.effects.speedModifier,
          numTurns: effects.speedModifier.numTurns - 1
        },
      });
    }

    let firstMandatoryIndex = ctx.boardHelper.boardModule.board.tiles
      .slice(tileIndex + 1, tileIndex + 1 + roll)
      .findIndex((tile: TileSchema, idx: number) => {
        return tile.mandatory || effects.customMandatoryTileIndex === tileIndex + idx + 1;
      });

    if (effects.mandatorySkips > 0 && firstMandatoryIndex !== -1) {
      ctx.updatePlayerEffectsPartial(currentPlayer.id, {
        mandatorySkips: effects.mandatorySkips - 1,
      });
      ctx.loggers.display(`${currentPlayer.name} can skip the next mandatory space!`);
      firstMandatoryIndex = -1;
    }

    let numSpacesToAdvance = firstMandatoryIndex === -1 ? roll : firstMandatoryIndex + 1;
    // if (currentPlayer.name === 'asdf') numSpacesToAdvance = 34;

    // Get all other players with an anchor, and sort them by position to allow us to break on the earliest match
    const otherPlayersWithAnchors: Player[] = Object.values(nextGame.players)
      .filter(p => p.id !== currentPlayer.id && p.effects.anchors && p.effects.anchors > 0)
      .sort((p1, p2) => p1.tileIndex - p2.tileIndex);

    // For each players with anchors, if their position is within the range, modify numSpacesToAdvance and break
    for (let i = 0; i < otherPlayersWithAnchors.length; i++) {
      const p = otherPlayersWithAnchors[i];

      if (p && p.tileIndex >= currentPlayer.tileIndex && p.tileIndex <= tileIndex + numSpacesToAdvance) {
        numSpacesToAdvance = p.tileIndex - tileIndex;
        ctx.updatePlayerEffectsPartial(p.id, { anchors: p.effects.anchors - 1 });
        ctx.loggers.display(`${currentPlayer.name} cannot pass ${p.name}!`);
        break;
      }
    }

    if (effects.customMandatoryTileIndex === tileIndex + numSpacesToAdvance) {
      ctx.updatePlayerEffectsPartial(currentPlayer.id, { customMandatoryTileIndex: -1 });
    }

    ctx.loggers.display(`${currentPlayer.name} advances ${numSpacesToAdvance} spaces`);
    if (numSpacesToAdvance > 0) {
      ctx.updatePlayerData(currentPlayer.id, {
        tileIndex: tileIndex + numSpacesToAdvance,
      })
      findGameStateHandler(ctx, GameState.MoveStart).execute();
    } else {
      findGameStateHandler(ctx, GameState.TurnEnd).execute();
    }
  },
  gameState: GameState.MoveCalculate,
});