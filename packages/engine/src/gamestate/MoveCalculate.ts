import { ActionType } from '../actions/actions.types.js';
import { MandatoryType, TileSchema } from '../boards/boards.types.js';
import { Context } from '../context.js';
import { getAdjustedRoll } from '../utils/movability.js';
import { GameState, GameStateHandlerFactory, Player } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const MoveCalculate: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const { currentPlayer, nextGame } = ctx;
    const { availableActions } = nextGame;
    const { effects, tileIndex } = currentPlayer;
    // TODO: ugly
    let roll = availableActions[currentPlayer.id]?.turnActions
      .find(a => a.type === ActionType.turnRoll)
      ?.result as number;

    if (effects.speedModifier.numTurns > 0) {
      roll = getAdjustedRoll(roll, effects.speedModifier);
      ctx.loggers.display(`${currentPlayer.name}'s roll is adjusted to ${roll}!`);
      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        speedModifier: {
          ...currentPlayer.effects.speedModifier,
          numTurns: effects.speedModifier.numTurns - 1
        },
      });
    }

    let firstMandatoryIndex = ctx.boardHelper.module.board.tiles
      .slice(tileIndex + 1, tileIndex + 1 + roll)
      .findIndex((tile: TileSchema, idx: number) => {
        return (
          // Tile is made mandatory by a player effect
          effects.customMandatoryTileIndex === tileIndex + idx + 1
          // Tile is always mandatory
          || tile.mandatoryType === MandatoryType.always
          // Tile is once mandatory and player has not yet visited
          || (tile.mandatoryType === MandatoryType.once && currentPlayer.visitedTiles.indexOf(tileIndex + idx) === -1)
        );
      });

    if (effects.mandatorySkips > 0 && firstMandatoryIndex !== -1) {
      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
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
        ctx.update_setPlayerEffectsPartial(p.id, { anchors: p.effects.anchors - 1 });
        ctx.loggers.display(`${currentPlayer.name} cannot pass ${p.name}!`);
        break;
      }
    }

    if (effects.customMandatoryTileIndex === tileIndex + numSpacesToAdvance) {
      ctx.update_setPlayerEffectsPartial(currentPlayer.id, { customMandatoryTileIndex: -1 });
    }

    ctx.loggers.display(`${currentPlayer.name} advances ${numSpacesToAdvance} spaces`);
    if (numSpacesToAdvance > 0) {
      ctx.update_setPlayerDataPartial(currentPlayer.id, {
        tileIndex: tileIndex + numSpacesToAdvance,
      })
      findGameStateHandler(ctx, GameState.MoveStart).execute();
    } else {
      findGameStateHandler(ctx, GameState.TurnEnd).execute();
    }
  },
  gameState: GameState.MoveCalculate,
});