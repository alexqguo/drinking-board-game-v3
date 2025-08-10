[**@repo/schemas**](../README.md)

***

[@repo/schemas](../README.md) / AtLeastOneOf

# Type Alias: AtLeastOneOf\<T, U\>

> **AtLeastOneOf**\<`T`, `U`\>: `Partial`\<`T`\> & `U`\[keyof `U`\]

Defined in: [legacy-types.ts:3](https://github.com/alexqguo/drinking-board-game-v3/blob/1fd51bdd7d56dd7c938617f9ae2969ed8892dac1/packages/schemas/src/legacy-types.ts#L3)

## Type Parameters

• **T**

• **U** = `{ [K in keyof T]: Pick<T, K> }`
