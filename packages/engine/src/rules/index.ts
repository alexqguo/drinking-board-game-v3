import { RuleHandler, RuleHandlerFactory } from './types.js';
import { DisplayRule } from './DisplayRule.js';
import { Context } from '../context.js';
import { GameState } from '../enums.js';

const handlerFactoryMap: { [key: string]: RuleHandlerFactory } = {
  DisplayRule,
  // ExtraTurnRule,
  // MoveRule,
  // RollUntilRule,
  // AddMandatoryRule,
  // DiceRollRule,
  // GameOverRule,
  // DrinkDuringLostTurnsRule,
  // ProxyRule,
  // ApplyMoveConditionRule,
  // ChoiceRule,
  // ReverseTurnOrderRule,
  // ChallengeRule,
  // SkipTurnRule,
  // SpeedModifierRule,
  // SkipNextMandatoryRule,
  // StarterSelectionRule,
  // UpdateStarterRule,
  // AnchorRule,
  // GroupRollRule,
  // RollAugmentationRule,
};

const withCommonBehavior = (
  ctx: Context,
  handler: RuleHandler
): RuleHandler => Object.freeze({
  ...handler,

  execute: (nextGameState: GameState = GameState.RuleEnd) => {
    ctx.update_setGamePrompt({
      ruleId: handler.rule.id, // TODO- this doesn't exist yet
      nextGameState,
    })

    handler.execute(nextGameState);
  },
  postActionExecute: () => {
    // Common behavior goes here
    handler.postActionExecute?.();
  },
});

export const findRuleHandler = (ctx: Context, rule: RuleSchema | undefined): RuleHandler => {
  if (!rule) {
    ctx.loggers.error('Trying to execute an undefined rule');
    throw 'Trying to execute an undefined rule';
    // Can default back to display rule if we want?
  }

  ctx.loggers.debug(`Finding rule handler for rule type: ${rule.type}`);
  const factory = handlerFactoryMap[rule.type];
  let handler;

  if (factory) {
    handler = withCommonBehavior(ctx, factory(ctx, rule));
  } else {
    ctx.loggers.error(`Did not find rule handler for rule type: ${rule.type}. Defaulting to DisplayRule.`);
    handler = withCommonBehavior(ctx, DisplayRule(ctx, rule));
  }

  return handler;
};