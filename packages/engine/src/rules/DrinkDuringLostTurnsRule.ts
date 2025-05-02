import { RuleType } from '@repo/schemas';
import { PromptAction } from '../actions/actions.types.js';
import { createNActionObjects } from '../utils/actions.js';
import { DrinkDuringLostTurnsRule, RuleHandlerFactory } from './rules.types.js';

// TODO - this should probably be incorporated into DiceRollRule. It's basically only used for SS Anne
export const handler: RuleHandlerFactory<DrinkDuringLostTurnsRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const actions = createNActionObjects({
      n: rule.diceRolls?.numRequired || 2,
      playerId: ctx.currentPlayer.id,
      initiator: rule.id,
    });
    ctx.update_setPlayerActions(actions);
  },
  postActionExecute: () => {
    const { arePromptActionsCompleted, allActions, currentPlayer } = ctx;
    const ruleActions = allActions.filter((a) => (a as PromptAction).initiator === rule.id);

    if (arePromptActionsCompleted) {
      const rolls = ruleActions.map((a) => a.result);
      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        skippedTurns: {
          numTurns: Number(rolls[0]),
          message: {
            stringId: 'engine_lostTurnDrink',
            stringArgs: { num: rolls[1] },
          },
        },
      });
      ctx.update_setPromptActionsClosable();
    }
  },
  ruleType: RuleType.DrinkDuringLostTurnsRule,
});
