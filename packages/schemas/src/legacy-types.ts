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

export interface MoveConditionResult {
  canMove: boolean;
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
  diceRolls?: DiceRollSchema;
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
                    : // Either ['+', 'newItemId'] or ['=', ['arrayOfNewItemIds']]
                      // TODO - cannot gain multiple items at once
                      K extends 'itemIds'
                      ? [ModifierOperation.addition, string] | [ModifierOperation.equal, string[]]
                      : never;
  };
};

export type BaseRule = {
  id: string;
  type: RuleType;
  grants?: Grants;
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
