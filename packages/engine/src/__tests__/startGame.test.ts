import { describe, expect, it } from 'vitest';
import { ActionType } from '../actions/actions.types.js';
import { requestHandler } from '../requestHandler.js';
import { createdGameResponse } from './stubs.js';

describe('starting a game', () => {
  it('starts a game', () => {
    const result = requestHandler({
      action: ActionType.gameStart,
      prevGame: createdGameResponse.game,
      actionArgs: {},
    });

    // TODO. Consider just using snapshot tests. Need to mock uuid and dice rolling
    expect(result).toBeTruthy();
  });
});