import assert from 'assert';
import { Then } from './coreUtils';

Then('{string} should have the item {string}', function (playerName, itemId) {
  assert.strictEqual(
    this.getPlayerForName(playerName).effects.itemIds.includes(itemId),
    true,
    `${playerName} should have itemId ${itemId}`,
  );
});

Then('{string} should have {int} skippedTurns', function (playerName, numToHave) {
  const value = this.getPlayerForName(playerName).effects.skippedTurns;
  assert.strictEqual(
    value.numTurns,
    numToHave,
    `Expected ${playerName} to have ${numToHave} skippedTurns. Actual: ${value.numTurns}`,
  );
});

Then('{string} should have {int} mandatorySkips', function (playerName, numToHave) {
  const value = this.getPlayerForName(playerName).effects.mandatorySkips;
  assert.strictEqual(
    value,
    numToHave,
    `Expected ${playerName} to have ${numToHave} mandatorySkips. Actual: ${value}`,
  );
});

Then('{string} should have {int} extraTurns', function (playerName, numToHave) {
  const value = this.getPlayerForName(playerName).effects.extraTurns;
  assert.strictEqual(
    value,
    numToHave,
    `Expected ${playerName} to have ${numToHave} extraTurns. Actual: ${value}`,
  );
});

Then('{string} should have {int} anchors', function (playerName, numToHave) {
  const value = this.getPlayerForName(playerName).effects.anchors;
  assert.strictEqual(
    value,
    numToHave,
    `Expected ${playerName} to have ${numToHave} anchors. Actual: ${value}`,
  );
});

Then('{string} should have {int} immediateTurns', function (playerName, numToHave) {
  const value = this.getPlayerForName(playerName).effects.immediateTurns;
  assert.strictEqual(
    value,
    numToHave,
    `Expected ${playerName} to have ${numToHave} immediateTurns. Actual: ${value}`,
  );
});

Then('{string} should have {int} as a customMandatoryTileIndex', function (playerName, numToHave) {
  const value = this.getPlayerForName(playerName).effects.customMandatoryTileIndex;
  assert.strictEqual(
    value,
    numToHave,
    `Expected ${playerName} to have ${numToHave} customMandatoryTileIndex. Actual: ${value}`,
  );
});

Then(
  '{string} should have a speed modifier of {string} for {int} turns',
  function (playerName, expectedMod, expectedNumTurns) {
    const value = this.getPlayerForName(playerName).effects.speedModifier;
    assert.strictEqual(
      value.numTurns,
      expectedNumTurns,
      `Expected ${playerName} speed mod to be for ${expectedNumTurns} turns. Actual: ${value.numTurns}`,
    );
    assert.strictEqual(
      `${value.operation}${value.modifier}`,
      expectedMod,
      `Expected ${playerName} to have a mod of ${expectedMod}. Actual: ${value.operation}${value.modifier}`,
    );
  },
);

Then(
  '{string} should have a roll augmentation of {string} for {int} turns',
  function (playerName, expectedMod, expectedNumTurns) {
    const value = this.getPlayerForName(playerName).effects.rollAugmentation;
    assert.strictEqual(
      value.numTurns,
      expectedNumTurns,
      `Expected ${playerName} roll augmentation to be for ${expectedNumTurns} turns. Actual: ${value.numTurns}`,
    );
    assert.strictEqual(
      `${value.operation}${value.modifier}`,
      expectedMod,
      `Expected ${playerName} to have a roll augmentation of ${expectedMod}. Actual: ${value.operation}${value.modifier}`,
    );
  },
);

Then('{string} should have turnStartRule for {int} turns', function (playerName, expectedTurns) {
  const value = this.getPlayerForName(playerName).effects.turnStartRule;
  assert.strictEqual(
    value?.numTurns,
    expectedTurns,
    `Expected ${playerName} to have turnStartRule for ${expectedTurns} turns. Actual: ${value?.numTurns}`,
  );
});

Then('{string} should have no turnStartRule', function (playerName) {
  const value = this.getPlayerForName(playerName).effects.turnStartRule;
  const hasNoTurnStartRule = !value || value.numTurns < 0;
  assert.strictEqual(
    hasNoTurnStartRule,
    true,
    `Expected ${playerName} to have no turnStartRule. Actual: ${JSON.stringify(value)}`,
  );
});
