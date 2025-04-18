import { ActionType } from '@repo/enums';
import { describe, expect, it } from 'vitest';
import { getNextGame } from '../requestHandler.js';
import { createdGameResponse } from './stubs.js';

describe('starting a game', () => {
  it('starts a game', () => {
    const result = getNextGame({
      action: ActionType.gameStart,
      prevGame: createdGameResponse.game,
      actionArgs: {},
    });

    // TODO. Consider just using snapshot tests. Need to mock uuid and dice rolling
    expect(result).toBeTruthy();
  });
});