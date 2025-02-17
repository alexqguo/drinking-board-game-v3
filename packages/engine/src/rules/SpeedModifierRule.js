import { ActionType, PlayerTarget } from '../enums.js';
import { createId } from '../utils/ids.js';
const setEffectsAndClose = (ctx, playerIds, rule) => {
    const { numTurns, modifier } = rule;
    playerIds.forEach((id) => {
        ctx.update_setPlayerEffectsPartial(id, {
            speedModifier: {
                numTurns: numTurns,
                operation: modifier[0],
                modifier: modifier[1],
            }
        });
    });
    ctx.update_setPromptActionsClosable();
};
export const SpeedModifierRule = (ctx, rule) => ({
    ctx,
    rule,
    execute: () => {
        const { playerTarget } = rule;
        if (playerTarget === PlayerTarget.self) {
            setEffectsAndClose(ctx, [ctx.currentPlayer.id], rule);
        }
        else if (playerTarget === PlayerTarget.custom) {
            setEffectsAndClose(ctx, ctx.otherPlayerIds, rule);
        }
        else if (playerTarget === PlayerTarget.allOthers) {
            ctx.update_setPlayerActions(ctx.currentPlayer.id, [{
                    id: createId(),
                    type: ActionType.promptSelectPlayer,
                    candidateIds: ctx.otherPlayerIds,
                }], 'add', 'promptActions');
        }
    },
    postActionExecute: () => {
        if (ctx.arePromptActionsCompleted) {
            setEffectsAndClose(ctx, ctx.allPromptActions[0]?.result, rule);
        }
    },
    ruleType: 'SpeedModifierRule',
});
