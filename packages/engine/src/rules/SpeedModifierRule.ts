import { Context } from '../context.js';
import { ActionType, PlayerTarget } from '../enums.js';
import { createId } from '../utils/ids.js';
import { RuleHandlerFactory } from './types.js';

const setEffectsAndClose = (ctx: Context, playerIds: string[], rule: RuleSchema) => {
  const { numTurns, modifier } = rule;

  playerIds.forEach((id: string) => {
    ctx.update_setPlayerEffectsPartial(id, {
      speedModifier: {
        numTurns: numTurns!,
        operation: modifier![0],
        modifier: modifier![1],
      }
    });
  });
  ctx.update_setPromptActionsClosable();
};

export const SpeedModifierRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { playerTarget } = rule;

    if (playerTarget === PlayerTarget.self) {
      setEffectsAndClose(ctx, [ctx.currentPlayer.id], rule);
    } else if (playerTarget === PlayerTarget.custom) {
      setEffectsAndClose(ctx, ctx.otherPlayerIds, rule);
    } else if (playerTarget === PlayerTarget.allOthers) {
      ctx.update_setPlayerActions<PromptAction>(
        ctx.currentPlayer.id,
        [{
          id: createId(),
          type: ActionType.promptSelectPlayer,
          candidateIds: ctx.otherPlayerIds,
        }],
        'add',
        'promptActions'
      );
    }
  },
  postActionExecute: () => {
    if (ctx.arePromptActionsCompleted) {
      setEffectsAndClose(ctx, ctx.allPromptActions[0]?.result, rule);
    }
  },
  ruleType: 'SpeedModifierRule',
});