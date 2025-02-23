import { Context } from '../context.js';
import { GameState } from '../gamestate/gamestate.types.js';
import { OneOf } from '../types.js';

export interface RuleHandler<T extends RuleSchema> {
  rule: T,
  ruleType: string,

  execute: (nextGameState?: GameState) => void,
  postActionExecute?: () => void,
}

export type RuleHandlerFactory<T extends RuleSchema> = (ctx: Context, rule: T) => RuleHandler<T>;

//////////////////////////////////////////////////////////////////////

export type RuleSchema = (
  DisplayRule |
  ExtraTurnRule |
  MoveRule |
  RollUntilRule |
  AddMandatoryRule |
  DiceRollRule |
  GameOverRule |
  DrinkDuringLostTurnsRule |
  ApplyMoveConditionRule |
  ChoiceRule |
  ReverseTurnOrderRule |
  ChallengeRule |
  SkipTurnRule |
  SpeedModifierRule |
  SkipNextMandatoryRule |
  AnchorRule |
  GroupRollRule |
  RollAugmentationRule |
  AcquireItemRule
)

export enum ModifierOperation {
  addition = '+',
  multiplication = '*',
  subtraction = '-',
  equal = '=',
}

export enum PlayerTarget {
  custom = 'custom',
  self = 'self',
  allOthers = 'allOthers',
  all = 'all',
}

export enum Direction {
  forward = 'forward',
  back = 'back'
}

export enum DiceRollType {
  cumulative = 'cumulative',
  default = 'default',
  allMatch = 'allMatch',
}

export interface BaseOutcomeSchema {
  rule: RuleSchema
}

export interface DiceRollSchema {
  outcomes?: OutcomeSchema[],
  numRequired: number,
  cumulative?: boolean,
  type: DiceRollType
}

export interface ChoiceSchema extends BaseOutcomeSchema {}

export interface OutcomeSchema extends BaseOutcomeSchema {
  criteria: number[],
  isAny?: boolean,
}

export interface MoveConditionSchema {
  criteria: number[],
  numSuccessesRequired: number,
  immediate?: boolean,
  consequence: RuleSchema,
  description: string,
  diceRolls?: DiceRollSchema,
}

export enum RuleType {
  DisplayRule = 'DisplayRule',
  ExtraTurnRule = 'ExtraTurnRule',
  MoveRule = 'MoveRule',
  RollUntilRule = 'RollUntilRule',
  AddMandatoryRule = 'AddMandatoryRule',
  DiceRollRule = 'DiceRollRule',
  GameOverRule = 'GameOverRule',
  DrinkDuringLostTurnsRule = 'DrinkDuringLostTurnsRule',
  ApplyMoveConditionRule = 'ApplyMoveConditionRule',
  ChoiceRule = 'ChoiceRule',
  ReverseTurnOrderRule = 'ReverseTurnOrderRule',
  ChallengeRule = 'ChallengeRule',
  SkipTurnRule = 'SkipTurnRule',
  SpeedModifierRule = 'SpeedModifierRule',
  SkipNextMandatoryRule = 'SkipNextMandatoryRule',
  AnchorRule = 'AnchorRule',
  GroupRollRule = 'GroupRollRule',
  RollAugmentationRule = 'RollAugmentationRule',
  AcquireItemRule = 'AcquireItemRule',
}

export type BaseRule = {
  id: string;
  displayText: string;
  type: RuleType;
}

export type DisplayRule = BaseRule & {
  type: RuleType.DisplayRule,
}

export type ExtraTurnRule = BaseRule & {
  type: RuleType.ExtraTurnRule
}

export type MoveRule = BaseRule & {
  type: RuleType.MoveRule
  playerTarget: PlayerTarget,
} & OneOf<{
  numSpaces: number;
  direction: Direction;
  diceRolls: DiceRollSchema;
  tileIndex: number;
}>

export type RollUntilRule = BaseRule & {
  type: RuleType.RollUntilRule;
  criteria: number[];
}

export type AddMandatoryRule = BaseRule & {
  type: RuleType.AddMandatoryRule;
  tileIndex: number;
}

export type DiceRollRule = BaseRule & {
  type: RuleType.DiceRollRule;
  diceRolls: DiceRollSchema
}

export type GameOverRule = BaseRule & {
  type: RuleType.GameOverRule
}

export type DrinkDuringLostTurnsRule = BaseRule & {
  type: RuleType.DrinkDuringLostTurnsRule;
  diceRolls: DiceRollSchema
}

export type ApplyMoveConditionRule = BaseRule & {
  type: RuleType.ApplyMoveConditionRule;
  condition: MoveConditionSchema;
  playerTarget: PlayerTarget;
}

export type ChoiceRule = BaseRule & {
  type: RuleType.ChoiceRule;
  choices: ChoiceSchema[];
  diceRolls: DiceRollSchema;
}

export type ReverseTurnOrderRule = BaseRule & {
  type: RuleType.ReverseTurnOrderRule;
}

export type ChallengeRule = BaseRule & {
  type: RuleType.ChallengeRule;
}

export type SkipTurnRule = BaseRule & {
  type: RuleType.SkipTurnRule;
  numTurns: number;
}

export type SpeedModifierRule = BaseRule & {
  type: RuleType.SpeedModifierRule;
  numTurns: number;
  playerTarget: PlayerTarget;
  modifier: [ModifierOperation, number]
}

export type SkipNextMandatoryRule = BaseRule & {
  type: RuleType.SkipNextMandatoryRule;
  numSpaces: number;
}

export type AnchorRule = BaseRule & {
  type: RuleType.AnchorRule;
  numTurns: number;
}

export type GroupRollRule = BaseRule & {
  type: RuleType.GroupRollRule;
}

export type RollAugmentationRule = BaseRule & {
  type: RuleType.RollAugmentationRule;
  modifier?: [ModifierOperation, number]
}

export type AcquireItemRule = BaseRule & {
  itemIds: string[],
  playerTarget: PlayerTarget,
}