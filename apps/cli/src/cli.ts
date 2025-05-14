import { select } from '@inquirer/prompts';
import {
  ActionType,
  BoardHelper,
  boardRegistry,
  Game,
  getBoard,
  PromptAction,
  requestHandler,
} from '@repo/engine';
import { createI18n } from '@repo/i18n';
import en from '@repo/i18n/translations/en.json' with { type: 'json' };
import { BoardMetadata, BoardModule } from '@repo/schemas';
import pokemonGen1 from '../../../boards/pokemon-gen1/index.js';
import zelda from '../../../boards/zelda/index.js';
import { printGameStatus, testLoggers } from './print.js';
import { getNextSeed, testGame } from './testGames.js';
import { getAllActions } from './utils.js';

let game: Game;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let board: BoardModule; // This is used below...
let boardHelper: BoardHelper;

const i18n = createI18n(en);

/**
 * Initialize board registry with available boards
 */
const initializeBoardRegistry = () => {
  boardRegistry.register('pokemon-gen1', pokemonGen1);
  boardRegistry.register('zelda', zelda);
};

// Initialize the board registry
initializeBoardRegistry();

const initialize = async () => {
  // todo- ask if you want to load game or start a new one
  const action = await select({
    message: i18n.getMessage('cli_makeSelection'),
    choices: [
      {
        name: 'Create game',
        value: 'create',
      },
      {
        name: 'Load test game',
        value: 'load',
      },
    ],
  });

  if (action === 'create') {
    createGame();
  } else if (action === 'load') {
    loadGame();
  }
};

const loadGame = async () => {
  game = testGame;
  board = getBoard(game.metadata.board);
  boardHelper = new BoardHelper(game.metadata.board);
  gameLoop({ isTestGame: true });
};

const createGame = async () => {
  // Get available boards from the registry
  const availableBoards: BoardMetadata[] = boardRegistry
    .getAvailableBoards()
    .map((b) => b.metadata);

  const boardName = await select({
    message: i18n.getMessage('selectBoard'),
    choices: availableBoards.map((board) => ({
      name: board.displayName,
      value: board.id,
      description: board.description,
    })),
  });

  game = requestHandler({
    action: ActionType.gameCreate,
    actionArgs: {
      playerNames: ['P1', 'P2'],
      board: boardName,
    },
    prevGame: null,
    loggers: testLoggers,
  }).game;

  game = requestHandler({
    action: ActionType.gameStart,
    prevGame: game,
    actionArgs: {},
    loggers: testLoggers,
  }).game;

  board = getBoard(boardName);
  boardHelper = new BoardHelper(boardName);

  gameLoop({});
};

interface GameLoopArgs {
  isTestGame?: boolean;
}

const gameLoop = async ({ isTestGame = false }: GameLoopArgs) => {
  while (true) {
    console.clear();
    printGameStatus(game, boardHelper);
    const allActions = getAllActions(game);

    const userActionIdx = await select({
      message: i18n.getMessage('cli_selectAction'),
      choices: allActions.map((a, idx) => {
        const options = (a.action as PromptAction).candidateIds;
        const hasOptions = options?.length;
        const optionsStr = hasOptions ? ` :: (${options.join(', ')})` : '';

        return {
          name: a.action.result
            ? `✅ - ${a.action.result}`
            : `[${game.players[a.pid]?.name}] | ${i18n.getMessage(a.action.type)} ${optionsStr}`,
          value: idx,
          disabled: !!a.action.result,
        };
      }),
    });

    let userCandidateId = null;
    const actionForPlayer = allActions[userActionIdx];
    const isRolling = actionForPlayer?.action.type === ActionType.turnRoll;

    // Ask for candidate ID if needed
    if ((actionForPlayer?.action as PromptAction).candidateIds?.length) {
      userCandidateId = await select({
        message: i18n.getMessage('cli_makeSelection'),
        choices: (actionForPlayer?.action as PromptAction).candidateIds!.map((id) => ({
          name: id,
          value: id,
        })),
      });
    }

    // Send request for new game
    game = requestHandler({
      action: actionForPlayer!.action.type,
      prevGame: game,
      actionArgs: {
        playerId: actionForPlayer?.pid,
        actionId: actionForPlayer?.action.id,
        result: userCandidateId,
      },
      loggers: testLoggers,
      seeds: isTestGame && isRolling ? getNextSeed() : [],
    }).game;

    continue;
  }
};

console.clear();
initialize();

process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('👋 until next time!');
    console.dir(game, { depth: null });
  } else {
    // Rethrow unknown errors
    throw error;
  }
});
