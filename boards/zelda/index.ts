import { BoardModule, BoardSchema } from '@repo/schemas';
import schema from './schema.json' with { type: 'json' };

const zelda: BoardModule = {
  board: schema as BoardSchema,
  metadata: {
    id: 'zelda',
    displayName: 'The Legend of Zelda',
    description: 'Adventure through Hyrule with Link',
    imagePreviewUrl: schema.imageUrl,
  },
};

export default zelda;
