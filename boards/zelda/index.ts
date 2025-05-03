import { BoardModule, BoardSchema } from '@repo/schemas';
import schema from './schema.json' with { type: 'json' };

const zelda: BoardModule = {
  board: schema as BoardSchema,
  metadata: {
    id: 'zelda',
    displayName: 'Zelda: Inebriated of Time',
    description: 'Pre-release',
    imagePreviewUrl: schema.imageUrl,
  },
};

export default zelda;
