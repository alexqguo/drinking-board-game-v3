import { BoardModule, BoardSchema } from '@repo/schemas';
import schema from './schema.json' with { type: 'json' };

const zelda: BoardModule = {
  board: schema as BoardSchema,
};

export default zelda;
