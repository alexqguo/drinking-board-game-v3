import { ActionType, BoardName } from '@repo/enums';
import { GameState } from '@repo/schemas';
import { validate } from 'uuid';
import { describe, expect, it } from 'vitest';
import { getNextGame } from '../requestHandler.js';

describe('creating a game', () => {
  it('creates a game', () => {
    const { game, animationHints } = getNextGame({
      action: ActionType.gameCreate,
      actionArgs: {
        playerNames: ['Player 1', 'Player 2'],
        board: BoardName.PokemonGen1,
      },
      prevGame: null,
    });
    const { metadata, players, prompt, availableActions } = game;
    const resultPlayerIds = Object.keys(players);

    // Animation hints
    expect(animationHints).toEqual([]);

    // Game metadata
    expect(validate(metadata.id)).toBe(true);
    expect(metadata.state).toEqual(GameState.NotStarted);
    expect(metadata.board).toEqual(BoardName.PokemonGen1);
    expect(metadata.currentPlayerId).toEqual('');
    expect(metadata.turnOrder).toEqual(1);

    // Player
    expect(resultPlayerIds.length).toEqual(2);

    // Prompt
    expect(prompt).toBe(null);

    // Actions
    expect(Object.keys(availableActions).length).toEqual(resultPlayerIds.length);
    resultPlayerIds.forEach((pid) => {
      expect(availableActions[pid]).toEqual({
        promptActions: [],
        turnActions: [],
      });
    });
  });
});
