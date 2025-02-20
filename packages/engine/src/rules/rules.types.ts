import { Context } from '../context.js'
import { GameState, OneOf } from '../types.js';

export interface RuleHandler {
  rule: RuleSchema,
  ruleType: string,

  execute: (nextGameState?: GameState) => void,
  postActionExecute?: () => void,
}

export type RuleHandlerFactory = (ctx: Context, rule: RuleSchema) => RuleHandler;

//////////////////////////////////////////////////////////////////////

export interface RuleSchema {
  id: string,
  type: string,
  displayText: string,
  diceRolls?: DiceRollSchema
  numTurns?: number
  playerTarget?: PlayerTarget
  modifier?: [ModifierOperation, number]
  criteria?: number[],
  numSpaces?: number,
  tileIndex?: number,
  direction?: Direction,
  choices?: ChoiceSchema[],
  condition?: MoveConditionSchema,
  starters?: string[],
  acquireItem?: string,
}
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
}

export enum ZoneType {
  passive = 'passive',
  active = 'active'
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

export interface ZoneSchema {
  name: string,
  type: ZoneType,
  rule: RuleSchema,
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
}export type BaseRule = {
  id: string;
  displayText: string;
  type: string;
}

export type DisplayRule = BaseRule & {
  type: 'DisplayRule',
}

export type ExtraTurnRule = BaseRule & {
  type: 'ExtraTurnRule'
}

export type MoveRule = BaseRule & {
  type: 'MoveRule'
  playerTarget: PlayerTarget,
} & OneOf<{
  numSpaces: number;
  direction: Direction;
  diceRolls: DiceRollSchema;
  tileIndex: number;
}>

export type RollUntilRule = BaseRule & {
  type: 'RollUntilRule';
  criteria: number[];
}

export type AddMandatoryRule = BaseRule & {
  type: 'AddMandatoryRule';
  tileIndex: number;
}

export type DiceRollRule = BaseRule & {
  type: 'DiceRollRule';
  diceRolls: DiceRollSchema
}

export type GameOverRule = BaseRule & {
  type: 'GameOverRule'
}

export type DrinkDuringLostTurnsRule = BaseRule & {
  type: 'DrinkDuringLostTurnsRule';
  diceRolls: DiceRollSchema
}

export type ApplyMoveConditionRule = BaseRule & {
  type: 'ApplyMoveConditionRule';
  condition: MoveConditionSchema;
}

export type ChoiceRule = BaseRule & {
  type: 'ChoiceRule';
  choices: ChoiceSchema[];
}

export type ReverseTurnOrderRule = BaseRule & {
  type: 'ReverseTurnOrderRule';
}

export type ChallengeRule = BaseRule & {
  type: 'ChallengeRule';
}

export type SkipTurnRule = BaseRule & {
  type: 'SkipTurnRule';
  numTurns: number;
}

export type SpeedModifierRule = BaseRule & {
  type: 'SpeedModifierRule';
  numTurns: number;
  playerTarget: PlayerTarget;
  modifier: [ModifierOperation, number]
}

export type SkipNextMandatoryRule = BaseRule & {
  type: 'SkipNextMandatoryRule';
  numSpaces: number;
}

export type AnchorRule = BaseRule & {
  type: 'AnchorRule';
  numTurns: number;
}

export type GroupRollRule = BaseRule & {
  type: 'GroupRollRule';
}

export type RollAugmentationRule = BaseRule & {
  type: 'RollAugmentationRule';
  modifier?: [ModifierOperation, number]
}
