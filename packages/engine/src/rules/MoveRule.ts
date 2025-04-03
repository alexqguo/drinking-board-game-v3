import { ActionType, PromptAction } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { createNActionObjects } from '../utils/actions.js';
import { createId } from '../utils/ids.js';
import { clamp, sumNumbers } from '../utils/math.js';
import { getPlayerIdsForPlayerTarget } from '../utils/playerTarget.js';
import { Direction, MoveRule, PlayerTargetType, RuleHandlerFactory, RuleType } from './rules.types.js';

/**
 * In charge of updating the player location in the store and resolving the alert
 */
const movePlayer = (
  ctx: Context,
  targetPlayerId: string,
  targetTileIndex: number
) => {
  ctx.update_setPlayerDataPartial(targetPlayerId, {
    tileIndex: targetTileIndex,
  });
  ctx.update_setPromptActionsClosable();
};

/**
 * Invoked when there are no actions
 */
const calculateNewPositionAndMovePlayer = (
  ctx: Context,
  targetPlayerId: string,
  rule: MoveRule
) => {
  const { nextGame, boardHelper } = ctx;
  const { numSpaces, tileIndex } = rule;
  const targetPlayer = nextGame.players[targetPlayerId]!;
  const finalBoardIndex = boardHelper.module.board.tiles.length - 1;

  let destinationIdx = targetPlayer.tileIndex; // Default to where they currently are, just in case
  if (numSpaces) {
    destinationIdx = clamp(targetPlayer.tileIndex + numSpaces, 0, finalBoardIndex);
  } else if (typeof tileIndex === 'number') {
    destinationIdx = clamp(tileIndex, 0, finalBoardIndex);
  }

  movePlayer(ctx, targetPlayerId, destinationIdx);
}

export const handler: RuleHandlerFactory<MoveRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { currentPlayer, otherPlayerIds } = ctx;
    const { playerTarget, diceRolls } = rule;

    if (playerTarget.type === PlayerTargetType.custom) {
      ctx.update_setPlayerActions<PromptAction>(
        [{
          id: createId(),
          initiator: rule.id,
          type: ActionType.promptSelectPlayer,
          candidateIds: otherPlayerIds,
          playerId: currentPlayer.id,
        }],
        'promptActions'
      );
      return;
    }

    // If dice rolls are required, add those actions. Assumes "self" player target type
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
    playerIds.forEach(pid => {
      calculateNewPositionAndMovePlayer(ctx, pid, rule);
    });
  },
  // Can be either custom player selection, or dice rolls and custom player selection
  postActionExecute: () => {
    const {
      arePromptActionsCompleted: isDone,
      currentPlayer,
      boardHelper,
      nextGame,
      allActions
    } = ctx;
    const { direction, diceRolls } = rule;
    const finalBoardIndex = boardHelper.module.board.tiles.length - 1;
    const ruleActions = allActions.filter(a => (a as PromptAction).initiator === rule.id);
    const firstAction = ruleActions[0] as PromptAction; // cast to make safe to access

    if (isDone && diceRolls) {
      let playerIdToMove = currentPlayer.id
      // Eek...
      const rolls: number[] = ruleActions.filter(a => !!a.result && !isNaN(Number(a.result)))
        .map(a => a.result as number);
      const total = sumNumbers(rolls) * (direction === Direction.back ? -1 : 1);

      if (firstAction.type === ActionType.promptSelectPlayer) {
        playerIdToMove = String(firstAction.result);
      }
      const targetPlayer = nextGame.players[playerIdToMove]!;

      movePlayer(ctx, playerIdToMove, clamp(targetPlayer.tileIndex + total, 0, finalBoardIndex));
    } else if (isDone) {
      // No dice rolls, it was just a player selection
      const playerSelectionId = String(firstAction.result);
      calculateNewPositionAndMovePlayer(ctx, playerSelectionId, rule);
    }
  },
  ruleType: RuleType.MoveRule,
});