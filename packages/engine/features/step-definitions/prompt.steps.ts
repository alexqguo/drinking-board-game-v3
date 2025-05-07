import { ActionType } from '@repo/enums';
import assert from 'assert';
import { getNextGame } from '../../src/requestHandler';
import { Then, When } from './coreUtils';

When('the current player chooses player {string}', function (playerName) {
  const actionId = this.game.availableActions[this.getCurrentPlayer().id].promptActions.find(
    (a) => a.type === ActionType.promptSelectPlayer && !a.result,
  )!.id;

  this.game = getNextGame({
    action: ActionType.promptSelectPlayer,
    actionArgs: {
      actionId,
      result: this.getPlayerForName(playerName).id,
    },
    prevGame: this.game,
  }).game;
});

Then('the current player closes the prompt', function () {
  this.game = getNextGame({
    action: ActionType.promptClose,
    actionArgs: {
      playerId: this.getCurrentPlayer().id,
    },
    prevGame: this.game,
  }).game;
});

Then('the prompt should reference ruleId {string}', function (ruleId) {
  assert.strictEqual(this.game.prompt?.ruleId, ruleId, `Prompt should be for ruleId ${ruleId}`);
});

Then('the prompt should reference follow up ruleId {string}', function (ruleId) {
  assert.ok(
    this.game.prompt?.subsequentRuleIds?.includes(ruleId),
    `Prompt subsequent rule IDs should include ${ruleId}: ${this.game.prompt?.subsequentRuleIds}`,
  );
});

Then('the current player should have a {string} prompt action', function (actionType) {
  const actions = this.game.availableActions[this.getCurrentPlayer().id].promptActions;
  assert(
    actions.some((a) => a.type === actionType),
    `Current player should have a ${actionType} prompt action. Prompt actions: ${JSON.stringify(actions)}`,
  );
});

Then('the custom options should include {string}', function (expectedOptionsStr) {
  const expectedOptions = expectedOptionsStr.split(',');
  const options = this.game.availableActions[this.getCurrentPlayer().id].promptActions.find(
    (a) => a.type === ActionType.promptSelectCustom && !a.result,
  )?.candidateIds;

  expectedOptions.forEach((o) => {
    assert.ok(
      options?.includes(o),
      `Expected candidateIds to include ${o}. Candidate IDs: ${options}`,
    );
  });
});

When('the current player selects custom option {string}', function (desiredOption) {
  const actionId = this.game.availableActions[this.getCurrentPlayer().id].promptActions.find(
    (a) => a.type === ActionType.promptSelectCustom && !a.result,
  )!.id;

  this.game = getNextGame({
    action: ActionType.promptSelectCustom,
    actionArgs: {
      actionId,
      result: desiredOption,
    },
    prevGame: this.game,
  }).game;
});
