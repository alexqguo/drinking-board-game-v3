import { ActionType, BaseAction, BoardName, Game, PromptAction, requestHandler } from '@repo/engine';
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
  ActionType.promptSelectStarter,
  ActionType.battle,
]);

async function main() {
  while (true) {
    console.dir(testGame, { depth: null });

    const allActions: {
      pid: string,
      action: BaseAction,
    }[] = [];

    Object.keys(testGame.availableActions).forEach(pid => {
      const actionsForPlayer = [
        ...testGame.availableActions[pid]?.promptActions || [],
        ...testGame.availableActions[pid]?.turnActions || [],
      ];
      actionsForPlayer.forEach(a => {
        allActions.push({
          pid,
          action: a
        });
      });
    });

    // TODO- read out prompt nicely

    console.log('\nAvailable actions:');
    allActions.forEach((a, idx) => {
      console.log(`[${idx}] | pid:${a.pid} | action:${a.action.type}`);
      if (a.action.result) {
        console.log(`✅\n`);
        return;
      }
      if ((a.action as PromptAction).candidateIds) {
        console.log(`Options: ${(a.action as PromptAction).candidateIds}`)
      }
      console.log('\n');
    });

    const userAction = await askQuestion("What # action do you want to take? (<actionIdx> <optionIdx>) ");

    const actionArgs: any = {};
    const [actionIdxStr, optionIdxStr] = userAction.split(' ');
    const actionIdx = Number(actionIdxStr);
    const optionIdx = optionIdxStr ? Number(optionIdxStr) : null;

    const resultingAction = allActions[actionIdx];
    actionArgs.playerId = resultingAction?.pid,
    actionArgs.actionId = resultingAction?.action.id,
    actionArgs.result = typeof optionIdx === 'number' ? (resultingAction?.action as PromptAction).candidateIds![optionIdx] : null,
    console.log('result: ', resultingAction, actionArgs.result);

    testGame = requestHandler({
      action: resultingAction?.action.type!,
      prevGame: testGame,
      actionArgs,
      loggers: testLoggers
    }).game;
    continue;
  }
}

main();