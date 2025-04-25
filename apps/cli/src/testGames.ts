// @ts-nocheck
import { Game } from '@repo/engine';

const testGameSeeds = [];

export const getNextSeed = () => {
  const nextRoll = testGameSeeds.shift();
  if (typeof nextRoll === 'number') return [nextRoll];
  return [];
};

const testGame1: Game = {
  metadata: {
    id: 'ecc6501f-9ee7-4382-9e9e-6cf7b1f384db',
    board: 'pokemon-gen1',
    state: 'RollStart',
    currentPlayerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
    turnOrder: 1,
  },
  players: {
    '0be6b5a8-2a20-44df-8df4-72fb39f77d5a': {
      id: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
      name: 'P1',
      tileIndex: 7,
      hasWon: false,
      visitedTiles: [0],
      effects: {
        extraTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: { numTurns: 0, message: '' },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_bulbasaur'],
      },
      order: 0,
    },
    'b03a2562-e067-403d-a36a-4e4669cc30c6': {
      id: 'b03a2562-e067-403d-a36a-4e4669cc30c6',
      name: 'P2',
      tileIndex: 0,
      hasWon: false,
      visitedTiles: [0],
      effects: {
        extraTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: { numTurns: 0, message: '' },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_squirtle'],
      },
      order: 1,
    },
  },
  prompt: null,
  availableActions: {
    '0be6b5a8-2a20-44df-8df4-72fb39f77d5a': {
      turnActions: [
        {
          id: '682c613c-fc48-431e-80bc-0aa5d0da283d',
          playerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
          type: 'turnRoll',
        },
        {
          id: '0bbc89d6-e50e-4927-ab48-3bd7825005db',
          playerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
          type: 'turnRollSkip',
        },
      ],
      promptActions: [],
    },
    'b03a2562-e067-403d-a36a-4e4669cc30c6': { turnActions: [], promptActions: [] },
  },
};

const testGame2: Game = {
  metadata: {
    id: 'ecc6501f-9ee7-4382-9e9e-6cf7b1f384db',
    board: 'pokemon-gen1',
    state: 'RuleTrigger',
    currentPlayerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
    turnOrder: 1,
  },
  players: {
    '0be6b5a8-2a20-44df-8df4-72fb39f77d5a': {
      id: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
      name: 'P1',
      tileIndex: 57,
      hasWon: false,
      visitedTiles: [0, 8, 11, 28, 30, 32, 35, 40, 43, 44, 49, 52, 54, 56, 57],
      effects: {
        extraTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: {
          numTurns: 0,
          message: 'todo- i18n general lost turns message',
        },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_bulbasaur'],
      },
      order: 0,
    },
    'b03a2562-e067-403d-a36a-4e4669cc30c6': {
      id: 'b03a2562-e067-403d-a36a-4e4669cc30c6',
      name: 'P2',
      tileIndex: 32,
      hasWon: false,
      visitedTiles: [0, 4, 5, 9, 11, 28, 30, 32],
      effects: {
        extraTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: {
          numTurns: 0,
          message: 'todo- i18n general lost turns message',
        },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_pikachu'],
      },
      order: 1,
    },
  },
  prompt: { ruleId: 'rule_57', nextGameState: 'RuleEnd' },
  availableActions: {
    '0be6b5a8-2a20-44df-8df4-72fb39f77d5a': {
      turnActions: [],
      promptActions: [
        {
          id: '53de2ddd-fdcc-473d-867a-1c8367690344',
          initiator: 'rule_57',
          playerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
          type: 'promptRoll',
        },
        {
          id: '0e54d986-dec6-43a5-a5a9-aa696ff145e6',
          initiator: 'rule_57',
          playerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
          type: 'promptRoll',
        },
        {
          id: '6d8da69f-ba2e-4df6-b8fd-05e06c3cfc91',
          initiator: 'rule_57',
          playerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
          type: 'promptRoll',
        },
      ],
    },
    'b03a2562-e067-403d-a36a-4e4669cc30c6': { turnActions: [], promptActions: [] },
  },
};

const testGame3: Game = {
  metadata: {
    id: 'd6b8be82-a179-45d5-a552-98da271ae2d6',
    board: 'pokemon-gen1',
    state: 'RollStart',
    currentPlayerId: '51cddf28-1cbe-45da-aaa5-357cadea8950',
    turnOrder: 1,
  },
  players: {
    '51cddf28-1cbe-45da-aaa5-357cadea8950': {
      id: '51cddf28-1cbe-45da-aaa5-357cadea8950',
      name: 'P1',
      tileIndex: 35,
      hasWon: false,
      visitedTiles: [0, 3, 6, 7, 10, 13, 18, 20, 32, 35],
      effects: {
        extraTurns: 0,
        immediateTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: {
          numTurns: 0,
          message: 'todo- i18n general lost turns message',
        },
        speedModifier: { numTurns: 0, operation: '*', modifier: 2 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_bulbasaur'],
      },
      order: 0,
      zoneId: null,
    },
    'b8a8e865-3310-4d44-bdf4-2dc2ebc9ac24': {
      id: 'b8a8e865-3310-4d44-bdf4-2dc2ebc9ac24',
      name: 'P2',
      tileIndex: 36,
      hasWon: false,
      visitedTiles: [0, 1, 4, 6, 11, 28, 32, 36],
      effects: {
        extraTurns: 0,
        immediateTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: { numTurns: 0, message: '' },
        speedModifier: { numTurns: 0, operation: '*', modifier: 0.5 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: ['starter_pikachu'],
      },
      order: 1,
      zoneId: 'silph_co',
    },
  },
  prompt: null,
  availableActions: {
    '51cddf28-1cbe-45da-aaa5-357cadea8950': {
      turnActions: [
        {
          id: '2c25bfe7-2180-42d5-a323-ed519bb7de63',
          playerId: '51cddf28-1cbe-45da-aaa5-357cadea8950',
          type: 'turnRoll',
        },
        {
          id: '0b534df6-426f-4cc4-bd8f-a94e86455a7d',
          playerId: '51cddf28-1cbe-45da-aaa5-357cadea8950',
          type: 'turnRollSkip',
        },
      ],
      promptActions: [],
    },
    'b8a8e865-3310-4d44-bdf4-2dc2ebc9ac24': { turnActions: [], promptActions: [] },
  },
};

export const testGame = testGame3;
