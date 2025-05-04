// @ts-nocheck
import { Game } from '@repo/engine';

const testGameSeeds = [1];

export const getNextSeed = () => {
  const nextRoll = testGameSeeds.shift();
  if (typeof nextRoll === 'number') return [nextRoll];
  return [];
};

const testGame1: Game = {
  actionNumber: 5,
  metadata: {
    id: 'b089a918-3ec0-4bfe-beb7-72c9b3f9b73c',
    board: 'pokemon-gen1',
    state: 'RollStart',
    currentPlayerId: '1111-first-player-uuid-1111',
    turnOrder: 1,
  },
  players: {
    '1111-first-player-uuid-1111': {
      id: '1111-first-player-uuid-1111',
      name: 'P1',
      tileIndex: 24,
      hasWon: false,
      visitedTiles: [0],
      effects: {
        extraTurns: 0,
        immediateTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: { numTurns: 0, message: { stringId: '' } },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', descriptionStrId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_bulbasaur'],
      },
      order: 0,
      zoneId: null,
    },
    '2222-second-player-uuid-2222': {
      id: '2222-second-player-uuid-2222',
      name: 'P2',
      tileIndex: 20,
      hasWon: false,
      visitedTiles: [0],
      effects: {
        extraTurns: 0,
        immediateTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: { numTurns: 0, message: { stringId: '' } },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', descriptionStrId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_squirtle'],
      },
      order: 1,
      zoneId: null,
    },
    '3333-third-player-uuid-3333': {
      id: '3333-third-player-uuid-3333',
      name: 'P3',
      tileIndex: 30,
      hasWon: false,
      visitedTiles: [0],
      effects: {
        extraTurns: 0,
        immediateTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: { numTurns: 0, message: { stringId: '' } },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', descriptionStrId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_charmander'],
      },
      order: 1,
      zoneId: null,
    },
    '4444-fourth-player-uuid-4444': {
      id: '4444-fourth-player-uuid-4444',
      name: 'P4',
      tileIndex: 40,
      hasWon: false,
      visitedTiles: [0],
      effects: {
        extraTurns: 0,
        immediateTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: { numTurns: 0, message: { stringId: '' } },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', descriptionStrId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_charmander'],
      },
      order: 1,
      zoneId: null,
    },
  },
  prompt: null,
  availableActions: {
    '1111-first-player-uuid-1111': {
      turnActions: [
        {
          id: '1dbf2913-0429-453e-8bc0-e351f6d12d80',
          playerId: '1111-first-player-uuid-1111',
          type: 'turnRoll',
        },
        {
          id: '97a8cf2c-8d1f-4b6c-9687-9831541d75da',
          playerId: '1111-first-player-uuid-1111',
          type: 'turnRollSkip',
        },
      ],
      promptActions: [],
    },
    '2222-second-player-uuid-2222': { turnActions: [], promptActions: [] },
  },
};

export const testGame = testGame1;
