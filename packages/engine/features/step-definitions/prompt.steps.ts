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

Then('the current player should have a {string} prompt action', function (actionType) {
  const actions = this.game.availableActions[this.getCurrentPlayer().id].promptActions;
  assert(
    actions.some((a) => a.type === actionType),
    `Current player should have a ${actionType} prompt action. Prompt actions: ${JSON.stringify(actions)}`,
  );
});
