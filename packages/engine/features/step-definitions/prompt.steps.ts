import { ActionType } from '@repo/enums';
import assert from 'assert';
import { getNextGame } from '../../src/requestHandler';
import { Then, When } from './coreUtils';

When(
  /^(the current player|"[^"]*") chooses player "([^"]*)"$/,
  function (playerString, targetPlayerName) {
    let choosingPlayer;
    if (playerString === 'the current player') {
      choosingPlayer = this.getCurrentPlayer();
    } else {
      const playerName = playerString.slice(1, -1); // Remove quotes
      choosingPlayer = this.getPlayerForName(playerName);
    }

    const actionId = this.game.availableActions[choosingPlayer.id].promptActions.find(
      (a) => a.type === ActionType.promptSelectPlayer && !a.result,
    )!.id;

    this.game = getNextGame({
      action: ActionType.promptSelectPlayer,
      actionArgs: {
        actionId,
        result: this.getPlayerForName(targetPlayerName).id,
      },
      prevGame: this.game,
    }).game;
  },
);

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

Then(
  /^(the current player|"[^"]*") should have a "([^"]*)" prompt action$/,
  function (playerString, actionType) {
    let player;

    if (playerString === 'the current player') {
      player = this.getCurrentPlayer();
    } else {
      // playerString will be like "\"P1\"", so we remove the quotes
      const playerName = playerString.slice(1, -1);
      player = this.getPlayerForName(playerName);
    }

    const actions = this.game.availableActions[player.id].promptActions;
    assert(
      actions.some((a) => a.type === actionType),
      `${player.name} should have a ${actionType} prompt action. Prompt actions: ${JSON.stringify(actions)}`,
    );
  },
);

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

// todo- combine with the one above?
Then('the player options should include {string}', function (expectedOptionsStr) {
  const expectedOptions = expectedOptionsStr.split(',');
  const playerIdOptions = this.game.availableActions[this.getCurrentPlayer().id].promptActions.find(
    (a) =>
      [ActionType.promptGrantSelectPlayer, ActionType.promptSelectPlayer].includes(a.type) &&
      !a.result,
  )?.candidateIds;
  const playerNameOptions = playerIdOptions?.map((pid) => this.game.players[pid].name);

  expectedOptions.forEach((o) => {
    assert.ok(
      playerNameOptions?.includes(o),
      `Expected candidateIds to include ${o}. Players in prompt: ${playerIdOptions}`,
    );
  });
});

When(
  /^(the current player|"[^"]*") selects custom option "([^"]*)"$/,
  function (playerString, desiredOption) {
    let player;
    if (playerString === 'the current player') {
      player = this.getCurrentPlayer();
    } else {
      const playerName = playerString.slice(1, -1); // Remove quotes
      player = this.getPlayerForName(playerName);
    }

    const actionId = this.game.availableActions[player.id].promptActions.find(
      (a) =>
        [
          ActionType.promptSelectCustom,
          ActionType.promptSelectPlayer,
          ActionType.promptGrantSelectPlayer,
        ].includes(a.type) && !a.result,
    )!.id;

    this.game = getNextGame({
      action: ActionType.promptSelectCustom,
      actionArgs: {
        actionId,
        result: desiredOption,
      },
      prevGame: this.game,
    }).game;
  },
);
