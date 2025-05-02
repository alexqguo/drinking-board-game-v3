import { ActionType } from '@repo/enums';
import { RuleType } from '@repo/schemas';
import { PromptAction } from '../actions/actions.types.js';
import { createNActionObjects } from '../utils/actions.js';
import { createId } from '../utils/ids.js';
import { findRuleHandler } from './index.js';
import { ChoiceRule } from '@repo/schemas';
import { RuleHandlerFactory } from './rules.types.js';

export const handler: RuleHandlerFactory<ChoiceRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { currentPlayer } = ctx;
    const { choices, diceRolls } = rule;

    const actions: PromptAction[] = [];

    if (diceRolls) {
      actions.push(
        ...createNActionObjects({
          n: diceRolls.numRequired,
          playerId: currentPlayer.id,
          initiator: rule.id,
        }),
      );
    }

    const choiceIds = choices?.map((c) => c.rule.id);
    actions.push({
      id: createId(),
      type: ActionType.promptSelectCustom,
      candidateIds: choiceIds,
      playerId: currentPlayer.id,
      initiator: rule.id,
    });

    ctx.update_setPlayerActions(actions);
  },
  postActionExecute: () => {
    const { arePromptActionsCompleted: isDone, allActions, nextGame } = ctx;

    if (isDone) {
      const promptActions = allActions.filter((a) => (a as PromptAction).initiator === rule.id);
      const choiceRuleId = promptActions.find((a) => a.type === ActionType.promptSelectCustom)
        ?.result as string;
      const chosenRule = rule.choices!.find((c) => c.rule.id === choiceRuleId)?.rule;
      const handler = findRuleHandler(ctx, chosenRule);

      ctx.update_setGamePromptPartial({
        subsequentRuleIds: [...(nextGame.prompt?.subsequentRuleIds || []), choiceRuleId],
      });

      handler.execute();
    }
  },
  ruleType: RuleType.ChoiceRule,
});
