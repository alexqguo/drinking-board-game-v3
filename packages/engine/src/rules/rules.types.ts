import { PromptAction } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { GameMetadata, GameState, PlayerEffects } from '../gamestate/gamestate.types.js';
import { AtLeastOneOf } from '../types.js';

export interface RuleHandler<T extends RuleSchema> {
  rule: T;
  ruleType: string;

  execute: (nextGameState?: GameState) => void;
  postActionExecute?: (lastAction?: PromptAction) => void;
}

export type RuleHandlerFactory<T extends RuleSchema> = (ctx: Context, rule: T) => RuleHandler<T>;

//////////////////////////////////////////////////////////////////////

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type RuleSchema =
  | DisplayRule
  | MoveRule
  | RollUntilRule
  | DiceRollRule
  | GameOverRule
  | DrinkDuringLostTurnsRule
  | ApplyMoveConditionRule
  | ChoiceRule
  | ChallengeRule
  | GroupActionRule
  | ProxyRule
  | ItemBasedRule;

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export enum ModifierOperation {
  addition = '+',
  multiplication = '*',
  subtraction = '-',
  equal = '=',
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export enum PlayerTargetType {
  custom = 'custom',
  self = 'self',
  allOthers = 'allOthers',
  all = 'all',
  closestAhead = 'closestAhead',
  zone = 'zone',
  range = 'range',
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type PlayerTarget =
  /**
   * candidates: From who can this custom player selection happen? Defaults to all others
   */
  | { type: PlayerTargetType.custom; candidates?: PlayerTarget }
  | { type: PlayerTargetType.self }
  | { type: PlayerTargetType.allOthers }
  | { type: PlayerTargetType.all }
  | { type: PlayerTargetType.closestAhead }
  | { type: PlayerTargetType.zone; zoneId: string }
  | { type: PlayerTargetType.range; range: [number, number] };

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export enum Direction {
  forward = 'forward',
  back = 'back',
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export enum DiceRollType {
  cumulative = 'cumulative',
  default = 'default',
  allMatch = 'allMatch',
}

export interface BaseOutcomeSchema {
  rule: RuleSchema;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface DiceRollSchema {
  outcomes?: OutcomeSchema[];
  numRequired: number;
  cumulative?: boolean;
  type: DiceRollType;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface ChoiceSchema extends BaseOutcomeSchema {}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface OutcomeSchema extends BaseOutcomeSchema {
  criteria: number[];
  isAny?: boolean;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface MoveConditionSchema {
  criteria: number[];
  numSuccessesRequired: number;
  immediate?: boolean;
  consequence?: RuleSchema;
  description: string;
  diceRolls?: DiceRollSchema;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
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
  ItemBasedRule = 'ItemBasedRule',
}

// Eg ["+", 1]
type BasicEffectGrant = [ModifierOperation, number];

// List of PlayerTarget and Grant pairs
export type Grants = [PlayerTarget, Grant][];

/**
 * A grant denotes certain fields of game Metadata or PlayerEffects that can be "granted" immediately without
 * any outside logic upon rule execution. It is meant to be completely independent from a rule's logic.
 *
 * Anything that requires user choices/prompts, or would grant to only certain players, needs to be handled
 * within a rule.
 */
/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type Grant = {
  // Effects for game metadata
  metadata?: {
    // key of GameMetadata
    [K in keyof Pick<GameMetadata, 'turnOrder'>]?: K extends 'turnOrder' ? BasicEffectGrant : never;
  };

  // Certain player effects can be granted immediately
  effects?: {
    // key of PlayerEffects
    [K in keyof PlayerEffects]?: K extends 'anchors' // possible values
      ? BasicEffectGrant
      : K extends 'extraTurns'
        ? BasicEffectGrant
        : K extends 'immediateTurns'
          ? BasicEffectGrant
          : K extends 'skippedTurns'
            ? BasicEffectGrant
            : K extends 'mandatorySkips'
              ? BasicEffectGrant
              : K extends 'customMandatoryTileIndex'
                ? BasicEffectGrant
                : K extends 'rollAugmentation'
                  ? BasicEffectGrant
                  : K extends 'speedModifier'
                    ? {
                        numTurns: number;
                        modifier: [ModifierOperation, number];
                      }
                    : // Either ['+', 'newItemId'] or ['=', ['arrayOfNewItemIds']]
                      // TODO - cannot gain multiple items at once
                      K extends 'itemIds'
                      ? [ModifierOperation.addition, string] | [ModifierOperation.equal, string[]]
                      : never;
  };
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type BaseRule = {
  id: string;
  type: RuleType;
  grants?: Grants;
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type DisplayRule = BaseRule & {
  type: RuleType.DisplayRule;
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type MoveRule = BaseRule & {
  type: RuleType.MoveRule;
  playerTarget: PlayerTarget;
} & AtLeastOneOf<{
    numSpaces: number;
    direction: Direction;
    diceRolls: DiceRollSchema;
    tileIndex: number;
    isSwap: boolean;
  }>;

/**
 * `['match', number[]]` is the primary behavior, where you roll until you match something from `number[]`.
 * `['consecutiveMatch', number]` means rolling until you get the same roll `number` times in a row.
 */
export type RollUntilCriteria = ['match', number[]] | ['consecutiveMatch', number];
// todo- replace anywhere that does criteria: number[] with this type instead so that all places can have the logic

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type RollUntilRule = BaseRule & {
  type: RuleType.RollUntilRule;
  criteria: RollUntilCriteria;
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type DiceRollRule = BaseRule & {
  type: RuleType.DiceRollRule;
  diceRolls: DiceRollSchema;
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type GameOverRule = BaseRule & {
  type: RuleType.GameOverRule;
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type DrinkDuringLostTurnsRule = BaseRule & {
  type: RuleType.DrinkDuringLostTurnsRule;
  diceRolls: DiceRollSchema;
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type ApplyMoveConditionRule = BaseRule & {
  type: RuleType.ApplyMoveConditionRule;
  condition: MoveConditionSchema;
  playerTarget: PlayerTarget;
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type ChoiceRule = BaseRule & {
  type: RuleType.ChoiceRule;
  choices: ChoiceSchema[];
  diceRolls?: DiceRollSchema;
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type ChallengeRule = BaseRule & {
  type: RuleType.ChallengeRule;
};

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type GroupActionRule = BaseRule & {
  type: RuleType.GroupActionRule;
} & AtLeastOneOf<{
    diceRolls?: DiceRollSchema;
    itemIds?: string[];
  }>;

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type ProxyRule = BaseRule & {
  type: RuleType.ProxyRule;
  proxyRuleId: string;
};

/**
 * Executes a subsequent rule based on if the player has an item
 */
/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export type ItemBasedRule = BaseRule & {
  type: RuleType.ItemBasedRule;
  // itemId, hasItem, RuleSchema
  conditions: [string, boolean, RuleSchema][];
};
