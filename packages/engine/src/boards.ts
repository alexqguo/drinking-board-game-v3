import { BoardName } from './enums.js';
import { gen1 } from '@boards/pokemon-gen1/config';

export const getBoard = (name: string): BoardModule => {
  if (name === BoardName.PokemonGen1) return gen1;
  throw `Board not found for board name ${name}`;
}

export const hasBoard = (name: string): boolean => {
  try {
    const board = getBoard(name);
    return true;
  } catch (e){
    return false;
  }
};

export class DecoratedBoard {
  board: BoardModule;

  constructor(board: BoardModule) {
    this.board = board;
    
  }
}