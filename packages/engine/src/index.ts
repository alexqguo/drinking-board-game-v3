export { BoardHelper, getBoard } from './boards/index.js';
export { getNextGame as requestHandler } from './requestHandler.js';

export { boardRegistry } from './boards/registry.js';

// TODO - remove these since nothing should be depending on them anymore
export * from './actions/actions.types.js';
export * from './gamestate/gamestate.types.js';
export * from './rules/rules.types.js';

// Needed for board modules
export type { Context } from './context.js';
export { findGameStateHandler } from './gamestate/index.js';
export { createNActionObjects } from './utils/actions.js';
