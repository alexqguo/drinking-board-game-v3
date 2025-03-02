import { Context } from '../context.js';
import { GameState } from '../gamestate/gamestate.types.js';
import { handler as AcquireItemRuleFactory } from './AcquireItemRule.js';
import { handler as AddMandatoryRuleFactory } from './AddMandatoryRule.js';
import { handler as AnchorRuleFactory } from './AnchorRule.js';
import { handler as ApplyMoveConditionRuleFactory } from './ApplyMoveConditionRule.js';
import { handler as ChallengeRuleFactory } from './ChallengeRule.js';
import { handler as ChoiceRuleFactory } from './ChoiceRule.js';
import { handler as DiceRollRuleFactory } from './DiceRollRule.js';
import { handler as DisplayRuleFactory } from './DisplayRule.js';
import { handler as DrinkDuringLostTurnsRuleFactory } from './DrinkDuringLostTurnsRule.js';
import { handler as ExtraTurnRuleFactory } from './ExtraTurnRule.js';
import { handler as GameOverRuleFactory } from './GameOverRule.js';
import { handler as GroupRollRuleFactory } from './GroupRollRule.js';
import { handler as MoveRuleFactory } from './MoveRule.js';
import { handler as ReverseTurnOrderRuleFactory } from './ReverseTurnOrderRule.js';
import { handler as RollAugmentationRuleFactory } from './RollAugmentationRule.js';
import { handler as RollUntilRuleFactory } from './RollUntilRule.js';
import { DisplayRule, RuleHandler, RuleSchema, RuleType } from './rules.types.js';
import { handler as SkipNextMandatoryRuleFactory } from './SkipNextMandatoryRule.js';
import { handler as SkipTurnRuleFactory } from './SkipTurnRule.js';
import { handler as SpeedModifierRuleFactory } from './SpeedModifierRule.js';

export * from './rules.types.js';

const handlerFactoryMap = {
  [RuleType.DisplayRule]: DisplayRuleFactory,
  [RuleType.ExtraTurnRule]: ExtraTurnRuleFactory,
  [RuleType.MoveRule]: MoveRuleFactory,
  [RuleType.RollUntilRule]: RollUntilRuleFactory,
  [RuleType.AddMandatoryRule]: AddMandatoryRuleFactory,
  [RuleType.DiceRollRule]: DiceRollRuleFactory,
  [RuleType.GameOverRule]: GameOverRuleFactory,
  [RuleType.DrinkDuringLostTurnsRule]: DrinkDuringLostTurnsRuleFactory,
  [RuleType.ApplyMoveConditionRule]: ApplyMoveConditionRuleFactory,
  [RuleType.ChoiceRule]: ChoiceRuleFactory,
  [RuleType.ReverseTurnOrderRule]: ReverseTurnOrderRuleFactory,
  [RuleType.ChallengeRule]: ChallengeRuleFactory,
  [RuleType.SkipTurnRule]: SkipTurnRuleFactory,
  [RuleType.SpeedModifierRule]: SpeedModifierRuleFactory,
  [RuleType.SkipNextMandatoryRule]: SkipNextMandatoryRuleFactory,
  [RuleType.AnchorRule]: AnchorRuleFactory,
  [RuleType.GroupRollRule]: GroupRollRuleFactory,
  [RuleType.RollAugmentationRule]: RollAugmentationRuleFactory,
  [RuleType.AcquireItemRule]: AcquireItemRuleFactory,
};

const withCommonBehavior = <T extends RuleSchema>(
  ctx: Context,
  handler: RuleHandler<T>
): RuleHandler<T> => Object.freeze({
  ...handler,

  execute: (nextGameState: GameState = GameState.RuleEnd) => {
    ctx.loggers.debug(`Setting rule prompt for rule ID ${handler.rule.id}`);
    // When executing the outcome of a dicerollrule, this erases the existing prompt
    // TODO- don't overwrite the entire object, don't overwrite ruleId either
    ctx.update_setGamePrompt({
      ruleId: handler.rule.id,
      nextGameState,
    });

    handler.execute(nextGameState);
  },
  postActionExecute: () => {
    // Common behavior goes here
    ctx.loggers.debug(`Handling post-action rule logic for ${handler.rule.id}`);
    handler.postActionExecute?.();
  },
});

export const findRuleHandler = <T extends RuleSchema>(ctx: Context, rule: T | undefined): RuleHandler<T> => {
  if (!rule) {
    ctx.loggers.error('Trying to execute an undefined rule');
    throw 'Trying to execute an undefined rule';
    // Can default back to display rule if we want?
  }

  ctx.loggers.debug(`Finding rule handler for rule type: ${rule.type}`);
  const factory = handlerFactoryMap[rule.type];
  let handler: RuleHandler<T>;

  if (factory) {
    handler = withCommonBehavior<T>(ctx, factory(ctx, rule as never) as RuleHandler<T>);
  } else {
    ctx.loggers.error(`Did not find rule handler for rule type: ${rule.type}. Defaulting to DisplayRule.`);

    handler = withCommonBehavior<T>(ctx, DisplayRuleFactory(ctx, rule as DisplayRule) as RuleHandler<T>);
  }

  return handler;
};