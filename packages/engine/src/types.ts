// https://amir.rachum.com/typescript-oneof/
type AllowOnly<T, K extends keyof T> = Pick<T, K> & { [P in keyof Omit<T, K>]?: never }
export type OneOf<T, K = keyof T> = K extends keyof T ? AllowOnly<T, K> : never

export * from './rules/rules.types.js';
export * from './gamestate/gamestate.types.js';
export * from './actions/actions.types.js';
export * from './boards/boards.types.js';