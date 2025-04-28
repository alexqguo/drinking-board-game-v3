/**
 * Primary export file for schemas package
 */
export * from './basic-types.js';
export * from './board-schemas.js';
export * from './rule-schemas.js';

// Export validation functions
export { validateBoardModule, validateBoardModuleStrict } from './validation.js';
