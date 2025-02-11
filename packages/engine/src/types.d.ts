// https://amir.rachum.com/typescript-oneof/
type AllowOnly<T, K extends keyof T> = Pick<T, K> & { [P in keyof Omit<T, K>]?: never }
type OneOf<T, K = keyof T> = K extends keyof T ? AllowOnly<T, K> : never

declare type Game = {
  metadata: GameMetadata,
  players: PlayerData,
  prompt: Prompt | null,
  availableActions: Actions
}

declare type Prompt = {
  nextGameState: GameState,
} & OneOf<{
  ruleId: string;
  messageOverride: string;
}>

declare interface Actions {
  [key: string]: {
    turnActions: TurnAction[],
    promptActions: PromptAction[]
  }
}

declare interface BaseAction {
  actionType: ActionType,
  actionResult?,
}

declare interface PromptAction extends BaseAction {}

declare interface TurnAction extends BaseAction {
  actionResult?: number;
}

declare interface GameMetadata {
  id: string,
  // type: GameType,
  board: string,
  state: GameState,
  currentPlayerId: string,
  turnOrder: TurnOrder,
}

// Map of player IDs to Player
declare interface PlayerData {
  [key: string]: Player
}

declare interface Player {
  id: string,
  name: string,
  order: number, // Should never change
  tileIndex: number,
  hasWon: boolean,
  effects: PlayerEffects,
  // Consider making this a list to maintain ordering
  visitedTiles: number[],
}

declare interface PlayerEffects {
  mandatorySkips: number,
  customMandatoryTileIndex: number,
  extraTurns: number,
  skippedTurns: LostTurnInfo,
  speedModifier: SpeedModifier,
  rollAugmentation: SpeedModifier,
  moveCondition: MoveCondition,
  starter: string
  anchors: number,
  items: { [key: string]: boolean }
}

declare interface SpeedModifier {
  operation: ModifierOperation,
  modifier: number,
  numTurns: number,
}

declare interface MoveCondition {
  ruleId: string, // Condition of the rule with ruleId
  numCurrentSuccesses: number,
}

declare interface LostTurnInfo {
  message: string,
  numTurns: number,
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Schema interfaces. Anything living in the board JSON files
////////////////////////////////////////////////////////////////
declare interface BoardModule {
  board: BoardSchema,
  gameExtensionInfo?: GameExtensionInfo,
}

declare enum MandatoryType {
  always = 'always',
  once = 'once',
}

declare interface BoardSchema {
  tiles: TileSchema[],
  zones: ZoneSchema[],
}

declare interface Point {
  x: number,
  y: number,
}

declare interface TileSchema {
  /**
   * @deprecated should use mandatoryType instead
   */
  mandatory?: boolean,
  mandatoryType?: MandatoryType,
  rule: RuleSchema,
  position: Point[],
  zone?: string,
}

declare interface RuleSchema {
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
  proxyRuleId?: string,
  starters?: string[],
  acquireItem?: string,
}

declare interface BaseOutcomeSchema {
  rule: RuleSchema
}

declare interface DiceRollSchema {
  outcomes?: OutcomeSchema[],
  numRequired: number,
  cumulative?: boolean,
  type: DiceRollType
}

declare interface ChoiceSchema extends BaseOutcomeSchema {}

declare interface OutcomeSchema extends BaseOutcomeSchema {
  criteria: number[],
  isAny?: boolean,
}

declare interface ZoneSchema {
  name: string,
  type: ZoneType,
  rule: RuleSchema,
}

declare interface MoveConditionSchema {
  criteria: number[],
  numSuccessesRequired: number,
  immediate?: boolean,
  consequence: RuleSchema,
  description: string,
  diceRolls?: DiceRollSchema,
}
///////////////////////////////////////////////////
///////////////////////////////////////////////////
// old stuff below?

declare enum GameType {
  local = 'local',
  remote = 'remote',
}

declare interface GameExtensionInfo {
  gameEvents: { [key: string]: Function },
  battleHandler?: Function,
}

declare interface CreateGameOptions {
  playerNames: string[],
  localPlayer: string,
  gameType: GameType,
  board: string,
}

declare interface RestoreGameOptions {
  localPlayerId: string,
  gameId: string,
  board: string,
}

declare interface Board {
  label: string,
  value: string,
}

declare interface Alert {
  open: boolean,
  ruleId: string,
  state: AlertState,
  nextGameState: GameState,
  messageOverride: string,
  headingOverride: string,
  outcomeIdentifier: string,
}

declare interface AlertAction {
  id: string,
  ruleId: string,
  playerId: string,
  type: ActionType,
  status: ActionStatus,
  value: any,
  candidateIds?: string[],
}


declare enum ActionStatus {
  ready = 'ready', // User can do the action now
  dependent = 'dependent', // This action is waiting for ones before it
}

declare enum AlertState {
  CLOSED = 'CLOSED',
  PENDING = 'PENDING',
  CAN_CLOSE = 'CAN_CLOSE',
  REQUIRE_ACTION = 'REQUIRE_ACTION',
}

declare interface AlertDiceRoll {
  numRolls: number,
  result: string // pipe separated string
}

declare interface MoveConditionResult {
  canMove: boolean,
  message: string,
}

declare enum AppStage {
  dev = 'dev',
  prod = 'prod',
}
