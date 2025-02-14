import { requestHandler } from './engine.js';
import { ActionType, BoardName } from './enums.js';

const testLoggers = {
  display: (...args: any[]) => console.log('[DISPLAY]', ...args, '\n'),
  debug: (...args: any[]) => console.log('[DEBUG]', ...args, '\n'),
  error: console.error,
}

let testGame = requestHandler({
  action: ActionType.gameCreate,
  actionArgs: {
    playerNames: ['asdf', 'qwer'],
    board: BoardName.PokemonGen1,
  },
  prevGame: null,
  loggers: testLoggers
})
// console.log('created game', testgame);

testGame = requestHandler({
  action: ActionType.gameStart,
  prevGame: testGame,
  actionArgs: {},
  loggers: testLoggers
});
// console.log('started game', startedGame);

testGame = requestHandler({
  action: ActionType.turnRoll,
  prevGame: testGame,
  actionArgs: {},
  loggers: testLoggers
})

// testGame = requestHandler({

// })

console.log('Game:', testGame);