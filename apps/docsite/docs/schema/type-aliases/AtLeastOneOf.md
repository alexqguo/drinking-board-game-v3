[**@repo/schemas**](../README.md)

***

[@repo/schemas](../README.md) / AtLeastOneOf

# Type Alias: AtLeastOneOf\<T, U\>

> **AtLeastOneOf**\<`T`, `U`\>: `Partial`\<`T`\> & `U`\[keyof `U`\]

Defined in: [legacy-types.ts:3](https://github.com/alexqguo/drinking-board-game-v3/blob/c1651f3f11d4ae3776e0b160a33032601da6e0ad/packages/schemas/src/legacy-types.ts#L3)

## Type Parameters

• **T**

• **U** = `{ [K in keyof T]: Pick<T, K> }`
