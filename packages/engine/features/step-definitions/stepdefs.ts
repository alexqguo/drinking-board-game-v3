import { Given, Then, When, World } from '@cucumber/cucumber';
import { ActionType } from '@repo/enums';
import assert from 'assert';
import { Game, GameState } from '../../src/gamestate/gamestate.types.js';
import { getNextGame } from '../../src/requestHandler.js';

interface CustomWorld extends World {
  game: Game;
  playerNames: string[];
  board: string;
}

const T = Then<CustomWorld>;
const W = When<CustomWorld>;
const G = Given<CustomWorld>;

// Game creation step definitions
G('the game engine is initialized', function () {
  // Nothing to do here as the engine is stateless and initialized when needed
  this.game = {} as Game;
  this.playerNames = [] as string[];
  this.board = '';
});

W('I create a game with players {string} and board {string}', function (playerNamesStr, boardName) {
  const playerNames = playerNamesStr.split(',');
  this.playerNames = playerNames;
  this.board = boardName;

  // Create game using the engine's requestHandler
  const response = getNextGame({
    action: ActionType.gameCreate,
    actionArgs: {
      playerNames,
      board: boardName,
    },
    prevGame: null,
  });

  this.game = response.game;
});

W('I start the game', function () {
  // Start the created game
  const response = getNextGame({
    action: ActionType.gameStart,
    actionArgs: {},
    prevGame: this.game,
  });

  this.game = response.game;
});

T('the game should have {int} players', function (count) {
  const playerCount = Object.keys(this.game.players).length;
  assert.strictEqual(playerCount, count, `Expected ${count} players but found ${playerCount}`);
});

T('the game state should be {string}', function (expectedState) {
  const actualState = this.game.metadata.state;
  assert.strictEqual(
    actualState,
    expectedState,
    `Expected game state to be ${expectedState} but found ${actualState}`,
  );
});

T('the player {string} should be in position {int}', function (playerName, position) {
  const player = Object.values(this.game!.players).find((p) => p.name === playerName);
  assert.ok(player, `Player ${playerName} not found`);
  assert.strictEqual(
    player.tileIndex,
    position,
    `Expected player to be at position ${position} but found ${player.tileIndex}`,
  );
});

T('each player should have empty available actions', function () {
  const playerIds = Object.keys(this.game.players);
  for (const playerId of playerIds) {
    const availableActions = this.game.availableActions[playerId];
    assert.ok(availableActions, `Available actions not found for player ${playerId}`);
    assert.strictEqual(availableActions.turnActions.length, 0, 'Expected turn actions to be empty');
    assert.strictEqual(
      availableActions.promptActions.length,
      0,
      'Expected prompt actions to be empty',
    );
  }
});

T('the first player should be set as current player', function () {
  const playerIds = Object.values(this.game.players)
    .sort((a, b) => a.order - b.order)
    .map((p) => p.id);

  const currentPlayerId = this.game.metadata.currentPlayerId;
  assert.strictEqual(
    currentPlayerId,
    playerIds[0],
    'Expected first player to be the current player',
  );
});

T('the game prompt should exist for starter selection', function () {
  assert.ok(this.game.prompt, 'Expected game prompt to exist');
  // In pokemon-gen1, the first tile usually contains the starter selection rule
  // We check that we have a prompt with GameStart as next state
  assert.strictEqual(
    this.game.prompt.nextGameState,
    GameState.TurnCheck,
    'Expected prompt to lead to TurnCheck',
  );
});
