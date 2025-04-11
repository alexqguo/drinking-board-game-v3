export enum BoardName {
  PokemonGen1 = 'pokemon-gen1',
  Zelda = 'zelda'
}

/**
 * The types of actions that can go into the engine
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
}