import { ActionType } from './enums';
import { create, CreateGameArguments } from './actions/create';

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
  [T in ActionType]: (payload: Payloads[T]) => Game;
} = {
  [ActionType.gameCreate]: create,
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
  const handler = handlers[action];

  if (!handler) throw `Could not find action hanler for ${action} action.`;

  return handler(requestArgs);
};

console.log('asdf hello ')