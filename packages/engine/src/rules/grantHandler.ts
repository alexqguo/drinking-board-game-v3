import { Context } from '../context.js';
import { getUpdatedValue } from '../utils/math.js';
import { Grants, ModifierOperation } from './rules.types.js';

/**
 * Grants are for now basically just player effects that are "granted" to the current user
 * as a part of their rule execution. This is basically just common logic for handling simple
 * data updates on PlayerEffects, as opposed to creating a distinct rule type for each
 * effect that can be updated.
 *
 * TODO- clean all this up. Everything except itemIds can be handled with the exact same logic.
 * Just a matter of getting Typescript to be happy with it
 *
 * @param ctx game context
 * @param grants grants object to determine what to add to the current player
 */
export const handleGrants = (ctx: Context, grants: Grants) => {
  const { currentPlayer } = ctx;
  ctx.loggers.display('hello world')

  if (grants.effects) {
    const {
      skippedTurns,
      mandatorySkips,
      customMandatoryTileIndex,
      extraTurns,
      anchors,
      itemIds,
    } = grants.effects;

    if (skippedTurns) {
      const [operation, value] = skippedTurns;
      const originalSkippedTurns = currentPlayer.effects.skippedTurns.numTurns;
      const newSkippedTurns = getUpdatedValue(operation, originalSkippedTurns, value);

      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        skippedTurns: {
          numTurns: newSkippedTurns,
          message: 'todo- i18n general lost turns message'
        }
      });
    }

    if (mandatorySkips) {
      const [operation, value] = mandatorySkips;
      const originalSkips = currentPlayer.effects.mandatorySkips;
      const newSkips = getUpdatedValue(operation, originalSkips, value);

      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        mandatorySkips: newSkips,
      });
    }

    if (customMandatoryTileIndex) {
      const [operation, value] = customMandatoryTileIndex;
      const originalMandatoryTileIdx = currentPlayer.effects.customMandatoryTileIndex;
      const newMandatoryTileIdx = getUpdatedValue(operation, originalMandatoryTileIdx, value);

      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        customMandatoryTileIndex: newMandatoryTileIdx,
      });
    }

    if (extraTurns) {
      const [operation, value] = extraTurns;
      const originalExtraTurns = currentPlayer.effects.extraTurns;
      const newExtraTurns = getUpdatedValue(operation, originalExtraTurns, value);

      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        extraTurns: newExtraTurns,
      });
    }

    if (anchors) {
      const [operation, value] = anchors;
      const originalAnchors = currentPlayer.effects.anchors;
      const newAnchors = getUpdatedValue(operation, originalAnchors, value);

      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        anchors: newAnchors,
      });
    }

    if (itemIds) {
      const [operation, value] = itemIds;
      const originalItems = currentPlayer.effects.itemIds;

      if (operation === ModifierOperation.addition) {
        const newItems = [...originalItems];
        newItems.push(value);

        ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
          itemIds: newItems
        });
      } else if (operation === ModifierOperation.equal) {
        ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
          itemIds: value
        });
      }
    }
  }
}
