import { BoardModule, BoardSchema } from '../boards.types.js';
import schema from './schema.json' with { type: 'json' };

export const zelda: BoardModule = {
  board: schema as BoardSchema,
}