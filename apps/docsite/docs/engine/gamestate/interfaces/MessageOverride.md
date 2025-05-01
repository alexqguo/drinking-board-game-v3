[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / MessageOverride

# Interface: MessageOverride

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:143](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L143)

Represents a message override, typically for the Prompt. Uses a stringId which can
first be checked in the board specific i18n, then falling back to the overall i18n
if necessary.

## Properties

### stringArgs?

> `optional` **stringArgs**: `object`

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:146](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L146)

#### Index Signature

\[`key`: `string`\]: `any`

***

### stringId

> **stringId**: `string`

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:144](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L144)
