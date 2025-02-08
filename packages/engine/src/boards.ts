import { BoardName } from './enums';
import { gen1 } from '@boards/pokemon-gen1/config';

export const getBoard = (name: string): BoardModule => {
  if (name === BoardName.PokemonGen1) return gen1;
  throw 'board not found';
}