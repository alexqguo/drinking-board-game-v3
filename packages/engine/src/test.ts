import { requestHandler } from './';
import { ActionType, BoardName } from './enums';

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
  loggers: testLoggers
})
// console.log('asdf created game', testgame);

const startedGame = requestHandler({
  action: ActionType.gameStart,
  actionArgs: {
    currentGame: testgame,
  },
  loggers: testLoggers
})
// console.log('asdf started game', startedGame);