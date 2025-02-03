import { gen1 } from '@boards/pokemon-gen1/config';

enum BoardName {
  PokemonGen1 = 'pokemon-gen1'
}

export const getBoard = (name: string): BoardModule => {
  if (name === BoardName.PokemonGen1) return gen1;
  throw 'board not found';
}