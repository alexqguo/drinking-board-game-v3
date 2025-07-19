import assert from 'assert';
import { Then, When } from './coreUtils';

When('I remember the game state', function () {
  this.gameSavedForComparison = structuredClone(this.game);
});

Then('the game state player data should be unchanged', function () {
  assert.deepEqual(
    this.gameSavedForComparison?.players,
    this.game.players,
    'Game players should be the same',
  );
});

Then('{string} game state data should be unchanged', function (playerNames) {
  const players = playerNames.split(',');
  players.forEach((playerName) => {
    const player = this.getPlayerForName(playerName);

    assert.deepEqual(
      this.gameSavedForComparison!.players[player.id],
      player,
      `${player.name}'s data should be the same`,
    );
  });
});

Then(
  '{string} game state data should be unchanged except for location and visited tiles',
  function (playerName) {
    const player = this.getPlayerForName(playerName);
    const savedPlayer = this.gameSavedForComparison!.players[player.id];

    // Create shallow copies without the excluded fields
    const { tileIndex: currentPosition, visitedTiles: currentVisited, ...currentRest } = player;
    const { tileIndex: savedPosition, visitedTiles: savedVisited, ...savedRest } = savedPlayer;

    // Compare everything except the excluded fields
    assert.deepEqual(
      currentRest,
      savedRest,
      `${player.name}'s data changed in fields other than position and visitedTiles`,
    );
  },
);

Then(
  '{string} should have {int} extra turns with no other effect changes',
  function (playerName, expectedNumExtraTurns) {
    const player = this.getPlayerForName(playerName);
    const savedPlayer = this.gameSavedForComparison!.players[player.id];

    // Compare all fields except for extraTurns
    const { extraTurns: currentExtraTurns, ...currentRest } = player.effects;
    const { extraTurns: savedExtraTurns, ...savedRest } = savedPlayer.effects;

    assert.deepEqual(
      currentRest,
      savedRest,
      `${player.name}'s data changed in fields other than extraTurns`,
    );

    assert.strictEqual(
      currentExtraTurns - savedExtraTurns,
      expectedNumExtraTurns,
      `${player.name} should have ${expectedNumExtraTurns} extra turn(s) more than before`,
    );
  },
);

Then(
  '{string} should have {int} missed turns with no other effect changes',
  function (playerName, expectedNumMissedTurns) {
    const player = this.getPlayerForName(playerName);
    const savedPlayer = this.gameSavedForComparison!.players[player.id];

    // Compare all fields except for missedTurns
    const { skippedTurns: currentSkippedTurns, ...currentRest } = player.effects;
    const { skippedTurns: savedSkippedTurns, ...savedRest } = savedPlayer.effects;

    assert.deepEqual(
      currentRest,
      savedRest,
      `${player.name}'s data changed in fields other than missedTurns`,
    );

    assert.strictEqual(
      currentSkippedTurns.numTurns - savedSkippedTurns.numTurns,
      expectedNumMissedTurns,
      `${player.name} should have ${expectedNumMissedTurns} missed turn(s) more than before`,
    );
  },
);

Then(
  '{string} should have a move condition for ruleId {string} with no other effect changes',
  function (playerName, ruleId) {
    if (!this.gameSavedForComparison)
      throw new Error('No saved game for comparison. Did you forget to remember game state?');

    const player = this.getPlayerForName(playerName);
    const savedPlayer = this.gameSavedForComparison!.players[player.id];

    // Compare all fields except for missedTurns
    const { moveCondition: currentMoveCondition, ...currentRest } = player.effects;
    const { moveCondition: savedMoveCondition, ...savedRest } = savedPlayer.effects;

    assert.deepEqual(
      currentRest,
      savedRest,
      `${player.name}'s data changed in fields other than move condition`,
    );

    assert(
      currentMoveCondition.ruleId === ruleId,
      `Move condition should exist for ${ruleId}. Actual: ${currentMoveCondition.ruleId}`,
    );
  },
);

Then(
  '{string} should have {int} success(es) for move condition {string}',
  function (playerName: string, expectedSuccesses: number, ruleId: string) {
    const player = this.getPlayerForName(playerName);

    assert(
      player.effects.moveCondition.ruleId === ruleId,
      `Player should have move condition for ${ruleId}, but has ${player.effects.moveCondition.ruleId}`,
    );

    assert(
      player.effects.moveCondition.numCurrentSuccesses === expectedSuccesses,
      `Player should have ${expectedSuccesses} successes, but has ${player.effects.moveCondition.numCurrentSuccesses}`,
    );
  },
);
