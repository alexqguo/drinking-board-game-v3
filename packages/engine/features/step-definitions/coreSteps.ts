import { ActionType } from '@repo/enums';
import assert from 'assert';
import gen1 from '../../../../boards/pokemon-gen1';
import { boardRegistry } from '../../src/';
import { Game } from '../../src/gamestate';
import { getNextGame } from '../../src/requestHandler';
import { Given, Then, When } from './coreUtils';

boardRegistry.register('pokemon-gen1', gen1);

// Game creation step definitions
Given('the game engine is initialized', function () {
  // Nothing to do here as the engine is stateless and initialized when needed
  this.game = {} as Game;
  this.playerNames = [] as string[];
  this.board = '';
});

When(
  'I create a game with players {string} and board {string}',
  function (playerNamesStr, boardName) {
    const playerNames = playerNamesStr.split(',');
    this.playerNames = playerNames;
    this.board = boardName;

    // Create game using the engine's requestHandler
    const response = getNextGame({
      action: ActionType.gameCreate,
      actionArgs: {
        playerNames,
        board: boardName,
      },
      prevGame: null,
    });

    this.game = response.game;
  },
);

Then('the game state should be {string}', function (expectedState) {
  const actualState = this.game.metadata.state;
  assert.strictEqual(
    actualState,
    expectedState,
    `Expected game state to be ${expectedState} but found ${actualState}`,
  );
});

Then('the player {string} should be in position {int}', function (playerName, position) {
  const player = Object.values(this.game!.players).find((p) => p.name === playerName);
  assert.ok(player, `Player ${playerName} not found`);
  assert.strictEqual(
    player.tileIndex,
    position,
    `Expected player to be at position ${position} but found ${player.tileIndex}`,
  );
});
