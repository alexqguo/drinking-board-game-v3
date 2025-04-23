[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / MessageOverride

# Interface: MessageOverride

Defined in: [gamestate/gamestate.types.ts:127](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/gamestate/gamestate.types.ts#L127)

Represents a message override, typically for the Prompt. Uses a stringId which can
first be checked in the board specific i18n, then falling back to the overall i18n
if necessary.

## Properties

### stringArgs?

> `optional` **stringArgs**: `object`

Defined in: [gamestate/gamestate.types.ts:130](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/gamestate/gamestate.types.ts#L130)

#### Index Signature

\[`key`: `string`\]: `any`

***

### stringId

> **stringId**: `string`

Defined in: [gamestate/gamestate.types.ts:128](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/gamestate/gamestate.types.ts#L128)
