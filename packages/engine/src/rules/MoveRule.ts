import { ActionType } from '@repo/enums';
import { PromptAction } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { createNActionObjects } from '../utils/actions.js';
import { createId } from '../utils/ids.js';
import { clamp, sumNumbers } from '../utils/math.js';
import { getPlayerIdsForPlayerTarget } from '../utils/playerTarget.js';
import {
  Direction,
  MoveRule,
  PlayerTargetType,
  RuleHandlerFactory,
  RuleType,
} from './rules.types.js';

/**
 * Invoked when there are no actions
 */
const calculateNewPositionAndMovePlayer = (
  ctx: Context,
  targetPlayerId: string,
  rule: MoveRule,
  precalculatedDestinationIdx: number | null,
) => {
  const { nextGame, boardHelper } = ctx;
  const { numSpaces, tileIndex } = rule;

  const movePlayer = (targetTileIndex: number) => {
    ctx.update_setPlayerDataPartial(targetPlayerId, {
      tileIndex: targetTileIndex,
    });
    ctx.update_setPromptActionsClosable();
  };

  // If a destination is passed in directly, just use that
  if (precalculatedDestinationIdx) {
    movePlayer(precalculatedDestinationIdx);
    return;
  }

  // Otherwise, calcuate the next position based on the rule configuration
  const targetPlayer = nextGame.players[targetPlayerId]!;
  const finalBoardIndex = boardHelper.module.board.tiles.length - 1;

  let destinationIdx = targetPlayer.tileIndex; // Default to where they currently are, just in case
  if (numSpaces) {
    destinationIdx = clamp(targetPlayer.tileIndex + numSpaces, 0, finalBoardIndex);
  } else if (typeof tileIndex === 'number') {
    destinationIdx = clamp(tileIndex, 0, finalBoardIndex);
  }

  movePlayer(destinationIdx);
};

export const handler: RuleHandlerFactory<MoveRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { currentPlayer, otherPlayerIds } = ctx;
    const { playerTarget, diceRolls } = rule;

    // Choosing who will be moved
    if (playerTarget.type === PlayerTargetType.custom) {
      ctx.update_setPlayerActions<PromptAction>(
        [
          {
            id: createId(),
            initiator: rule.id,
            type: ActionType.promptSelectPlayer,
            candidateIds: getPlayerIdsForPlayerTarget(ctx, playerTarget),
            playerId: currentPlayer.id,
          },
        ],
        'promptActions',
      );
      return;
    }

    // If dice rolls are required, add those actions for the current player
    // i.e. "roll a die and move back that many spaces"
    if (diceRolls) {
      const diceRollActions = createNActionObjects({
        n: diceRolls.numRequired,
        playerId: currentPlayer.id,
        initiator: rule.id,
      });
      ctx.update_setPlayerActions(diceRollActions);
      return;
    }

    const playerIds = getPlayerIdsForPlayerTarget(ctx, playerTarget);
    playerIds.forEach((pid) => {
      calculateNewPositionAndMovePlayer(ctx, pid, rule, null);
    });
  },
  postActionExecute: () => {
    const {
      arePromptActionsCompleted: isDone,
      boardHelper,
      nextGame,
      allActions,
      currentPlayer,
    } = ctx;
    const { direction, playerTarget, isSwap } = rule;
    const finalBoardIndex = boardHelper.module.board.tiles.length - 1; // End of the board
    const ruleActions = allActions.filter((a) => (a as PromptAction).initiator === rule.id);

    if (isDone) {
      // 1. Deterimine who is being moved
      const playerIdsToMove = getPlayerIdsForPlayerTarget(ctx, playerTarget);
      const playerSelectionAction = ruleActions.find(
        (a) => a.type === ActionType.promptSelectPlayer,
      );
      if (playerSelectionAction) playerIdsToMove.push(playerSelectionAction.result as string);

      // 2. If there were diceRolls attached, determine how far they are moving
      // Dice roll will apply to all target players
      const hasRolls = ruleActions.some((a) => a.type === ActionType.promptRoll);
      if (hasRolls) {
        const rolls = ruleActions
          .filter((a) => a.type === ActionType.promptRoll)
          .map((a) => a.result as number);
        const total = sumNumbers(rolls) * (direction === Direction.back ? -1 : 1);
        playerIdsToMove.forEach((pid) => {
          const player = nextGame.players[pid]!;
          const nextIdx = clamp(player.tileIndex + total, 0, finalBoardIndex);
          calculateNewPositionAndMovePlayer(ctx, pid, rule, nextIdx);
        });
        // 3. If we are swapping (with the current player), we know the destination
        // Swap will only work with the first player target as you can't swap three people
      } else if (isSwap) {
        const targetPid = playerIdsToMove[0]!;
        const currentPlayerTileIndex = currentPlayer.tileIndex;
        const destinationTileIndex = nextGame.players[targetPid as string]?.tileIndex!;

        calculateNewPositionAndMovePlayer(ctx, currentPlayer.id, rule, destinationTileIndex);
        calculateNewPositionAndMovePlayer(ctx, targetPid, rule, currentPlayerTileIndex);
        // 4. Otherwise move target players normally
      } else {
        playerIdsToMove.forEach((pid) => {
          calculateNewPositionAndMovePlayer(ctx, pid, rule, null);
        });
      }
    }
  },
  ruleType: RuleType.MoveRule,
});
