import { PromptAction } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { createNActionObjects } from '../utils/actions.js';
import { sumNumbers } from '../utils/math.js';
import { findRuleHandler } from './index.js';
import {
  DiceRollRule,
  DiceRollType,
  OutcomeSchema,
  RuleHandlerFactory,
  RuleType,
  RuleTypeEnum,
} from './rules.types.js';

const getOutcome = (ctx: Context, rule: DiceRollRule, rolls: number[]): OutcomeSchema | null => {
  const { diceRolls } = rule;
  const { outcomes } = diceRolls!;
  if (!diceRolls || !outcomes) return null;

  let resultOutcome: OutcomeSchema | null = null;
  const rollsToCheck: number[] =
    diceRolls.type === DiceRollType.cumulative ? [sumNumbers(rolls)] : rolls;

  // Using tradition for loops in order to return early for an isAny match
  for (let i = 0; i < rollsToCheck.length; i++) {
    const roll = rollsToCheck[i]!;
    for (let j = 0; j < outcomes.length; j++) {
      const outcome = outcomes[j];

      // (from old version) TODO: check type here for allMatch. Not used in DiceRollRule currently
      if (outcome?.criteria.length && outcome.criteria.indexOf(roll) !== -1) {
        resultOutcome = outcome;

        // If there is an any rule, return it immediately because that is the match
        if (outcome.isAny) {
          return outcome;
        }
      }
    }
  }

  return resultOutcome;
};

export const handler: RuleHandlerFactory<DiceRollRule> = (ctx, rule) => ({
  ctx,
  rule,
  execute: () => {
    const { currentPlayer } = ctx;
    const { diceRolls } = rule;

    const diceRollActions = createNActionObjects({
      n: diceRolls!.numRequired,
      playerId: currentPlayer.id,
      initiator: rule.id,
    });
    ctx.update_setPlayerActions(diceRollActions);
  },
  postActionExecute: () => {
    const { arePromptActionsCompleted: isDone, nextGame, allActions } = ctx;
    const { numRequired } = rule.diceRolls!;
    const ruleActions = allActions.filter((a) => (a as PromptAction).initiator === rule.id);

    if (isDone) {
      const rolls: number[] = ruleActions.map((a) => a.result as number);
      const outcome = getOutcome(ctx, rule, rolls);

      if (outcome && numRequired === ruleActions.length) {
        const handler = findRuleHandler(ctx, outcome.rule);
        // TODO: update outcome identifier in the prompt
        ctx.update_setGamePromptPartial({
          subsequentRuleIds: [...(nextGame.prompt?.subsequentRuleIds || []), outcome.rule.id],
        });

        handler.execute();
      } else {
        ctx.update_setPromptActionsClosable();
      }
    }
  },
  ruleType: RuleTypeEnum.DiceRollRule,
});
