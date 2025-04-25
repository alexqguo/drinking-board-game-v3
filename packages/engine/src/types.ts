// https://amir.rachum.com/typescript-oneof/
type AllowOnly<T, K extends keyof T> = Pick<T, K> & { [P in keyof Omit<T, K>]?: never };
export type OneOf<T, K = keyof T> = K extends keyof T ? AllowOnly<T, K> : never;
export type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
