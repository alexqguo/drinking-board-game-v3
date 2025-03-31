import { ActionType, PromptAction } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { GameState, Prompt } from '../gamestate/gamestate.types.js';
import { handler as ApplyMoveConditionRuleFactory } from './ApplyMoveConditionRule.js';
import { handler as ChallengeRuleFactory } from './ChallengeRule.js';
import { handler as ChoiceRuleFactory } from './ChoiceRule.js';
import { handler as DiceRollRuleFactory } from './DiceRollRule.js';
import { handler as DisplayRuleFactory } from './DisplayRule.js';
import { handler as DrinkDuringLostTurnsRuleFactory } from './DrinkDuringLostTurnsRule.js';
import { handler as GameOverRuleFactory } from './GameOverRule.js';
import { handleGrants } from './grantHandler.js';
import { handler as GroupActionRuleFactory } from './GroupActionRule.js';
import { handler as ItemBasedRuleFactory } from './ItemBasedRule.js';
import { handler as MoveRuleFactory } from './MoveRule.js';
import { handler as ProxyRuleFactory } from './ProxyRule.js';
import { handler as RollUntilRuleFactory } from './RollUntilRule.js';
import { DisplayRule, RuleHandler, RuleSchema, RuleType } from './rules.types.js';

export * from './rules.types.js';

const handlerFactoryMap = {
  // Rule types with fundamental game logic
  [RuleType.DisplayRule]: DisplayRuleFactory,
  [RuleType.MoveRule]: MoveRuleFactory,
  [RuleType.RollUntilRule]: RollUntilRuleFactory,
  [RuleType.DiceRollRule]: DiceRollRuleFactory,
  [RuleType.ApplyMoveConditionRule]: ApplyMoveConditionRuleFactory,
  [RuleType.ChoiceRule]: ChoiceRuleFactory,
  [RuleType.ProxyRule]: ProxyRuleFactory,
  [RuleType.ItemBasedRule]: ItemBasedRuleFactory,
  // Could be a grant but keeping a rule in case extra logic is ever needed
  [RuleType.GameOverRule]: GameOverRuleFactory,

  /**
   * Oneoff/hacky rules
   * These are valuable as their own rules as the amount of work that would be required to scalably
   * and generically implement them in preexisting rule types is not worth it considering that they
   * only happen once (thus far). If future boards need to incorporate similar behavior as well
   * then incorporating them into an existing rule type can be considered.
   */
  [RuleType.DrinkDuringLostTurnsRule]: DrinkDuringLostTurnsRuleFactory, // SS Anne
  [RuleType.GroupActionRule]: GroupActionRuleFactory, // Bug catching contest + starter selection
  [RuleType.ChallengeRule]: ChallengeRuleFactory, // Chugging contest
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
  postActionExecute: (lastAction?: PromptAction) => {
    // If the most recent action was a grant player selection action, apply the custom grants
    if (lastAction?.type === ActionType.promptGrantSelectPlayer && handler.rule.grants) {
      handleGrants(ctx, handler.rule.grants);
      return;
    }

    // Common behavior goes here
    ctx.loggers.debug(`Handling post-action rule logic for ${handler.rule.id}`);
    handler.postActionExecute?.(lastAction);
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