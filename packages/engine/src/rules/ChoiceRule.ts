import { ActionType, PromptAction } from '../types.js';
import { createNDiceRollActionObjects } from '../utils/actions.js';
import { createId } from '../utils/ids.js';
import { findRuleHandler } from './index.js';
import { ChoiceRule, RuleHandlerFactory } from './rules.types.js';

export const handler: RuleHandlerFactory<ChoiceRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { currentPlayer } = ctx;
    const { choices, diceRolls } = rule;

    const actions: PromptAction[] = [];

    if (diceRolls) {
      actions.push(...createNDiceRollActionObjects({
        n: diceRolls.numRequired,
      }));
    }

    const choiceIds = choices?.map(c => c.rule.id);
    actions.push({
      id: createId(),
      type: ActionType.promptSelectCustom,
      candidateIds: choiceIds,
    });

    ctx.update_setPlayerActions(
      currentPlayer.id,
      actions,
    );
  },
  postActionExecute: () => {
    const { arePromptActionsCompleted: isDone, allPromptActions, nextGame } = ctx;

    if (isDone) {
      const choiceRuleId = allPromptActions
        .find(a => a.type === ActionType.promptSelectCustom)
        ?.result as string;
      const chosenRule = rule.choices!.find(c => c.rule.id === choiceRuleId)?.rule;
      const handler = findRuleHandler(ctx, chosenRule);

      ctx.update_setGamePromptPartial({
        subsequentRuleIds: [
          ...nextGame.prompt?.subsequentRuleIds || [],
          choiceRuleId,
        ]
      });

      handler.execute();
    }
  },
  ruleType: 'ChoiceRule',
});