// @ts-nocheck
import { Game } from '@repo/engine';

export const testGame: Game = {
  metadata: {
    id: 'ecc6501f-9ee7-4382-9e9e-6cf7b1f384db',
    board: 'pokemon-gen1',
    state: 'RollStart',
    currentPlayerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
    turnOrder: 1
  },
  players: {
    '0be6b5a8-2a20-44df-8df4-72fb39f77d5a': {
      id: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
      name: 'P1',
      tileIndex: 8,
      hasWon: false,
      visitedTiles: [ 0 ],
      effects: {
        extraTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: { numTurns: 0, message: '' },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: [ 'starter_bulbasaur' ]
      },
      order: 0
    },
    'b03a2562-e067-403d-a36a-4e4669cc30c6': {
      id: 'b03a2562-e067-403d-a36a-4e4669cc30c6',
      name: 'P2',
      tileIndex: 0,
      hasWon: false,
      visitedTiles: [ 0 ],
      effects: {
        extraTurns: 0,
        mandatorySkips: 0,
        customMandatoryTileIndex: -1,
        skippedTurns: { numTurns: 0, message: '' },
        speedModifier: { numTurns: 0, operation: '=', modifier: -1 },
        rollAugmentation: { numTurns: 0, operation: '=', modifier: -1 },
        moveCondition: { ruleId: '', numCurrentSuccesses: 0 },
        anchors: 0,
        itemIds: [ 'starter_squirtle' ]
      },
      order: 1
    }
  },
  prompt: null,
  availableActions: {
    '0be6b5a8-2a20-44df-8df4-72fb39f77d5a': {
      turnActions: [
        {
          id: '682c613c-fc48-431e-80bc-0aa5d0da283d',
          playerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
          type: 'turnRoll'
        },
        {
          id: '0bbc89d6-e50e-4927-ab48-3bd7825005db',
          playerId: '0be6b5a8-2a20-44df-8df4-72fb39f77d5a',
          type: 'turnRollSkip'
        }
      ],
      promptActions: []
    },
    'b03a2562-e067-403d-a36a-4e4669cc30c6': { turnActions: [], promptActions: [] }
  }
};