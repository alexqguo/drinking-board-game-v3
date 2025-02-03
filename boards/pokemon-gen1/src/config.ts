// import { type BoardModule, type BoardSchema } from '@repo/engine/types';
import schema from './schema.json';

const starters = Object.freeze({
  pikachu: 'Pikachu',
  squirtle: 'Squirtle',
  bulbasaur: 'Bulbasaur',
  charmander: 'Charmander',
});

const starterStrengths = Object.freeze({
  [starters.pikachu]: starters.squirtle,
  [starters.squirtle]: starters.charmander,
  [starters.charmander]: starters.bulbasaur,
  [starters.bulbasaur]: starters.squirtle,
});

const trainerBattleRuleId = 'battle_gen1';

export const gen1: BoardModule = {
  board: schema as BoardSchema,
  // gameExtensionInfo: {

  // }
};