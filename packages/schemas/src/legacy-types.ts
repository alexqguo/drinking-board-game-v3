// https://sinclairzx81.github.io/typebox-workbench/

export type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export interface SpeedModifier {
  operation: ModifierOperation;
  modifier: number;
  numTurns: number;
}

export interface MoveCondition {
  ruleId: string; // Condition of the rule with ruleId
  descriptionStrId: string;
  numCurrentSuccesses: number;
}

/**
 * Result of attempting to satisfy a move condition through dice rolling.
 *
 * Used by the ApplyMoveConditionRule to determine what happens after a roll:
 * - canMove: true = All required successes achieved, player can move normally
 * - canMove: false + isPartialSuccess: true = This roll succeeded but more successes needed
 * - canMove: false + isPartialSuccess: false = This roll failed, apply consequences
 */
export interface MoveConditionResult {
  /** Whether the player has satisfied all requirements and can move */
  canMove: boolean;
  /** True if this roll succeeded but more successes are still needed */
  isPartialSuccess?: boolean;
  /** Message to display to the player about the roll result */
  message: MessageOverride;
}

export interface LostTurnInfo {
  message: MessageOverride;
  numTurns: number;
}

/**
 * Represents a message override, typically for the Prompt. Uses a stringId which can
 * first be checked in the board specific i18n, then falling back to the overall i18n
 * if necessary.
 */
export interface MessageOverride {
  stringId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stringArgs?: { [key: string]: any };
  helperTextId?: string;
}

export interface PlayerEffects {
  mandatorySkips: number;
  customMandatoryTileIndex: number;
  extraTurns: number;
  immediateTurns: number;
  anchors: number;
  itemIds: string[];
  skippedTurns: LostTurnInfo;
  speedModifier: SpeedModifier;
  rollAugmentation: SpeedModifier;
  moveCondition: MoveCondition;
}

export interface GameMetadata {
  id: string;
  board: string;
  state: GameState;
  currentPlayerId: string;
  turnOrder: TurnOrder;
}

export enum TurnOrder {
  normal = 1,
  reverse = -1,
}

export enum GameState {
  NotStarted = 'NotStarted',
  GameStart = 'GameStart',
  StarterSelect = 'StarterSelect',
  TurnCheck = 'TurnCheck',
  ZoneCheck = 'ZoneCheck',
  TurnStart = 'TurnStart',
  TurnMultirollConditionCheck = 'TurnMultirollConditionCheck',
  RollStart = 'RollStart',
  RollEnd = 'RollEnd',
  MoveCalculate = 'MoveCalculate',
  MoveStart = 'MoveStart',
  MoveEnd = 'MoveEnd',
  RuleTrigger = 'RuleTrigger',
  RuleEnd = 'RuleEnd',
  TurnEnd = 'TurnEnd',
  GameOver = 'GameOver',
  TurnSkip = 'TurnSkip',
  LostTurnStart = 'LostTurnStart',
  Battle = 'Battle',
}
//////////////////////////////////////////////////////////////
export interface BoardMetadata {
  id: string;
  displayName: string;
  description?: string;
  imagePreviewUrl?: string;
  colorTheme?: string;
}

export interface BoardModule {
  board: BoardSchema;
  metadata: BoardMetadata;
  gameExtensionInfo?: GameExtensionInfo;
}

export enum MandatoryType {
  always = 'always',
  once = 'once',
}

export interface GameExtensionInfo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameState?: { [key: string]: any };
  actions?: { [key: string]: () => void };
}

export interface BoardSchema {
  imageUrl: string;
  tiles: TileSchema[];
  zones: ZoneSchema[];
  items: ItemSchema[];
  i18n: I18nSchema;
  tutorial?: {
    position: Point[];
  };
}

export interface Point {
  x: number;
  y: number;
}

export interface TileSchema {
  mandatoryType?: MandatoryType;
  rule: RuleSchema;
  position: Point[];
  zoneId?: string;
}

export interface ZoneSchema {
  id: string;
  // name: string;
  type: ZoneType;
  rule: RuleSchema;
}

