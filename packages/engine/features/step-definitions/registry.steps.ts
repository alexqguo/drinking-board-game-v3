import { BoardSchema } from '@repo/schemas';
import assert from 'assert';
import { boardRegistry } from '../../src';
import { Then } from './coreUtils';

Then('registering a board with no metadata should error', function () {
  let thrownError: Error | null = null;
  try {
    // @ts-expect-error not passing metadata for testing
    boardRegistry.register('some-id', {
      board: {} as BoardSchema,
    });
  } catch (e) {
    thrownError = e;
  } finally {
    assert(!!thrownError, `Board registry should have thrown an error`);
    assert(thrownError.message.includes('metadata'), 'Error message should be metadata related');
  }
});

Then('registering a board with mismatched IDs should error', function () {
  let thrownError: Error | null = null;
  try {
    boardRegistry.register('some-id', {
      board: {} as BoardSchema,
      metadata: {
        id: 'mismatched',
        displayName: '',
      },
    });
  } catch (e) {
    thrownError = e;
  } finally {
    assert(!!thrownError, `Board registry should have thrown an error`);
    assert(thrownError.message.includes('boardId'), 'Error message should be boardId related');
  }
});

Then('the registry should know if a board exists', function () {
  assert(boardRegistry.hasBoard('pokemon-gen1') === true, `Board ID pokemon-gen1 should exist`);
  assert(boardRegistry.hasBoard('zelda') === true, `Board ID zelda should exist`);
  assert(boardRegistry.hasBoard('testing-board') === true, `Board ID testing-board should exist`);
  assert(boardRegistry.hasBoard('invalid') === false, 'Invalid boards do not exist');
});

Then('the registry should list all available boards', function () {
  const ids = boardRegistry.getAvailableBoards().map((m) => m.metadata.id);
  assert(ids.length === 3, 'Three boards should be registered');
});
