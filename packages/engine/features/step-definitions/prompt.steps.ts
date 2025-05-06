import { ActionType } from '@repo/enums';
import assert from 'assert';
import { getNextGame } from '../../src/requestHandler';
import { Then } from './coreUtils';

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

Then('the prompt should reference ruleId {string}', function (ruleId) {
  assert.strictEqual(this.game.prompt?.ruleId, ruleId, `Prompt should be for ruleId ${ruleId}`);
});

Then('the current player should be able to close the prompt', function () {
  assert.strictEqual(
    this.game.availableActions[this.getCurrentPlayer().id].promptActions.some(
      (a) => a.type === ActionType.promptClose,
    ),
    true,
    'Current player should be able to close the prompt',
  );
});
