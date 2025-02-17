import { clamp, sumNumbers } from '../utils/math.js';
import { ActionType, Direction, PlayerTarget } from '../enums.js';
import { createNDiceRollActionObjects } from '../utils/actions.js';
import { createId } from '../utils/ids.js';
/**
 * In charge of updating the player location in the store and resolving the alert
 */
const movePlayer = (ctx, targetPlayerId, targetTileIndex) => {
    ctx.update_setPlayerDataPartial(targetPlayerId, {
        tileIndex: targetTileIndex,
    });
    ctx.update_setPromptActionsClosable();
};
/**
 * Invoked when there are no actions
 */
const calculateNewPositionAndMovePlayer = (ctx, targetPlayerId, rule) => {
    const { nextGame, boardHelper } = ctx;
    const { numSpaces, tileIndex } = rule;
    const targetPlayer = nextGame.players[targetPlayerId];
    const finalBoardIndex = boardHelper.boardModule.board.tiles.length - 1;
    let destinationIdx = targetPlayer.tileIndex; // Default to where they currently are, just in case
    if (numSpaces) {
        destinationIdx = clamp(targetPlayer.tileIndex + numSpaces, 0, finalBoardIndex);
    }
    else if (typeof tileIndex === 'number') {
        destinationIdx = clamp(tileIndex, 0, finalBoardIndex);
    }
    movePlayer(ctx, targetPlayerId, destinationIdx);
};
export const MoveRule = (ctx, rule) => ({
    ctx,
    rule,
    execute: () => {
        const { currentPlayer, otherPlayerIds } = ctx;
        const { playerTarget, diceRolls } = rule;
        let hadActions = false;
        if (playerTarget === PlayerTarget.custom) {
            hadActions = true;
            ctx.update_setPlayerActions(currentPlayer.id, [{
                    id: createId(),
                    type: ActionType.promptSelectPlayer,
                    candidateIds: otherPlayerIds,
                }], 'add', 'promptActions');
        }
        // If dice rolls are required, add those actions
        if (diceRolls) {
            hadActions = true;
            const diceRollActions = createNDiceRollActionObjects({
                n: diceRolls.numRequired
            });
            ctx.update_setPlayerActions(currentPlayer.id, diceRollActions);
        }
        // If there are no actions, we should be able to resolve now
        if (!hadActions) {
            calculateNewPositionAndMovePlayer(ctx, ctx.currentPlayer.id, rule);
        }
    },
    postActionExecute: () => {
        const { arePromptActionsCompleted: isDone, allPromptActions: actions, currentPlayer, boardHelper, nextGame, } = ctx;
        const { direction, diceRolls } = rule;
        const finalBoardIndex = boardHelper.boardModule.board.tiles.length - 1;
        const firstAction = actions[0]; // cast to make safe to access
        if (isDone && diceRolls) {
            let playerIdToMove = currentPlayer.id;
            const rolls = actions.filter(a => !!a.result && !isNaN(Number(a.result)))
                .map(a => a.result);
            const total = sumNumbers(rolls) * (direction === Direction.back ? -1 : 1);
            if (firstAction.type === ActionType.promptSelectPlayer) {
                playerIdToMove = firstAction.result;
            }
            const targetPlayer = nextGame.players[playerIdToMove];
            movePlayer(ctx, playerIdToMove, clamp(targetPlayer.tileIndex + total, 0, finalBoardIndex));
        }
        else if (isDone) {
            // No dice rolls, it was just a player selection
            const playerSelectionId = firstAction.result;
            calculateNewPositionAndMovePlayer(ctx, playerSelectionId, rule);
        }
    },
    ruleType: 'MoveRule',
});
