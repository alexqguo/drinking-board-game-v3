[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / MessageOverride

# Interface: MessageOverride

Defined in: [gamestate/gamestate.types.ts:138](https://github.com/alexqguo/drinking-board-game-v3/blob/56df34968617deee505d881352afe56efb53b2a4/packages/engine/src/gamestate/gamestate.types.ts#L138)

Represents a message override, typically for the Prompt. Uses a stringId which can
first be checked in the board specific i18n, then falling back to the overall i18n
if necessary.

## Properties

### stringArgs?

> `optional` **stringArgs**: `object`

Defined in: [gamestate/gamestate.types.ts:141](https://github.com/alexqguo/drinking-board-game-v3/blob/56df34968617deee505d881352afe56efb53b2a4/packages/engine/src/gamestate/gamestate.types.ts#L141)

#### Index Signature

\[`key`: `string`\]: `any`

***

### stringId

> **stringId**: `string`

Defined in: [gamestate/gamestate.types.ts:139](https://github.com/alexqguo/drinking-board-game-v3/blob/56df34968617deee505d881352afe56efb53b2a4/packages/engine/src/gamestate/gamestate.types.ts#L139)
