import { Game, GameState, Player, PlayerEffects, TurnOrder } from '../gamestate/gamestate.types.js';
import { ModifierOperation } from '../rules/rules.types.js';

export const defaultGame: Game = Object.freeze({
  metadata: {
    id: '',
    board: '',
    state: GameState.NotStarted,
    currentPlayerId: '',
    turnOrder: TurnOrder.normal,
  },
  players: {},
  prompt: null,
  availableActions: {},
});

export const defaultEffects: PlayerEffects = Object.freeze({
  extraTurns: 0,
  immediateTurns: 0,
  mandatorySkips: 0,
  customMandatoryTileIndex: -1,
  skippedTurns: {
    numTurns: 0,
    message: { stringId: '' },
  },
  speedModifier: {
    numTurns: 0,
    operation: ModifierOperation.equal,
    modifier: -1,
  },
  rollAugmentation: {
    numTurns: 0,
    operation: ModifierOperation.equal,
    modifier: -1,
  },
  moveCondition: {
    ruleId: '',
    numCurrentSuccesses: 0,
  },
  anchors: 0,
  itemIds: [],
});

export const defaultPlayer: Player = Object.freeze({
  id: '',
  name: '',
  tileIndex: 0,
  hasWon: false,
  visitedTiles: [0],
  effects: defaultEffects,
  order: NaN,
  zoneId: null,
});
