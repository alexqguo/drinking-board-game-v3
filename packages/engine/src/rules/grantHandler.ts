import { BaseRule, Grant, ModifierOperation, PlayerTargetType } from '@repo/schemas';
import { ActionType } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { createId } from '../utils/ids.js';
import { getUpdatedValue } from '../utils/math.js';
import { getPlayerIdsForPlayerTarget } from '../utils/playerTarget.js';

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
 * @param selectedPlayerId pid that came from a prompt action for custom PlayerTargetType
 */
export const handleGrants = (ctx: Context, rule: BaseRule, selectedPlayerId: string | null) => {
  const { currentPlayer } = ctx;
  const { grants = [], id } = rule;

  grants.forEach((g) => {
    const [playerTarget, grant] = g;

    if (playerTarget.type === PlayerTargetType.custom) {
      if (selectedPlayerId) {
        // If a custom player target was selected, apply grants to them.
        applyGrants(ctx, selectedPlayerId, grant);
      } else {
        ctx.update_setPlayerActions([
          {
            id: createId(),
            type: ActionType.promptGrantSelectPlayer,
            playerId: currentPlayer.id,
            candidateIds: getPlayerIdsForPlayerTarget(ctx, playerTarget),
            initiator: id,
          },
        ]);
      }
      return;
    }

    const playerIds = getPlayerIdsForPlayerTarget(ctx, playerTarget);
    playerIds.forEach((pid) => {
      applyGrants(ctx, pid, grant);
    });
  });
};

const applyGrants = (ctx: Context, playerId: string, grant: Grant = {}) => {
  const playerToApply = ctx.nextGame.players[playerId]!;

  if (grant.metadata) {
    const { turnOrder } = grant.metadata;

    if (turnOrder) {
      const [operation, value] = turnOrder;
      ctx.update_setGameMetadataPartial({
        turnOrder: getUpdatedValue(operation, ctx.nextGame.metadata.turnOrder, value),
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
      immediateTurns,
      turnStartRule,
    } = grant.effects;

    if (speedModifier) {
      const { numTurns, modifier } = speedModifier;
      // Set speed modifier on player
      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        speedModifier: {
          numTurns: numTurns!,
          operation: modifier![0],
          modifier: modifier![1],
        },
      });
    }

    if (rollAugmentation) {
      const { numTurns, modifier } = rollAugmentation;
      // Set roll augmentation effect on player
      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        rollAugmentation: {
          numTurns: numTurns!,
          operation: modifier![0],
          modifier: modifier![1],
        },
      });
    }

    if (skippedTurns) {
      const [operation, value] = skippedTurns;
      const originalSkippedTurns = playerToApply.effects.skippedTurns.numTurns;
      const newSkippedTurns = getUpdatedValue(operation, originalSkippedTurns, value);

      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        skippedTurns: {
          numTurns: newSkippedTurns,
          message: {
            stringId: 'engine_lostTurns',
          },
        },
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

    if (immediateTurns) {
      const [operation, value] = immediateTurns;
      const originalImmediateTurns = playerToApply.effects.immediateTurns;
      const newImmediateTurns = getUpdatedValue(operation, originalImmediateTurns, value);

      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        immediateTurns: newImmediateTurns,
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
      const originalItemsSet = new Set(originalItems);

      if (operation === ModifierOperation.addition) {
        if (originalItemsSet.has(value)) {
          ctx.loggers.display(`${playerToApply.name} acquired ${value}`);
        } else {
          const newItems = [...originalItems];
          newItems.push(value);

          ctx.update_setPlayerEffectsPartial(playerToApply.id, {
            itemIds: newItems,
          });
        }
      } else if (operation === ModifierOperation.equal) {
        ctx.update_setPlayerEffectsPartial(playerToApply.id, {
          itemIds: value,
        });
      } else if (operation === 'swap') {
        // Swaps items between the selected player and the current player
        const curPlayerItems = [...ctx.currentPlayer.effects.itemIds];
        ctx.update_setPlayerEffectsPartial(playerToApply.id, {
          itemIds: curPlayerItems,
        });
        ctx.update_setPlayerEffectsPartial(ctx.currentPlayer.id, {
          itemIds: originalItems,
        });
      }
    }

    if (turnStartRule) {
      // Set turn start rule on player
      ctx.update_setPlayerEffectsPartial(playerToApply.id, {
        turnStartRule: turnStartRule,
      });
    }
  }
};
