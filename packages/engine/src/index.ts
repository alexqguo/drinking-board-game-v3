import { ActionType, BoardName } from './enums';
import { createHandler, CreateGameArguments } from './actions/create';

interface Payloads {
  [ActionType.gameCreate]: CreateGameArguments,
  [ActionType.gameStart]: {},
  [ActionType.turnRoll]: {},
  [ActionType.turnRollSkip]: {},
  [ActionType.turnRollAugment]: {},
  [ActionType.alertClose]: {},
  [ActionType.alertAction]: {},
}

const handlers: {
  // TODO- void should be GameData or something
  [T in ActionType]: {
    execute: (payload: Payloads[T]) => Game,
    prevalidate?: (payload: Payloads[T]) => void,
    postvalidate?: (game: Game) => void,
  };
} = {
  [ActionType.gameCreate]: createHandler,
  // @ts-expect-error not implemented yet
  [ActionType.gameStart]: () => undefined,
  // @ts-expect-error not implemented yet
  [ActionType.turnRoll]: () => undefined,
  // @ts-expect-error not implemented yet
  [ActionType.turnRollSkip]: () => undefined,
  // @ts-expect-error not implemented yet
  [ActionType.turnRollAugment]: () => undefined,
  // @ts-expect-error not implemented yet
  [ActionType.alertClose]: () => undefined,
  // @ts-expect-error not implemented yet
  [ActionType.alertAction]: () => undefined,
}

const requestHandler = <T extends ActionType>(
  action: T,
  requestArgs: Payloads[T],
): Game => {
  console.log(`Executing action ${action} with request arguments ${JSON.stringify(requestArgs)}`);
  const { prevalidate, postvalidate, execute } = handlers[action];

  if (!execute) throw `Could not find action hanler for ${action} action.`;
  prevalidate?.(requestArgs);

  const result = execute(requestArgs);

  postvalidate?.(result);
  return result;
};

const testgame = requestHandler(ActionType.gameCreate, {
  playerNames: ['hello', 'world'],
  board: BoardName.PokemonGen1
})
console.log('asdf create game', testgame)