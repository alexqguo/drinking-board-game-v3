import { ActionType, BaseAction } from '@repo/engine/actions/types';
import { BoardName } from '@repo/engine/boards/types';
import { Game } from '@repo/engine/gamestate/types';
import { requestHandler } from '@repo/engine/requestHandler';
import readline from 'node:readline';

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

let testGame: Game = requestHandler({
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

const promptActionTypes = new Set([
  ActionType.promptRoll,
  ActionType.promptSelectCustom,
  ActionType.promptSelectPlayer,
  ActionType.promptSelectStarter
]);

async function main() {
  while (true) {
    console.dir(testGame, { depth: null });

    const userAction = await askQuestion("What action do you want to take? (acting as current player) ");

    if (userAction in ActionType) {
      const actionArgs: any = {};

      const allActions: BaseAction[] = [];
      Object.values(testGame.availableActions).forEach(actionObj => {
        allActions.push(...actionObj.promptActions);
        allActions.push(...actionObj.turnActions);
      });

      if (userAction === ActionType.promptClose) {
        actionArgs.playerId = testGame.metadata.currentPlayerId;
      } else if (userAction === ActionType.turnRoll) {
        actionArgs.actionId = testGame.availableActions[testGame.metadata.currentPlayerId]?.turnActions[0]?.id
      } else if (promptActionTypes.has(userAction as ActionType)) {
        const actionId = allActions.find(a => a.type === userAction)?.id;
        actionArgs.actionId = actionId;
        // TODO need to put result in here too
      }

      testGame = requestHandler({
        action: (userAction as ActionType),
        prevGame: testGame,
        actionArgs,
        loggers: testLoggers,
      }).game;
      continue;
    }

    throw new Error('action does not exist: ' + userAction);
  }
}

main();