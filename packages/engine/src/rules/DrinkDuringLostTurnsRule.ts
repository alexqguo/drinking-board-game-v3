import { createNDiceRollActionObjects } from '../utils/actions.js';
import { RuleHandlerFactory } from './rules.types.js';

// TODO - this should probably be incorporated into DiceRollRule. It's basically only used for SS Anne
export const DrinkDuringLostTurnsRule: RuleHandlerFactory = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const actions = createNDiceRollActionObjects({ n: rule.diceRolls?.numRequired || 2 });
    ctx.update_setPlayerActions(
      ctx.currentPlayer.id,
      actions,
    );
  },
  postActionExecute: () => {
    const { arePromptActionsCompleted, allPromptActions, currentPlayer } = ctx;

    if (arePromptActionsCompleted) {
      const rolls = allPromptActions.map(a => a.result);
      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        skippedTurns: {
          numTurns: Number(rolls[0]),
          message: `[todo-i18n] Drink ${rolls[1]}`,
        },
      });
      ctx.update_setPromptActionsClosable();
    }
  },
  ruleType: 'DrinkDuringLostTurnsRule',
});