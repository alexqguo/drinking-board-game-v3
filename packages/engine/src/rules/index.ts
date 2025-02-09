import { RuleHandler, RuleHandlerFactory } from './types.js';
import { DisplayRule } from './DisplayRule.js';
import { BaseContext } from '../engine.js';
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
  ctx: BaseContext,
  handler: RuleHandler
): RuleHandler => Object.freeze({
  ...handler,

  execute: (nextGameState: GameState = GameState.RuleEnd) => {
    ctx.updateGamePrompt({
      ruleId: handler.rule.id, // TODO- this doesn't exist yet
      nextGameState,
      actions: {} // Individual handler will set these
    })

    handler.execute(nextGameState);
  },
  postActionExecute: () => {
    // Common behavior goes here
    handler.postActionExecute?.();
  },
});

export const findRuleHandler = (ctx: BaseContext, rule: RuleSchema): RuleHandler => {
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