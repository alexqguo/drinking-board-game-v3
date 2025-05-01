import { BoardModule, BoardSchema } from '@repo/schemas';
import schema from './schema.json' with { type: 'json' };

export const zelda: BoardModule = {
  board: schema as BoardSchema,
};
