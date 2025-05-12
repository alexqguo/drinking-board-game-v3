import { GameState } from '@repo/schemas';
import assert from 'assert';
import { ActionType } from '../../src/actions';
import { getNextGame } from '../../src/requestHandler';
import { Then, When } from './coreUtils';

When('{string} selects {string} as their gen1 starter', function (playerName, starterId) {
  const player = this.getPlayerForName(playerName);
  const actions = this.game.availableActions[player.id].promptActions;
  const actionId = actions.find((a) => a.type === ActionType.promptSelectCustom)!.id;

  this.game = getNextGame({
    action: ActionType.promptSelectCustom,
    actionArgs: {
      actionId,
      result: starterId,
    },
    prevGame: this.game,
  }).game;
});

Then('{string} should have {int} battle roll actions', function (playerName, expectedNumActions) {
  const player = this.getPlayerForName(playerName);
  const actions = this.game.availableActions[player.id].promptActions;
  const battleRollActions = actions.filter((a) => a.type === ActionType.battleRoll);

  assert.strictEqual(
    battleRollActions.length,
    expectedNumActions,
    `${playerName} should have ${expectedNumActions} battle roll action${expectedNumActions === 1 ? '' : 's'}`,
  );
});

Then('the game prompt should exist for starter selection', function () {
  assert.ok(this.game.prompt, 'Expected game prompt to exist');
  // In pokemon-gen1, the first tile usually contains the starter selection rule
  // We check that we have a prompt with TurnCheck as next state
  assert.strictEqual(
    this.game.prompt.nextGameState,
    GameState.TurnCheck,
    'Expected prompt to lead to TurnCheck',
  );
});
