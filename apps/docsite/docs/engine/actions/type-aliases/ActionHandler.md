[**@repo/engine**](../../README.md)

---

[@repo/engine](../../modules.md) / [actions](../README.md) / ActionHandler

# Type Alias: ActionHandler\<T\>

> **ActionHandler**\<`T`\>: `object`

Defined in: [actions/actions.types.ts:26](https://github.com/alexqguo/drinking-board-game-v3/blob/461114994e3e28c73ae280b4acd08ba7cdad6013/packages/engine/src/actions/actions.types.ts#L26)

## Type Parameters

• **T** _extends_ `ActionType`

## Type declaration

### execute()

> **execute**: (`ctx`, `args`) => `void`

#### Parameters

##### ctx

[`Context`](../../context/classes/Context.md)

##### args

[`Payloads`](../interfaces/Payloads.md)\[`T`\]

#### Returns

`void`

### postvalidate()?

> `optional` **postvalidate**: (`game`) => `void`

#### Parameters

##### game

[`Game`](../../gamestate/type-aliases/Game.md)

#### Returns

`void`

### prevalidate()?

> `optional` **prevalidate**: (`ctx`, `args`) => `void`

#### Parameters

##### ctx

[`Context`](../../context/classes/Context.md)

##### args

[`Payloads`](../interfaces/Payloads.md)\[`T`\]

#### Returns

`void`
