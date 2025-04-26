[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [actions](../README.md) / ActionHandler

# Type Alias: ActionHandler\<T\>

> **ActionHandler**\<`T`\>: `object`

Defined in: [actions/actions.types.ts:26](https://github.com/alexqguo/drinking-board-game-v3/blob/56df34968617deee505d881352afe56efb53b2a4/packages/engine/src/actions/actions.types.ts#L26)

## Type Parameters

• **T** *extends* `ActionType`

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
