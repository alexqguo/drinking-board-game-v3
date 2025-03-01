import { BoardModule, BoardSchema } from '../boards.types.js';
import schema from './schema.json' assert { type: 'json' };

export const zelda: BoardModule = {
  board: schema as BoardSchema,
}