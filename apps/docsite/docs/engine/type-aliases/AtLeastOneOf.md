[**@repo/schemas**](../README.md)

***

[@repo/schemas](../globals.md) / AtLeastOneOf

# Type Alias: AtLeastOneOf\<T, U\>

> **AtLeastOneOf**\<`T`, `U`\>: `Partial`\<`T`\> & `U`\[keyof `U`\]

Defined in: [legacy-types.ts:3](https://github.com/alexqguo/drinking-board-game-v3/blob/e685f3b5240058db25c494e5486105704e4feaf9/packages/schemas/src/legacy-types.ts#L3)

## Type Parameters

• **T**

• **U** = `{ [K in keyof T]: Pick<T, K> }`
