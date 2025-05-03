import { boardRegistry } from '@repo/engine';
import { BoardSchema } from '@repo/schemas';

export const initializeBoardRegistry = () => {
  // boardRegistry.register('pokemon-gen1', pokemonGen1);
  // boardRegistry.register('zelda', zelda);
  boardRegistry.register('testboard', {
    board: {} as BoardSchema,
    metadata: {
      id: 'testboard',
      displayName: 'test board',
    },
  });
};
