import { ActionType } from '@repo/enums';
import assert from 'assert';
import gen1 from '../../../../boards/pokemon-gen1';
import testingBoard from '../../../../boards/testing-board';
import zelda from '../../../../boards/zelda';
import { boardRegistry } from '../../src';
import { Game } from '../../src/gamestate';
import { getNextGame } from '../../src/requestHandler';
import { Given, Then, When } from './coreUtils';

boardRegistry.register('pokemon-gen1', gen1);
boardRegistry.register('zelda', zelda);
boardRegistry.register('testing-board', testingBoard);

// Game creation step definitions
Given('the game engine is initialized', function () {
  // Nothing to do here as the engine is stateless and initialized when needed
  this.game = {} as Game;
  this.gameSavedForComparison = null;
  this.playerNames = [] as string[];
  this.board = '';

  this.getBoard = () => {
    return boardRegistry.getBoard(this.board)!;
  };

  this.getCurrentPlayer = () => {
    return this.game.players[this.game.metadata.currentPlayerId];
  };

  this.getPlayerForName = (name: string) => {
    return Object.values(this.game.players).find((p) => p.name === name)!;
  };
});

When(
  'the game is created with players {string} and board {string}',
  function (playerNamesStr, boardName) {
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

    // Rename player IDs for easier readability
    Object.values(response.game.players).forEach((p) => {
      const oldPid = p.id;
      p.id = `uuid-for-${p.name}`;
      response.game.players[p.id] = p;
      response.game.availableActions[p.id] = { turnActions: [], promptActions: [] };
      delete response.game.players[oldPid];
      delete response.game.availableActions[oldPid];
    });

    this.game = response.game;
  },
);

Then('the game state should be {string}', function (expectedState) {
  const actualState = this.game.metadata.state;
  assert.strictEqual(
    actualState,
    expectedState,
    `Expected game state to be ${expectedState} but found ${actualState}`,
  );
});

Then('the player {string} should be in position {int}', function (playerName, position) {
  const player = this.getPlayerForName(playerName);
  assert.ok(player, `Player ${playerName} not found`);
  assert.strictEqual(
    player.tileIndex,
    position,
    `Expected player to be at position ${position} but found ${player.tileIndex}`,
  );
});

When('the game is started', function () {
  const response = getNextGame({
    action: ActionType.gameStart,
    actionArgs: {},
    prevGame: this.game,
  });

  this.game = response.game;
});

When('the current player rolls to land on ruleId {string}', function (ruleId) {
  assert.strictEqual(this.game.metadata.state, 'RollStart', 'Player should be able to roll');

  // 1. Figure out what tile we want to land on
  const tileIdx = this.getBoard().board.tiles.findIndex((t) => t.rule.id === ruleId);
  if (tileIdx === -1) throw new Error(`RuleId ${ruleId} not found.`);

  // 2. Place the current player one tile before it
  this.getCurrentPlayer().tileIndex = tileIdx - 1;
  this.getCurrentPlayer().visitedTiles = [...this.getCurrentPlayer().visitedTiles, tileIdx - 1];

  // 3. Roll a 1 for the player
  const rollActionId = this.game.availableActions[this.getCurrentPlayer().id].turnActions.find(
    (a) => a.type === ActionType.turnRoll,
  )?.id;

  this.game = getNextGame({
    prevGame: this.game,
    action: ActionType.turnRoll,
    actionArgs: {
      actionId: rollActionId!,
    },
    seeds: [1],
  }).game;
});

Then('the current player should be {string}', function (playerName) {
  const pid = this.getPlayerForName(playerName).id;

  assert.strictEqual(
    this.game.metadata.currentPlayerId,
    pid,
    `Current player should be ${playerName}`,
  );
});

Then('{string} should be on tile {int}', function (playerName, tileIdx) {
  const playerTileIdx = this.getPlayerForName(playerName).tileIndex;
  assert.strictEqual(
    playerTileIdx,
    tileIdx,
    `${playerName} should be at tile idx ${tileIdx}. Current location: ${playerTileIdx}`,
  );
});

Then('{string} should have won the game', function (playerName) {
  assert.ok(this.getPlayerForName(playerName).hasWon, `${playerName} should have won the game.`);
});

Then('the turnOrder should be {int}', function (expectedTurnOrder) {
  assert.strictEqual(
    this.game.metadata.turnOrder,
    expectedTurnOrder,
    `Expected a turn order of ${expectedTurnOrder}. Actual: ${this.game.metadata.turnOrder}`,
  );
});
