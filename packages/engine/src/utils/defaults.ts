import { GameState, TurnOrder, ModifierOperation } from '../enums.js';

export const defaultGame: Game = Object.freeze({
  metadata: {
    id: '',
    board: '',
    state: GameState.NotStarted,
    currentPlayerId: '',
    currentRoll: null, // this should go into currentroll
    turnOrder: TurnOrder.normal
  },
  players: {},
  prompt: null,
  availableActions: {},
});

export const defaultEffects: PlayerEffects = Object.freeze({
  starter: '',
  extraTurns: 0,
  mandatorySkips: 0,
  customMandatoryTileIndex: -1,
  skippedTurns: {
    numTurns: 0,
    message: '',
  },
  speedModifier: {
    numTurns: 0,
    operation: ModifierOperation.equal,
    modifier: -1
  },
  rollAugmentation: {
    numTurns: 0,
    operation: ModifierOperation.equal,
    modifier: -1
  },
  moveCondition: {
    ruleId: '',
    numCurrentSuccesses: 0
  },
  anchors: 0,
  items: {},
});

export const defaultPlayer: Player = Object.freeze({
  id: '',
  name: '',
  tileIndex: 0,
  hasWon: false,
  visitedTiles: [0],
  effects: defaultEffects,
  order: NaN,
});