import { ActionType } from '@repo/enums';
import assert from 'assert';
import gen1 from '../../../../boards/pokemon-gen1';
import zelda from '../../../../boards/zelda';
import { boardRegistry } from '../../src';
import { Game } from '../../src/gamestate';
import { getNextGame } from '../../src/requestHandler';
import { Given, Then, When } from './coreUtils';

boardRegistry.register('pokemon-gen1', gen1);
boardRegistry.register('zelda', zelda);

// Game creation step definitions
Given('the game engine is initialized', function () {
  // Nothing to do here as the engine is stateless and initialized when needed
  this.game = {} as Game;
  this.playerNames = [] as string[];
  this.board = '';

  this.getCurrentPlayer = () => {
    return this.game.players[this.game.metadata.currentPlayerId];
  };

  this.getPlayerForName = (name: string) => {
    return Object.values(this.game.players).find((p) => p.name === name)!;
  };
});

When(
  'the game is created with players {string} and board {string}',
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

    // Rename player IDs for easier readability
    Object.values(response.game.players).forEach((p) => {
      const oldPid = p.id;
      p.id = `uuid-for-${p.name}`;
      response.game.players[p.id] = p;
      response.game.availableActions[p.id] = { turnActions: [], promptActions: [] };
      delete response.game.players[oldPid];
      delete response.game.availableActions[oldPid];
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
  const player = this.getPlayerForName(playerName);
  assert.ok(player, `Player ${playerName} not found`);
  assert.strictEqual(
    player.tileIndex,
    position,
    `Expected player to be at position ${position} but found ${player.tileIndex}`,
  );
});

When('the game is started', function () {
  const response = getNextGame({
    action: ActionType.gameStart,
    actionArgs: {},
    prevGame: this.game,
  });

  this.game = response.game;
});

Then('the current player should be {string}', function (playerName) {
  const pid = this.getPlayerForName(playerName).id;

  assert.strictEqual(
    this.game.metadata.currentPlayerId,
    pid,
    `Current player should be ${playerName}`,
  );
});

Then('{string} should have the item {string}', function (playerName, itemId) {
  assert.strictEqual(
    this.getPlayerForName(playerName).effects.itemIds.includes(itemId),
    true,
    `${playerName} should have itemId ${itemId}`,
  );
});

Then('the current player closes the prompt', function () {
  const response = getNextGame({
    action: ActionType.promptClose,
    actionArgs: {
      playerId: this.getCurrentPlayer().id,
    },
    prevGame: this.game,
  });
  this.game = response.game;
});
