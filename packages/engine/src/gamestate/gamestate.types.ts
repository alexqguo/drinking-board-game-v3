import type { GameMetadata, GameState, MessageOverride, PlayerEffects } from '@repo/schemas';
import { Actions } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { OneOf } from '../types.js';

export { GameState };

export interface GameStateHandler<THandlerArgs = void> {
  execute: (args: THandlerArgs) => void;
  gameState: GameState;
}

export type GameStateHandlerFactory<THandlerArgs = void> = (
  ctx: Context,
) => GameStateHandler<THandlerArgs>;

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
