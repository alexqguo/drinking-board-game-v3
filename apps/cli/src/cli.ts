import { select } from '@inquirer/prompts';
import {
  ActionType,
  BoardHelper,
  BoardModule,
  BoardName,
  Game,
  getBoard,
  PromptAction,
  requestHandler,
} from '@repo/engine';
import { createI18n } from '@repo/i18n';
import en from '@repo/i18n/translations/en.json' assert { type: 'json' };
import { getAllActions, printGameStatus, testLoggers } from './utils.js';

let game: Game;
let board: BoardModule;
let boardHelper: BoardHelper;

const i18n = createI18n(en);

const initialize = () => {
  // todo- ask if you want to load game or start a new one

  createGame();
};

const createGame = async () => {
  const boardNames = Object.values(BoardName);
  const boardName = await select({
    message: i18n.getMessage('selectBoard'),
    choices: boardNames.map(n => ({
      name: n,
      value: n,
    }))
  });

  game = requestHandler({
    action: ActionType.gameCreate,
    actionArgs: {
      playerNames: ['P1', 'P2'],
      board: boardName
    },
    prevGame: null,
    loggers: testLoggers
  }).game;

  game = requestHandler({
    action: ActionType.gameStart,
    prevGame: game,
    actionArgs: {},
    loggers: testLoggers
  }).game;

  board = getBoard(boardName);
  boardHelper = new BoardHelper(board);

  gameLoop();
}


const gameLoop = async () => {
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
          name: a.action.result ? `✅ - ${a.action.result}`
            : `[${game.players[a.pid]?.name}] | ${i18n.getMessage(a.action.type)} ${optionsStr}`,
          value: idx,
          disabled: !!a.action.result
        };
      }),
    });

    let userCandidateId = null;
    const actionForPlayer = allActions[userActionIdx];

    // Ask for candidate ID if needed
    if ((actionForPlayer?.action as PromptAction).candidateIds?.length) {
      userCandidateId = await select({
        message: i18n.getMessage('cli_makeSelection'),
        choices: (actionForPlayer?.action as PromptAction).candidateIds!.map(id => ({
          name: id,
          value: id,
        })),
      });
    }

    // Send request for new game
    game = requestHandler({
      action: actionForPlayer?.action.type!,
      prevGame: game,
      actionArgs: {
        playerId: actionForPlayer?.pid,
        actionId: actionForPlayer?.action.id,
        result: userCandidateId,
      },
      loggers: testLoggers
    }).game;

    continue;
  }
}

// gameLoop();

console.clear();
initialize();