import { RuleHandlerFactory } from './types.js';
import { clamp } from '../utils/math.js';
import { Context } from '../context.js';
import { ActionType, PlayerTarget } from '../enums.js';
import { createNDiceRollActionObjects } from '../utils/actions.js';

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
  rule: RuleSchema
) => {
  const { nextGame, boardHelper } = ctx;
  const { numSpaces, tileIndex } = rule;
  const targetPlayer = nextGame.players[targetPlayerId]!;
  const finalBoardIndex = boardHelper.boardModule.board.tiles.length - 1;

  let destinationIdx = targetPlayer.tileIndex; // Default to where they currently are, just in case
  if (numSpaces) {
    destinationIdx = clamp(targetPlayer.tileIndex + numSpaces, 0, finalBoardIndex);
  } else if (typeof tileIndex === 'number') {
    destinationIdx = clamp(tileIndex, 0, finalBoardIndex);
  }

  movePlayer(ctx, targetPlayerId, destinationIdx);
}

export const MoveRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { currentPlayer, otherPlayerIds } = ctx;
    const { playerTarget, diceRolls } = rule;
    let hadActions = false;

    if (playerTarget === PlayerTarget.custom) {
      hadActions = true;
      ctx.update_setPlayerActions<PromptAction>(
        currentPlayer.id,
        [{
          actionType: ActionType.promptSelectPlayer,
          candidateIds: otherPlayerIds,
        }],
        'add',
        'promptActions'
      );
    }

    // If dice rolls are required, add those actions
    if (diceRolls) {
      hadActions = true;
      const diceRollActions = createNDiceRollActionObjects({
        n: diceRolls.numRequired
      });
      ctx.update_setPlayerActions(
        currentPlayer.id,
        diceRollActions,
        'add',
        'promptActions',
      );
    }

    // If there are no actions, we should be able to resolve now
    if (!hadActions) {
      calculateNewPositionAndMovePlayer(ctx, ctx.currentPlayer.id, rule);
    }
  },
  postActionExecute: () => {
    // TODO
  },
  ruleType: 'MoveRule',
})