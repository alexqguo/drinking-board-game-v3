[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / PlayerMoveAnimationHint

# Interface: PlayerMoveAnimationHint

Defined in: [gamestate/gamestate.types.ts:20](https://github.com/alexqguo/drinking-board-game-v3/blob/baf4fa7962752bee0d04b33c9ebdf9e8ad641491/packages/engine/src/gamestate/gamestate.types.ts#L20)

## Extends

- [`AnimationHint`](AnimationHint.md)

## Properties

### payload

> **payload**: `object`

Defined in: [gamestate/gamestate.types.ts:22](https://github.com/alexqguo/drinking-board-game-v3/blob/baf4fa7962752bee0d04b33c9ebdf9e8ad641491/packages/engine/src/gamestate/gamestate.types.ts#L22)

#### fromTileIndex

> **fromTileIndex**: `number`

#### playerId

> **playerId**: `string`

#### toTileIndex

> **toTileIndex**: `number`

#### Overrides

[`AnimationHint`](AnimationHint.md).[`payload`](AnimationHint.md#payload)

***

### type

> **type**: `"playerMove"`

Defined in: [gamestate/gamestate.types.ts:21](https://github.com/alexqguo/drinking-board-game-v3/blob/baf4fa7962752bee0d04b33c9ebdf9e8ad641491/packages/engine/src/gamestate/gamestate.types.ts#L21)

#### Overrides

[`AnimationHint`](AnimationHint.md).[`type`](AnimationHint.md#type)
