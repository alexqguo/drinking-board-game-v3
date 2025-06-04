[**@repo/schemas**](../README.md)

***

[@repo/schemas](../README.md) / AtLeastOneOf

# Type Alias: AtLeastOneOf\<T, U\>

> **AtLeastOneOf**\<`T`, `U`\>: `Partial`\<`T`\> & `U`\[keyof `U`\]

Defined in: [legacy-types.ts:3](https://github.com/alexqguo/drinking-board-game-v3/blob/fc5adf9b53e666003d4a7f6c500cdc49fb9dbd39/packages/schemas/src/legacy-types.ts#L3)

## Type Parameters

• **T**

• **U** = `{ [K in keyof T]: Pick<T, K> }`
