import type { GameState } from '@repo/schemas';
import { Actions } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { ModifierOperation } from '../rules/rules.types.js';
import { OneOf } from '../types.js';

export { GameState };

export interface GameStateHandler<THandlerArgs = void> {
  execute: (args: THandlerArgs) => void;
  gameState: GameState;
}

export type GameStateHandlerFactory<THandlerArgs = void> = (
  ctx: Context,
) => GameStateHandler<THandlerArgs>;

/////////////////////////////////////////////////////////////

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
// export enum GameState {
//   NotStarted = 'NotStarted',
//   GameStart = 'GameStart',
//   StarterSelect = 'StarterSelect',
//   TurnCheck = 'TurnCheck',
//   ZoneCheck = 'ZoneCheck',
//   TurnStart = 'TurnStart',
//   TurnMultirollConditionCheck = 'TurnMultirollConditionCheck',
//   RollStart = 'RollStart',
//   RollEnd = 'RollEnd',
//   MoveCalculate = 'MoveCalculate',
//   MoveStart = 'MoveStart',
//   MoveEnd = 'MoveEnd',
//   RuleTrigger = 'RuleTrigger',
//   RuleEnd = 'RuleEnd',
//   TurnEnd = 'TurnEnd',
//   GameOver = 'GameOver',
//   TurnSkip = 'TurnSkip',
//   LostTurnStart = 'LostTurnStart',
//   Battle = 'Battle',
// }

export interface AnimationHint {
  type: 'playerMove' | 'unsupported';
  payload: unknown;
}

export interface PlayerMoveAnimationHint extends AnimationHint {
  type: 'playerMove';
  payload: {
    playerId: string;
    fromTileIndex: number;
    toTileIndex: number;
  };
}

export type Game = {
  actionNumber: number;
  metadata: GameMetadata;
  players: PlayerData;
  prompt: Prompt | null;
  availableActions: Actions;
};

export type Prompt = {
  nextGameState: GameState;
  subsequentRuleIds?: string[];
} & OneOf<{
  ruleId: string;
  messageOverride: MessageOverride;
}>;

export interface GameMetadata {
  id: string;
  // type: GameType,
  board: string;
  state: GameState;
  currentPlayerId: string;
  turnOrder: TurnOrder;
}

// Map of player IDs to Player
export interface PlayerData {
  [key: string]: Player;
}

export interface Player {
  id: string;
  name: string;
  order: number; // Should never change
  tileIndex: number;
  zoneId: string | null;
  hasWon: boolean;
  effects: PlayerEffects;
  // Consider making this a list to maintain ordering
  visitedTiles: number[];
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

export interface SpeedModifier {
  operation: ModifierOperation;
  modifier: number;
  numTurns: number;
}

export interface MoveCondition {
  ruleId: string; // Condition of the rule with ruleId
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

export enum TurnOrder {
  normal = 1,
  reverse = -1,
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
