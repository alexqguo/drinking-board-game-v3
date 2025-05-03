/**
 * The types of actions that can go into the engine
 *
 * NOTE: careful here. Adding a new one may result in changes needing to be made elsewhere
 * - Payloads interface, action handlerFactoryMap
 */
export enum ActionType {
  gameCreate = 'gameCreate',
  gameStart = 'gameStart',
  turnRoll = 'turnRoll',
  turnRollSkip = 'turnRollSkip',
  turnRollAugment = 'turnRollAugment',
  promptClose = 'promptClose',
  promptRoll = 'promptRoll',
  promptSelectPlayer = 'promptSelectPlayer',
  promptGrantSelectPlayer = 'promptGrantSelectPlayer',
  promptSelectCustom = 'promptSelectCustom',
  battleRoll = 'battleRoll',
  getAvailableBoards = 'getAvailableBoards',
}
