[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / PlayerMoveAnimationHint

# Interface: PlayerMoveAnimationHint

Defined in: [gamestate/gamestate.types.ts:44](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/gamestate/gamestate.types.ts#L44)

## Extends

- [`AnimationHint`](AnimationHint.md)

## Properties

### payload

> **payload**: `object`

Defined in: [gamestate/gamestate.types.ts:46](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/gamestate/gamestate.types.ts#L46)

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

Defined in: [gamestate/gamestate.types.ts:45](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/gamestate/gamestate.types.ts#L45)

#### Overrides

[`AnimationHint`](AnimationHint.md).[`type`](AnimationHint.md#type)
