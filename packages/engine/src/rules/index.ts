import { Context } from '../context.js';
import { GameState, Prompt } from '../gamestate/gamestate.types.js';
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
import { handleGrants } from './grantHandler.js';
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
  // Rule types with fundamental game logic
  [RuleType.DisplayRule]: DisplayRuleFactory,
  [RuleType.MoveRule]: MoveRuleFactory,
  [RuleType.RollUntilRule]: RollUntilRuleFactory,
  [RuleType.DiceRollRule]: DiceRollRuleFactory,
  [RuleType.ApplyMoveConditionRule]: ApplyMoveConditionRuleFactory,
  [RuleType.ChoiceRule]: ChoiceRuleFactory,

  // Oneoff rules
  [RuleType.DrinkDuringLostTurnsRule]: DrinkDuringLostTurnsRuleFactory, // SS Anne
  [RuleType.GroupRollRule]: GroupRollRuleFactory, // Bug catching contest
  [RuleType.ChallengeRule]: ChallengeRuleFactory, // Chugging contest

  // Could be handled in grants with some effort
  [RuleType.SpeedModifierRule]: SpeedModifierRuleFactory, // could be a grant for everything except custom player target
  [RuleType.AcquireItemRule]: AcquireItemRuleFactory, // only for choices. maybe combine this into like "TargetedGrantRule"

  // Can be handled in grants:
  [RuleType.ExtraTurnRule]: ExtraTurnRuleFactory,
  [RuleType.ReverseTurnOrderRule]: ReverseTurnOrderRuleFactory,
  [RuleType.RollAugmentationRule]: RollAugmentationRuleFactory,
  [RuleType.SkipNextMandatoryRule]: SkipNextMandatoryRuleFactory,
  [RuleType.SkipTurnRule]: SkipTurnRuleFactory,
  [RuleType.GameOverRule]: GameOverRuleFactory,
  [RuleType.AnchorRule]: AnchorRuleFactory,
  [RuleType.AddMandatoryRule]: AddMandatoryRuleFactory,
};

const withCommonBehavior = <T extends RuleSchema>(
  ctx: Context,
  handler: RuleHandler<T>
): RuleHandler<T> => Object.freeze({
  ...handler,

  execute: (nextGameState: GameState = GameState.RuleEnd) => {
    ctx.loggers.debug(`Setting rule prompt for rule ID ${handler.rule.id}`);
    // When executing the outcome of a dicerollrule, this erases the existing prompt

    let promptToUse: Prompt = {
      ruleId: handler.rule.id,
      nextGameState,
    };

    if (handler.rule.grants) {
      handleGrants(ctx, handler.rule.grants);
    }

    // If the prompt was set before, use that one instead. TODO: this is messy
    if (ctx.nextGame.prompt) promptToUse = ctx.nextGame.prompt;

    ctx.update_setGamePrompt(promptToUse);

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