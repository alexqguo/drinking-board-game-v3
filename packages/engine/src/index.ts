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
  [T in ActionType]: (payload: Payloads[T]) => void;
} = {
  [ActionType.gameCreate]: create,
  [ActionType.gameStart]: () => undefined,
  [ActionType.turnRoll]: () => undefined,
  [ActionType.turnRollSkip]: () => undefined,
  [ActionType.turnRollAugment]: () => undefined,
  [ActionType.alertClose]: () => undefined,
  [ActionType.alertAction]: () => undefined,
}

const requestHandler = <T extends ActionType>(
  action: T,
  requestArgs: Payloads[T],
) => {
  console.log(`Executing action ${action} with request arguments ${JSON.stringify(requestArgs)}`);
  const handler = handlers[action];

  if (!handler) throw `Could not find action hanler for ${action} action.`;

  handler(requestArgs)
};