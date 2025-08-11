[**@repo/schemas**](../README.md)

---

[@repo/schemas](../README.md) / AtLeastOneOf

# Type Alias: AtLeastOneOf\<T, U\>

> **AtLeastOneOf**\<`T`, `U`\>: `Partial`\<`T`\> & `U`\[keyof `U`\]

Defined in: [legacy-types.ts:3](https://github.com/alexqguo/drinking-board-game-v3/blob/b790afaa2e3b8fa2b8d92187d67ae85cb9db6cc2/packages/schemas/src/legacy-types.ts#L3)

## Type Parameters

• **T**

• **U** = `{ [K in keyof T]: Pick<T, K> }`
