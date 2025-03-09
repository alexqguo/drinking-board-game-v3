import { ActionType } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { createId } from '../utils/ids.js';
import { getUpdatedValue } from '../utils/math.js';
import { Grant, Grants, ModifierOperation } from './rules.types.js';

/**
 * Grants are for now basically just player effects that are "granted" to the current user
 * as a part of their rule execution. This is basically just common logic for handling simple
 * data updates on PlayerEffects, as opposed to creating a distinct rule type for each
 * effect that can be updated.
 *
 * TODO- clean all this up. Lots of repetitive code/logic.
 * Just a matter of getting Typescript to be happy with it
 *
 * @param ctx game context
 * @param grants grants object to determine what to add to the current player
 */
export const handleGrants = (ctx: Context, grants: Grants) => {
  const { allPlayerIds, otherPlayerIds, currentPlayer } = ctx;

  if (grants.all) {
    allPlayerIds.forEach(pid => {
      applyGrants(ctx, pid, grants.all);
    });
  }

  if (grants.allOthers) {
    otherPlayerIds.forEach(pid => {
      applyGrants(ctx, pid, grants.allOthers);
    });
  }

  if (grants.self) {
    applyGrants(ctx, currentPlayer.id, grants.self);
  }

  if (grants.custom) {
    ctx.update_setPlayerActions([{
      id: createId(),
      type: ActionType.promptGrantSelectPlayer,
      playerId: currentPlayer.id,
      candidateIds: ctx.otherPlayerIds,
    }]);
  }
}

const applyGrants = (ctx: Context, playerId: string, grant: Grant = {}) => {
  const playerToApply = ctx.nextGame.players[playerId]!;

  if (grant.metadata) {
    const { turnOrder } = grant.metadata;

    if (turnOrder) {
      const [operation, value] = turnOrder;
      ctx.update_setGameMetadataPartial({
        turnOrder: getUpdatedValue(operation, ctx.nextGame.metadata.turnOrder, value)
      });
    }
  }

  if (grant.effects) {
    const {
      skippedTurns,
      mandatorySkips,
      customMandatoryTileIndex,
      extraTurns,
      anchors,
      itemIds,
      rollAugmentation,
      speedModifier,
    } = grant.effects;

    if (speedModifier) {
      const { numTurns, modifier } = speedModifier;
      // Set speed modifier on player
      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        speedModifier: {
          numTurns: numTurns!,
          operation: modifier![0],
          modifier: modifier![1],
        }
      });
    }

    if (rollAugmentation) {
      // TODO: think a bit more about how this should be implemented.
      // When a user has an available roll augmentation, it should probably just be presented as a different
      // turnaction, basically like Roll +1. This is how the items in mario party work, so probably there's some familiarity there
      // Allowing players to +1 after they know their roll would be too complicated.
    }

    if (skippedTurns) {
      const [operation, value] = skippedTurns;
      const originalSkippedTurns = playerToApply.effects.skippedTurns.numTurns;
      const newSkippedTurns = getUpdatedValue(operation, originalSkippedTurns, value);

      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        skippedTurns: {
          numTurns: newSkippedTurns,
          message: 'todo- i18n general lost turns message'
        }
      });
    }

    if (mandatorySkips) {
      const [operation, value] = mandatorySkips;
      const originalSkips = playerToApply.effects.mandatorySkips;
      const newSkips = getUpdatedValue(operation, originalSkips, value);

      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        mandatorySkips: newSkips,
      });
    }

    if (customMandatoryTileIndex) {
      const [operation, value] = customMandatoryTileIndex;
      const originalMandatoryTileIdx = playerToApply.effects.customMandatoryTileIndex;
      const newMandatoryTileIdx = getUpdatedValue(operation, originalMandatoryTileIdx, value);

      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        customMandatoryTileIndex: newMandatoryTileIdx,
      });
    }

    if (extraTurns) {
      const [operation, value] = extraTurns;
      const originalExtraTurns = playerToApply.effects.extraTurns;
      const newExtraTurns = getUpdatedValue(operation, originalExtraTurns, value);

      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        extraTurns: newExtraTurns,
      });
    }

    if (anchors) {
      const [operation, value] = anchors;
      const originalAnchors = playerToApply.effects.anchors;
      const newAnchors = getUpdatedValue(operation, originalAnchors, value);

      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        anchors: newAnchors,
      });
    }

    if (itemIds) {
      const [operation, value] = itemIds;
      const originalItems = playerToApply.effects.itemIds;

      if (operation === ModifierOperation.addition) {
        const newItems = [...originalItems];
        newItems.push(value);

        ctx.update_setPlayerEffectsPartial(playerToApply.id, {
          itemIds: newItems
        });
      } else if (operation === ModifierOperation.equal) {
        ctx.update_setPlayerEffectsPartial(playerToApply.id, {
          itemIds: value
        });
      }
    }
  }
}
