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
  promptClose = 'PROMPT_CLOSE',
  promptAction = 'PROMPT_ACTION'
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