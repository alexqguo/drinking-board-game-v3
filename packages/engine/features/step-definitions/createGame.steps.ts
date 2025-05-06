import assert from 'assert';
import { Then } from './coreUtils.js';

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
