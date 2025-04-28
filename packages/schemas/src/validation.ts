/**
 * Validation utilities for board schemas
 */
import { boardModuleSchema } from './board-schemas.js';

/**
 * Validates a board module with safe parsing, returning boolean result
 *
 * @param data The data to validate
 * @returns true if the data is valid, false otherwise
 */
export function validateBoardModule(data: unknown): boolean {
  const result = boardModuleSchema.safeParse(data);
  return result.success;
}

/**
 * Validates a board module strictly, throwing an error if invalid
 *
 * @param data The data to validate
 * @throws ZodError if the data is invalid
 */
export function validateBoardModuleStrict(data: unknown): void {
  boardModuleSchema.parse(data);
}
