import { BoardModule, BoardSchema } from '@repo/engine/types';
import schema from '@boards/pokemon-gen1/schema' assert { type: 'json' };

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

  // board: schema as BoardSchema,
  // gameExtensionInfo: {

  // }
};