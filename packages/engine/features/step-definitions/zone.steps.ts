import assert from 'assert';
import { Then } from './coreUtils';

Then(
  /^"([^"]*)" should be in zoneId "([^"]*)"$/,
  function (playerName: string, expectedZoneName: string) {
    const player = this.getPlayerForName(playerName);
    const playerDisplayName = `Player ${playerName}`;

    assert.strictEqual(
      player.zoneId,
      expectedZoneName,
      `${playerDisplayName} expected to be in zone ${expectedZoneName}. Actual: ${player.zoneId}`,
    );
  },
);

Then('{string} should not be in a zone', function (playerName) {
  const player = this.getPlayerForName(playerName);
  assert(player.zoneId === null, `${playerName} should not be in a zone. Actual: ${player.zoneId}`);
});
