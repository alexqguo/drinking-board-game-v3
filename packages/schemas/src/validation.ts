/**
 * Validation utilities for board schemas
 */
import typia from 'typia';
import { BoardModule } from './legacy-types.js';

/**
 * Validates a board module strictly, throwing an error if invalid
 *
 * @param data The data to validate
 * @throws ZodError if the data is invalid
 */
export function validateBoardModule(data: unknown): void {
  typia.assertEquals<BoardModule>(data);
}
