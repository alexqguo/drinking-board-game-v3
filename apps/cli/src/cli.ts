import { select } from '@inquirer/prompts';
import { ActionType, BaseAction, BoardName, Game, PromptAction, requestHandler } from '@repo/engine';

// TODO - use commander and inquirer

const testLoggers = {
  display: (...args: any[]) => console.log('[DISPLAY]', ...args, '\n'),
  // debug: (...args: any[]) => console.log('[DEBUG]', ...args, '\n'),
  debug: () => {},
  error: console.error,
}

// const askQuestion = (question: string): Promise<string> => {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   return new Promise((resolve) => {
//     rl.question(question, (answer) => {
//       rl.close();
//       resolve(answer);
//     });
//   });
// }

let game: Game;

const createGame = async () => {
  const boardNames = Object.values(BoardName);
  const boardName = await select({
    message: 'Select a board',
    choices: boardNames.map(n => ({
      name: n,
      value: n,
    }))
  });
  game = requestHandler({
    action: ActionType.gameCreate,
    actionArgs: {
      playerNames: ['PLAYER1', 'PLAYER2'],
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

  gameLoop();
}


const gameLoop = async () => {
  while (true) {
    const allActions: {
      pid: string,
      action: BaseAction,
    }[] = [];

    Object.keys(game.availableActions).forEach(pid => {
      const actionsForPlayer = [
        ...game.availableActions[pid]?.promptActions || [],
        ...game.availableActions[pid]?.turnActions || [],
      ];
      actionsForPlayer.forEach(a => {
        allActions.push({
          pid,
          action: a
        });
      });
    });

    // TODO- print out player statuses
    // TODO- print out prompt nicely if it exists

    const userActionIdx = await select({
      message: 'What action do you want to take?',
      choices: allActions.map((a, idx) => ({
        name: a.action.result ? `✅ - ${a.action.result}`
          : `[${game.players[a.pid]?.name}] | action:${a.action.type}\n${(a.action as PromptAction).candidateIds}`,
        value: idx,
        disabled: !!a.action.result
      })),
    });

    let userCandidateId = null;
    const actionForPlayer = allActions[userActionIdx];


    if ((actionForPlayer?.action as PromptAction).candidateIds?.length) {
      userCandidateId = await select({
        message: 'Make your selection',
        choices: (actionForPlayer?.action as PromptAction).candidateIds!.map(id => ({
          name: id,
          value: id,
        })),
      });
    }

    const actionArgs = {
      playerId: actionForPlayer?.pid,
      actionId: actionForPlayer?.action.id,
      result: userCandidateId,
    };

    game = requestHandler({
      action: actionForPlayer?.action.type!,
      prevGame: game,
      actionArgs,
      loggers: testLoggers
    }).game;

    continue;
  }
}

// gameLoop();
createGame();