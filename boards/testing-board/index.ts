import { BoardModule, BoardSchema } from '@repo/schemas';
import schema from './schema.json' with { type: 'json' };

const zelda: BoardModule = {
  board: schema as BoardSchema,
  metadata: {
    id: 'testing-board',
    displayName: 'Testing board title',
    description: 'Testing board description',
    imagePreviewUrl: schema.imageUrl,
  },
};

export default zelda;