export interface ItemSchema {
  id: string;
  nameStrId: string;
  descriptionStrId: string;
}

export interface I18nSchema {
  // Locale
  [key: string]: {
    // String ID -> value
    [key: string]: string;
  };
}

export enum ZoneType {
  passive = 'passive',
  active = 'active',
  passiveLeader = 'passiveLeader',
}

//////////////////////////////////////////////////////////////////////

// --- Placeholders for missing types/enums for legacy compatibility ---

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

export enum ModifierOperation {
  addition = '+',
  multiplication = '*',
  subtraction = '-',
  equal = '=',
}

export enum PlayerTargetType {
  custom = 'custom',
  self = 'self',
  allOthers = 'allOthers',
  all = 'all',
  closestAhead = 'closestAhead',
  zone = 'zone',
  range = 'range',
}

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

export enum Direction {
  forward = 'forward',
  back = 'back',
}

export enum DiceRollType {
  cumulative = 'cumulative',
  default = 'default',
  allMatch = 'allMatch',
}

export interface BaseOutcomeSchema {
  rule: RuleSchema;
}

export interface DiceRollSchema {
  outcomes?: OutcomeSchema[];
  numRequired: number;
  cumulative?: boolean;
  type: DiceRollType;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChoiceSchema extends BaseOutcomeSchema {}

export interface OutcomeSchema extends BaseOutcomeSchema {
  criteria: number[];
  isAny?: boolean;
}

export interface MoveConditionSchema {
  criteria: number[];
  numSuccessesRequired: number;
  immediate?: boolean;
  consequence?: RuleSchema;
  description: string;
  allowIterativeRolling?: boolean;
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
                    : // Either ['+', 'newItemId'] or ['=', ['arrayOfNewItemIds']] or ['swap']
                      // "swap" will swap all items with the grant's playerTarget
                      // TODO - cannot gain multiple items at once
                      K extends 'itemIds'
                      ?
                          | [ModifierOperation.addition, string]
                          | [ModifierOperation.equal, string[]]
                          | ['swap']
                      : never;
  };
};

export type BaseRule = {
  id: string;
  type: RuleType;
  grants?: Grants;
  helperTextId?: string; // Optional string ID for helper text
};

export type DisplayRule = BaseRule & {
  type: RuleType.DisplayRule;
};

export type MoveRule = BaseRule & {
  type: RuleType.MoveRule;
  playerTarget: PlayerTarget;
} & AtLeastOneOf<{
    numSpaces: number;
    direction: Direction; // only for use in conjunction with diceRolls
    diceRolls: DiceRollSchema;
    tileIndex: number;
    isSwap: boolean;
  }>;

export type RollUntilCriteria = ['match', number[]] | ['consecutiveMatch', number];
// todo- replace anywhere that does criteria: number[] with this type instead so that all places can have the logic

export type RollUntilRule = BaseRule & {
  type: RuleType.RollUntilRule;
  criteria: RollUntilCriteria;
};

export type DiceRollRule = BaseRule & {
  type: RuleType.DiceRollRule;
  diceRolls: DiceRollSchema;
};

export type GameOverRule = BaseRule & {
  type: RuleType.GameOverRule;
};

export type DrinkDuringLostTurnsRule = BaseRule & {
  type: RuleType.DrinkDuringLostTurnsRule;
  diceRolls: DiceRollSchema;
};

