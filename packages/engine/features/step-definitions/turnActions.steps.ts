import { ActionType } from '@repo/enums';
import assert from 'assert';
import { getNextGame } from '../../src/requestHandler';
import { Then, When } from './coreUtils';

Then('the current player should be able to roll and skip', function () {
  const currentPlayer = this.getCurrentPlayer();
  const currentPlayerActions = this.game.availableActions[currentPlayer.id];
  const { turnActions, promptActions } = currentPlayerActions;

  assert.strictEqual(promptActions.length, 0, 'Expected promptActions to be empty');
  assert.strictEqual(turnActions.length, 2, 'Should be two turn actions- roll and skip');
  assert.strictEqual(turnActions[0].type, ActionType.turnRoll, 'Should have a turn roll action');
  assert.strictEqual(
    turnActions[1].type,
    ActionType.turnRollSkip,
    'Should have a turn skip action',
  );
});

Then('other players should have no turn actions', function () {
  Object.keys(this.game.players).forEach((pid) => {
    if (pid === this.getCurrentPlayer().id) return;
    assert.strictEqual(
      this.game.availableActions[pid].turnActions.length,
      0,
      'Other player should have no turn actions',
    );
  });
});

When('the current player skips their turn', function () {
  const skipActionId = this.game.availableActions[this.getCurrentPlayer().id].turnActions.find(
    (a) => a.type === ActionType.turnRollSkip,
  )?.id;

  const response = getNextGame({
    prevGame: this.game,
    action: ActionType.turnRollSkip,
    actionArgs: {
      actionId: skipActionId!,
    },
  });

  this.game = response.game;
});

When('the current player rolls a {int} for their turn', function (expectedRoll) {
  const rollActionId = this.game.availableActions[this.getCurrentPlayer().id].turnActions.find(
    (a) => a.type === ActionType.turnRoll,
  )?.id;

  this.game = getNextGame({
    prevGame: this.game,
    action: ActionType.turnRoll,
    actionArgs: {
      actionId: rollActionId!,
    },
    seeds: [expectedRoll],
  }).game;
});

When('the current player prompt rolls a {int}', function (expectedRoll) {
  const rollActionId = this.game.availableActions[this.getCurrentPlayer().id].promptActions.find(
    (a) => a.type === ActionType.promptRoll && !a.result,
  )?.id;

  this.game = getNextGame({
    prevGame: this.game,
    action: ActionType.promptRoll,
    actionArgs: {
      result: undefined,
      actionId: rollActionId!,
    },
    seeds: [expectedRoll],
  }).game;
});

Then('the current player should be on tile {int}', function (expectedTileIdx) {
  assert.strictEqual(
    this.getCurrentPlayer().tileIndex,
    expectedTileIdx,
    `Expected tile index is ${expectedTileIdx}`,
  );
});
