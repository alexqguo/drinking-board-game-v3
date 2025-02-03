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

declare interface SessionData {
  game: GameData,
  players: Player[],
  alert: Alert,
  actions: AlertAction[],
}

declare interface GameData {
  id: string,
  type: GameType,
  board: string,
  state: GameState,
  currentPlayerId: string,
  currentRoll: number | null,
  turnOrder: TurnOrder,
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

declare enum ActionType {
  roll = 'roll',
  choice = 'choice',
  playerSelection = 'playerSelection',
  starterSelection = 'starterSelection',
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

declare enum GameState {
  NOT_STARTED = 'NOT_STARTED',
  GAME_START = 'GAME_START',
  STARTER_SELECT = 'STARTER_SELECT',
  TURN_CHECK = 'TURN_CHECK',
  ZONE_CHECK = 'ZONE_CHECK',
  TURN_START = 'TURN_START',
  TURN_MULTIROLL_CONDITION_CHECK = 'TURN_MULTIROLL_CONDITION_CHECK',
  ROLL_START = 'ROLL_START',
  ROLL_END = 'ROLL_END',
  MOVE_CALCULATE = 'MOVE_CALCULATE',
  MOVE_START = 'MOVE_START',
  MOVE_END = 'MOVE_END',
  RULE_TRIGGER = 'RULE_TRIGGER',
  RULE_END = 'RULE_END',
  TURN_END = 'TURN_END',
  GAME_OVER = 'GAME_OVER',
  TURN_SKIP = 'TURN_SKIP',
  LOST_TURN_START = 'LOST_TURN_START',
  BATTLE = 'BATTLE',
}

declare enum TurnOrder {
  normal = 1,
  reverse = -1,
}

declare interface PlayerData {
  [key: string]: Player
}

declare interface Player {
  id: string,
  name: string,
  tileIndex: number,
  hasWon: boolean,
  isActive?: boolean,
  effects: PlayerEffects,
  // Consider making this a list to maintain ordering
  visitedTiles: { [key: number]: boolean },
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

declare interface LostTurnInfo {
  message: string,
  numTurns: number,
}

declare interface MoveCondition {
  ruleId: string, // Condition of the rule with ruleId
  numCurrentSuccesses: number,
}

declare interface MoveConditionResult {
  canMove: boolean,
  message: string,
}

declare enum AppStage {
  dev = 'dev',
  prod = 'prod',
}

declare interface Point {
  x: number,
  y: number,
}

declare interface SpeedModifier {
  operation: ModifierOperation,
  modifier: number,
  numTurns: number,
}

declare type RuleHandler = {
  (rule: RuleSchema): void,

  /**
   * Rule handlers can optionally have a postActionHandler function, which takes a list of the existing
   * actions in order to calculate next step
   */
  postActionHandler?: (rule: RuleSchema, actions: AlertAction[]) => void
};

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

////////////////////////////////////////////////////////////////
// Shared between both schemas and engine code
////////////////////////////////////////////////////////////////
declare enum ModifierOperation {
  addition = '+',
  multiplication = '*',
  subtraction = '-',
  equal = '=',
}

declare enum PlayerTarget {
  custom = 'custom',
  self = 'self',
  allOthers = 'allOthers',
}

declare enum ZoneType {
  passive = 'passive',
  active = 'active'
}

declare enum Direction {
  forward = 'forward',
  back = 'back'
}

declare enum DiceRollType {
  cumulative = 'cumulative',
  default = 'default',
  allMatch = 'allMatch',
}