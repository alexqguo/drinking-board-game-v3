[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / TurnRollAnimationHint

# Interface: TurnRollAnimationHint

Defined in: [gamestate/gamestate.types.ts:29](https://github.com/alexqguo/drinking-board-game-v3/blob/b97bcc1ddcaaba3a45adac5652c86c58659c1d00/packages/engine/src/gamestate/gamestate.types.ts#L29)

## Extends

- [`AnimationHint`](AnimationHint.md)

## Properties

### payload

> **payload**: `object`

Defined in: [gamestate/gamestate.types.ts:31](https://github.com/alexqguo/drinking-board-game-v3/blob/b97bcc1ddcaaba3a45adac5652c86c58659c1d00/packages/engine/src/gamestate/gamestate.types.ts#L31)

#### adjustedRoll?

> `optional` **adjustedRoll**: `number`

#### mandatoryTileIdx?

> `optional` **mandatoryTileIdx**: `number`

#### originalRoll

> **originalRoll**: `number`

#### playerId

> **playerId**: `string`

#### Overrides

[`AnimationHint`](AnimationHint.md).[`payload`](AnimationHint.md#payload)

***

### type

> **type**: `"turnRoll"`

Defined in: [gamestate/gamestate.types.ts:30](https://github.com/alexqguo/drinking-board-game-v3/blob/b97bcc1ddcaaba3a45adac5652c86c58659c1d00/packages/engine/src/gamestate/gamestate.types.ts#L30)

#### Overrides

[`AnimationHint`](AnimationHint.md).[`type`](AnimationHint.md#type)
