import { PromptAction } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { GameMetadata, GameState, PlayerEffects } from '../gamestate/gamestate.types.js';
import { AtLeastOneOf } from '../types.js';

export interface RuleHandler<T extends RuleSchema> {
  rule: T,
  ruleType: string,

  execute: (nextGameState?: GameState) => void,
  postActionExecute?: (lastAction?: PromptAction) => void,
}

export type RuleHandlerFactory<T extends RuleSchema> = (ctx: Context, rule: T) => RuleHandler<T>;

//////////////////////////////////////////////////////////////////////

export type RuleSchema = (
  DisplayRule |
  MoveRule |
  RollUntilRule |
  DiceRollRule |
  GameOverRule |
  DrinkDuringLostTurnsRule |
  ApplyMoveConditionRule |
  ChoiceRule |
  ChallengeRule |
  GroupActionRule |
  ProxyRule
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
  consequence?: RuleSchema,
  description: string,
  diceRolls?: DiceRollSchema,
}

export enum RuleType {
  DisplayRule = 'DisplayRule',
  MoveRule = 'MoveRule',
  RollUntilRule = 'RollUntilRule',
  DiceRollRule = 'DiceRollRule',
  GameOverRule = 'GameOverRule',
  DrinkDuringLostTurnsRule = 'DrinkDuringLostTurnsRule',
  ApplyMoveConditionRule = 'ApplyMoveConditionRule',
  ChoiceRule = 'ChoiceRule',
  ChallengeRule = 'ChallengeRule',
  GroupActionRule = 'GroupActionRule',
  ProxyRule = 'ProxyRule',
}

// Eg ["+", 1]
type BasicEffectGrant = [ModifierOperation, number]

// Map player target to Grants for that player target
export type Grants = Partial<Record<PlayerTarget, Grant>>;

/**
 * A grant denotes certain fields of game Metadata or PlayerEffects that can be "granted" immediately without
 * any outside logic upon rule execution. It is meant to be completely independent from a rule's logic.
 *
 * Anything that requires user choices/prompts, or would grant to only certain players, needs to be handled
 * within a rule.
 */
export type Grant = {
  // Effects for game metadata
  metadata?: {
    // key of GameMetadata
    [K in keyof Pick<
      GameMetadata, 'turnOrder'
    >]?:
    K extends 'turnOrder' ? BasicEffectGrant :
    never;
  }

  // Certain player effects can be granted immediately
  effects?: {
    // key of PlayerEffects
    [K in keyof PlayerEffects]?:
    // possible values
    K extends 'anchors' ? BasicEffectGrant :
    K extends 'extraTurns' ? BasicEffectGrant :
    K extends 'skippedTurns' ? BasicEffectGrant :
    K extends 'mandatorySkips' ? BasicEffectGrant :
    K extends 'customMandatoryTileIndex' ? BasicEffectGrant :
    K extends 'rollAugmentation' ? BasicEffectGrant :
    K extends 'speedModifier' ? {
      numTurns: number;
      modifier: [ModifierOperation, number]
    } :
    // Either ['+', 'newItemId'] or ['=', ['arrayOfNewItemIds']]
    K extends 'itemIds' ? | [ModifierOperation.addition, string] | [ModifierOperation.equal, string[]] :
    never;
  }
}

export type BaseRule = {
  id: string;
  displayText: string;
  type: RuleType;
  grants?: Grants;
}

export type DisplayRule = BaseRule & {
  type: RuleType.DisplayRule,
}

export type MoveRule = BaseRule & {
  type: RuleType.MoveRule
  playerTarget: PlayerTarget,
} & AtLeastOneOf<{
  numSpaces: number;
  direction: Direction;
  diceRolls: DiceRollSchema;
  tileIndex: number;
}>

export type RollUntilRule = BaseRule & {
  type: RuleType.RollUntilRule;
  criteria: number[];
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
  diceRolls?: DiceRollSchema;
}

export type ChallengeRule = BaseRule & {
  type: RuleType.ChallengeRule;
}

export type GroupActionRule = BaseRule & {
  type: RuleType.GroupActionRule;
} & AtLeastOneOf<{
  diceRolls?: DiceRollSchema;
  itemIds?: string[];
}>;

export type ProxyRule = BaseRule & {
  type: RuleType.ProxyRule,
  proxyRuleId: string,
}