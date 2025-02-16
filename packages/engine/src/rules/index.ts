import { RuleHandler, RuleHandlerFactory } from './types.js';
import { Context } from '../context.js';
import { GameState } from '../enums.js';
import { DisplayRule } from './DisplayRule.js';
import { ExtraTurnRule } from './ExtraTurnRule.js';
import { MoveRule } from './MoveRule.js';
import { AddMandatoryRule } from './AddMandatoryRule.js';
import { RollUntilRule } from './RollUntilRule.js';
import { DiceRollRule } from './DiceRollRule.js';
import { GameOverRule } from './GameOverRule.js';
import { DrinkDuringLostTurnsRule } from './DrinkDuringLostTurnsRule.js';
import { ApplyMoveConditionRule } from './ApplyMoveConditionRule.js';
import { ChoiceRule } from './ChoiceRule.js';
import { ReverseTurnOrderRule } from './ReverseTurnOrderRule.js';

const handlerFactoryMap: { [key: string]: RuleHandlerFactory } = {
  DisplayRule,
  ExtraTurnRule,
  MoveRule,
  RollUntilRule,
  AddMandatoryRule,
  DiceRollRule,
  GameOverRule,
  DrinkDuringLostTurnsRule,
  // ProxyRule, // TODO- unused
  ApplyMoveConditionRule,
  ChoiceRule,
  ReverseTurnOrderRule,
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
    ctx.loggers.debug(`Setting rule prompt for rule ID ${handler.rule.id}`);
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