import { BoardModule, BoardSchema } from '@repo/schemas';
import schema from './schema.json' with { type: 'json' };

const testingBoard: BoardModule = {
  board: schema as BoardSchema,
  metadata: {
    id: 'testing-board',
    displayName: 'Testing board title',
    description: 'This board is used for integration tests in the engine package.',
    imagePreviewUrl: schema.imageUrl,
  },
};

export default testingBoard;