/**
 * ApplyMoveConditionRule creates a condition that prevents players from moving normally until they satisfy specific criteria.
 * This rule is used for scenarios where players must "prove themselves" before advancing, such as boss battles or skill challenges.
 *
 * ## Core Behavior:
 * - Applies a MoveCondition to the target player(s)
 * - The condition is checked whenever the affected player attempts to move on their turn
 * - Players cannot advance until they satisfy the condition criteria
 *
 * ## Key Properties:
 *
 * ### playerTarget
 * Determines who receives the move condition:
 * - `self`: Current player gets the condition
 * - `custom`: Prompts current player to select who gets the condition
 * - Other targets: All matching players get the condition
 *
 * ### condition.criteria
 * Array of dice roll values that count as "success" (e.g., [2,3,4,5,6] means rolling 1 is failure)
 *
 * ### condition.numSuccessesRequired
 * How many successful rolls are needed to clear the condition:
 * - 0: Single roll attempt, pass or fail (condition clears either way)
 * - 1+: Must accumulate this many successes to clear the condition
 *
 * ### condition.immediate
 * When true, forces immediate dice rolling within the rule execution:
 * - false (default): Condition applied, player rolls on their next turn start
 * - true: Player must roll immediately as part of this rule
 *
 * ### condition.allowIterativeRolling
 * Only applies when immediate=true and numSuccessesRequired > 1:
 * - false (default): All required rolls happen at once, then rule ends
 * - true: After each roll, player gets another roll action if more successes needed
 *
 * ### condition.consequence
 * Optional rule to execute when a player fails a roll (useful for penalties like taking drinks)
 *
 * ## Flow Examples:
 *
 * ### Basic Delayed Condition:
 * ```
 * immediate: false, numSuccessesRequired: 1, criteria: [6]
 * ```
 * 1. Player lands on tile, gets move condition applied
 * 2. On their next turn, they must roll a 6 to move
 * 3. If they fail, they stay put and try again next turn
 * 4. If they succeed, condition clears and they move normally
 *
 * ### Immediate Single Roll:
 * ```
 * immediate: true, numSuccessesRequired: 1, criteria: [4,5,6]
 * ```
 * 1. Player lands on tile
 * 2. Immediately forced to roll a die
 * 3. Success (4-6): Turn continues normally
 * 4. Failure (1-3): Move condition applied, must retry on next turn
 *
 * ### Immediate Multiple Rolls (Traditional):
 * ```
 * immediate: true, numSuccessesRequired: 3, criteria: [2,3,4,5,6], allowIterativeRolling: false
 * ```
 * 1. Player lands on tile
 * 2. Forced to roll 3 dice immediately
 * 3. Count successes across all rolls
 * 4. If enough successes: Turn continues
 * 5. If not enough: Move condition applied for remaining successes
 *
 * ### Iterative Rolling (Poe Sisters):
 * ```
 * immediate: true, numSuccessesRequired: 4, criteria: [2,3,4,5,6], allowIterativeRolling: true
 * ```
 * 1. Player lands on tile
 * 2. Forced to roll one die
 * 3. Success: Increment success count, roll again if < 4 total successes
 * 4. Failure: Execute consequence rule, roll again
 * 5. Repeat until 4 successes achieved
 * 6. Once complete: Turn continues normally
 *
 * ## State Management:
 * The condition is stored in player.effects.moveCondition with:
 * - ruleId: Reference to this rule for validation logic
 * - numCurrentSuccesses: Progress toward numSuccessesRequired
 * - descriptionStrId: Display text for UI
 *
 * The condition is automatically cleared when:
 * - Required successes are achieved
 * - numSuccessesRequired is 0 (regardless of success/failure)
 * - Player moves to a different tile (in some game states)
 */
export type ApplyMoveConditionRule = BaseRule & {
  type: RuleType.ApplyMoveConditionRule;
  condition: MoveConditionSchema;
  playerTarget: PlayerTarget;
};

export type ChoiceRule = BaseRule & {
  type: RuleType.ChoiceRule;
  choices: ChoiceSchema[];
  diceRolls?: DiceRollSchema;
};

export type ChallengeRule = BaseRule & {
  type: RuleType.ChallengeRule;
};

export type GroupActionRule = BaseRule & {
  type: RuleType.GroupActionRule;
} & AtLeastOneOf<{
    diceRolls?: DiceRollSchema;
    itemIds?: string[];
  }>;

export type ProxyRule = BaseRule & {
  type: RuleType.ProxyRule;
  proxyRuleId: string;
};

/**
 * Executes a subsequent rule based on if the player has an item
 */
export type ItemBasedRule = BaseRule & {
  type: RuleType.ItemBasedRule;
  // itemId, hasItem, RuleSchema
  conditions: [string, boolean, RuleSchema][];
};
