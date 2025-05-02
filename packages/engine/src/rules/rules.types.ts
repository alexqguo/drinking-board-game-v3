import type { BaseRule } from '@repo/schemas';
import { PromptAction } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { GameState } from '../gamestate/gamestate.types.js';

export type {
  ApplyMoveConditionRule,
  ChallengeRule,
  ChoiceRule,
  DiceRollRule,
  DiceRollSchema,
  DisplayRule,
  DrinkDuringLostTurnsRule,
  GameOverRule,
  Grant,
  GroupActionRule,
  ItemBasedRule,
  ModifierOperation,
  MoveConditionSchema,
  MoveRule,
  PlayerTargetType,
  ProxyRule,
  RollUntilRule,
} from '@repo/schemas';

export interface RuleHandler<T extends BaseRule> {
  rule: T;
  ruleType: string;

  execute: (nextGameState?: GameState) => void;
  postActionExecute?: (lastAction?: PromptAction) => void;
}

export type RuleHandlerFactory<T extends BaseRule> = (ctx: Context, rule: T) => RuleHandler<T>;
