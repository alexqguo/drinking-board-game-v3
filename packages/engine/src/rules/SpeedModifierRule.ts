import { ActionType, PromptAction } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { createId } from '../utils/ids.js';
import { PlayerTarget, RuleHandlerFactory, SpeedModifierRule } from './rules.types.js';

const setEffectsAndClose = (ctx: Context, playerIds: string[], rule: SpeedModifierRule) => {
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

export const handler: RuleHandlerFactory<SpeedModifierRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { playerTarget } = rule;

    if (playerTarget === PlayerTarget.self) {
      setEffectsAndClose(ctx, [ctx.currentPlayer.id], rule);
    } else if (playerTarget === PlayerTarget.allOthers) {
      setEffectsAndClose(ctx, ctx.otherPlayerIds, rule);
    } else if (playerTarget === PlayerTarget.custom) {
      ctx.update_setPlayerActions<PromptAction>(
        [{
          id: createId(),
          playerId: ctx.currentPlayer.id,
          type: ActionType.promptSelectPlayer,
          candidateIds: ctx.otherPlayerIds,
        }],
        'promptActions'
      );
    } else if (playerTarget === PlayerTarget.all) {
      setEffectsAndClose(ctx, ctx.allPlayerIds, rule);
    }
  },
  postActionExecute: () => {
    if (ctx.arePromptActionsCompleted) {
      setEffectsAndClose(ctx, [String(ctx.allPromptActions[0]?.result)], rule);
    }
  },
  ruleType: 'SpeedModifierRule',
});