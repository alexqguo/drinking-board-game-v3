import { Actions } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { ModifierOperation } from '../rules/rules.types.js';
import { OneOf } from '../types.js';

export interface GameStateHandler<THandlerArgs = void> {
  execute: (args: THandlerArgs) => void,
  gameState: GameState,
}

export type GameStateHandlerFactory<THandlerArgs = void> = (ctx: Context) => GameStateHandler<THandlerArgs>;

/////////////////////////////////////////////////////////////

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

export type AnimationHint = {
  playerId: string,
  newTileIndex: number,
}

export type Game = {
  metadata: GameMetadata,
  players: PlayerData,
  prompt: Prompt | null,
  availableActions: Actions
}

export type Prompt = {
  nextGameState: GameState,
  subsequentRuleIds?: string[];
} & OneOf<{
  ruleId: string;
  messageOverride: string;
}>

export interface GameMetadata {
  id: string,
  // type: GameType,
  board: string,
  state: GameState,
  currentPlayerId: string,
  turnOrder: TurnOrder,
}

// Map of player IDs to Player
export interface PlayerData {
  [key: string]: Player
}

export interface Player {
  id: string,
  name: string,
  order: number, // Should never change
  tileIndex: number,
  hasWon: boolean,
  effects: PlayerEffects,
  // Consider making this a list to maintain ordering
  visitedTiles: number[],
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
  itemIds: string[],
}

export interface SpeedModifier {
  operation: ModifierOperation,
  modifier: number,
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

export interface LostTurnInfo {
  message: string,
  numTurns: number,
}

export enum TurnOrder {
  normal = 1,
  reverse = -1,
}
