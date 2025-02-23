import { ActionType, BaseAction, BoardName, Game, PromptAction, requestHandler } from '@repo/engine';
import readline from 'node:readline';

const testLoggers = {
  display: (...args: any[]) => console.log('[DISPLAY]', ...args, '\n'),
  // debug: (...args: any[]) => console.log('[DEBUG]', ...args, '\n'),
  debug: () => {},
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

async function main() {
  while (true) {
    // console.dir(testGame, { depth: null });

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

    // TODO- print out player statuses
    // TODO- print out prompt nicely if it exists

    console.log('\nAvailable actions:');
    allActions.forEach((a, idx) => {
      console.log(`[${idx}] | ${testGame.players[a.pid]?.name} | action:${a.action.type}`);
      if (a.action.result) {
        console.log(`✅ - ${a.action.result}\n`);
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

    const requiresChoice = !!(resultingAction?.action as PromptAction).candidateIds;
    const madeChoice = typeof optionIdx === 'number';

    // If the action needs a choice and you didn't give one
    if (requiresChoice && !optionIdxStr) {
      console.error('You need to choose an option');
      continue;
    }
    // If the optionIdx from your choice is invalid
    if (
      madeChoice
      && requiresChoice
      && optionIdx > (resultingAction?.action as PromptAction).candidateIds!.length
    ) {
      console.error('Your choice is invalid');
      continue;
    }

    actionArgs.playerId = resultingAction?.pid,
    actionArgs.actionId = resultingAction?.action.id,
    actionArgs.result = (madeChoice && requiresChoice) ? (resultingAction?.action as PromptAction).candidateIds![optionIdx] : null,

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