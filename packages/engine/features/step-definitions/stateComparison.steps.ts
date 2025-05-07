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
