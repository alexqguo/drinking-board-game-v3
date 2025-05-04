import { ActionType } from '@repo/enums';
import { GameState } from '@repo/schemas';
import assert from 'assert';
import { getNextGame } from '../../src/requestHandler.js';
import { Then, When } from './coreUtils.js';

When('I start the game', function () {
  // Start the created game
  const response = getNextGame({
    action: ActionType.gameStart,
    actionArgs: {},
    prevGame: this.game,
  });

  this.game = response.game;
});

Then('the game should have {int} players', function (count) {
  const playerCount = Object.keys(this.game.players).length;
  assert.strictEqual(playerCount, count, `Expected ${count} players but found ${playerCount}`);
});

Then('each player should have empty available actions', function () {
  const playerIds = Object.keys(this.game.players);
  for (const playerId of playerIds) {
    const availableActions = this.game.availableActions[playerId];
    assert.ok(availableActions, `Available actions not found for player ${playerId}`);
    assert.strictEqual(availableActions.turnActions.length, 0, 'Expected turn actions to be empty');
    assert.strictEqual(
      availableActions.promptActions.length,
      0,
      'Expected prompt actions to be empty',
    );
  }
});

Then('the first player should be set as current player', function () {
  const playerIds = Object.values(this.game.players)
    .sort((a, b) => a.order - b.order)
    .map((p) => p.id);

  const currentPlayerId = this.game.metadata.currentPlayerId;
  assert.strictEqual(
    currentPlayerId,
    playerIds[0],
    'Expected first player to be the current player',
  );
});

Then('the game prompt should exist for starter selection', function () {
  assert.ok(this.game.prompt, 'Expected game prompt to exist');
  // In pokemon-gen1, the first tile usually contains the starter selection rule
  // We check that we have a prompt with GameStart as next state
  assert.strictEqual(
    this.game.prompt.nextGameState,
    GameState.TurnCheck,
    'Expected prompt to lead to TurnCheck',
  );
});
