import { requestHandler } from './engine.js';
import { ActionType, BoardName } from './enums.js';

const testLoggers = {
  display: console.log,
  debug: console.info,
  error: console.error,
}

const testgame = requestHandler({
  action: ActionType.gameCreate,
  actionArgs: {
    playerNames: ['asdf', 'qwer'],
    board: BoardName.PokemonGen1,
  },
  prevGame: null,
  loggers: testLoggers
})
// console.log('asdf created game', testgame);

const startedGame = requestHandler({
  action: ActionType.gameStart,
  prevGame: testgame,
  actionArgs: {},
  loggers: testLoggers
});
// console.log('asdf started game', startedGame);