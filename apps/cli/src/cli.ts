import readline from 'node:readline';
import { requestHandler } from '@repo/engine/engine';
import { ActionType, BoardName } from '@repo/engine/enums';

const testLoggers = {
  display: (...args: any[]) => console.log('[DISPLAY]', ...args, '\n'),
  debug: (...args: any[]) => console.log('[DEBUG]', ...args, '\n'),
  error: console.error,
}

const askQuestion = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

let testGame = requestHandler({
  action: ActionType.gameCreate,
  actionArgs: {
    playerNames: ['PLAYER1', 'PLAYER2'],
    board: BoardName.PokemonGen1,
  },
  prevGame: null,
  loggers: testLoggers
}).game;

testGame = requestHandler({
  action: ActionType.gameStart,
  prevGame: testGame,
  actionArgs: {},
  loggers: testLoggers
}).game;

async function main() {
  while (true) {
    console.dir(testGame, { depth: null });

    const action = await askQuestion("What action do you want to take? (acting as current player) ");

    if (action in ActionType) {
      const actionArgs: any = {};

      if (action === ActionType.promptClose) {
        actionArgs.playerId = testGame.metadata.currentPlayerId;
      } else if (false) {

      }

      testGame = requestHandler({
        action: (action as ActionType),
        prevGame: testGame,
        actionArgs,
        loggers: testLoggers,
      }).game;
      continue;
    }

    throw new Error('action does not exist: ' + action);
  }
}

main();