import { deprecate } from "util";

export enum GameType {
  local = 'local',
  remote = 'remote',
}

export interface GameExtensionInfo {
  gameEvents: { [key: string]: Function },
  battleHandler?: Function,
}

export interface CreateGameOptions {
  playerNames: string[],
  localPlayer: string,
  gameType: GameType,
  board: string,
}

export interface RestoreGameOptions {
  localPlayerId: string,
  gameId: string,
  board: string,
}

export interface Board {
  label: string,
  value: string,
}

export interface SessionData {
  game: GameData,
  players: Player[],
  alert: Alert,
  actions: AlertAction[],
}

export interface GameData {
  id: string,
  type: GameType,
  board: string,
  state: GameState,
  currentPlayerId: string,
  currentRoll: number | null,
  turnOrder: TurnOrder,
}

export interface Alert {
  open: boolean,
  ruleId: string,
  state: AlertState,
  nextGameState: GameState,
  messageOverride: string,
  headingOverride: string,
  outcomeIdentifier: string,
}

export interface AlertAction {
  id: string,
  ruleId: string,
  playerId: string,
  type: ActionType,
  status: ActionStatus,
  value: any,
  candidateIds?: string[],
}

export enum ActionType {
  roll = 'roll',
  choice = 'choice',
  playerSelection = 'playerSelection',
  starterSelection = 'starterSelection',
}

export enum ActionStatus {
  ready = 'ready', // User can do the action now
  dependent = 'dependent', // This action is waiting for ones before it
}

export enum AlertState {
  CLOSED = 'CLOSED',
  PENDING = 'PENDING',
  CAN_CLOSE = 'CAN_CLOSE',
  REQUIRE_ACTION = 'REQUIRE_ACTION',
}

export interface AlertDiceRoll {
  numRolls: number,
  result: string // pipe separated string
}

export enum GameState {
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

export enum TurnOrder {
  normal = 1,
  reverse = -1,
}

export interface PlayerData {
  [key: string]: Player
}

export interface Player {
  id: string,
  name: string,
  tileIndex: number,
  hasWon: boolean,
  isActive?: boolean,
  effects: PlayerEffects,
  // Consider making this a list to maintain ordering
  visitedTiles: { [key: number]: boolean },
}

export interface PlayerEffects {
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

export interface LostTurnInfo {
  message: string,
  numTurns: number,
}

export interface MoveCondition {
  ruleId: string, // Condition of the rule with ruleId
  numCurrentSuccesses: number,
}

export interface MoveConditionResult {
  canMove: boolean,
  message: string,
}

export enum AppStage {
  dev = 'dev',
  prod = 'prod',
}

export interface Point {
  x: number,
  y: number,
}

export interface SpeedModifier {
  operation: ModifierOperation,
  modifier: number,
  numTurns: number,
}

export type RuleHandler = {
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
export enum MandatoryType {
  always = 'always',
  once = 'once',
}

export interface BoardSchema {
  tiles: TileSchema[],
  zones: ZoneSchema[],
}

export interface TileSchema {
  /**
   * @deprecated should use mandatoryType instead
   */
  mandatory?: boolean,
  mandatoryType?: MandatoryType,
  rule: RuleSchema,
  position: Point[],
  zone?: string,
}

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
  proxyRuleId?: string,
  starters?: string[],
  acquireItem?: string,
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

////////////////////////////////////////////////////////////////
// Shared between both schemas and engine code
////////////////////////////////////////////////////////////////
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