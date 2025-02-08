// v3 stuff
export enum BoardName {
  PokemonGen1 = 'pokemon-gen1'
}

/**
 * The types of actions that can go into the engine
 */
export enum ActionType {
  gameCreate = 'GAME_CREATE',
  gameStart = 'GAME_START',
  turnRoll = 'TURN_ROLL',
  turnRollSkip = 'TURN_ROLL_SKIP',
  turnRollAugment = 'TURN_ROLL_AUGMENT',
  alertClose = 'ALERT_CLOSE',
  alertAction = 'ALERT_ACTION'
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