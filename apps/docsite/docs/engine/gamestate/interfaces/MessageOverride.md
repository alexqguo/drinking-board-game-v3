[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / MessageOverride

# Interface: MessageOverride

Defined in: [gamestate/gamestate.types.ts:129](https://github.com/alexqguo/drinking-board-game-v3/blob/c54738830b911cea80ee4f6fef46ab8be3a3f8a1/packages/engine/src/gamestate/gamestate.types.ts#L129)

Represents a message override, typically for the Prompt. Uses a stringId which can
first be checked in the board specific i18n, then falling back to the overall i18n
if necessary.

## Properties

### stringArgs?

> `optional` **stringArgs**: `object`

Defined in: [gamestate/gamestate.types.ts:132](https://github.com/alexqguo/drinking-board-game-v3/blob/c54738830b911cea80ee4f6fef46ab8be3a3f8a1/packages/engine/src/gamestate/gamestate.types.ts#L132)

#### Index Signature

\[`key`: `string`\]: `any`

***

### stringId

> **stringId**: `string`

Defined in: [gamestate/gamestate.types.ts:130](https://github.com/alexqguo/drinking-board-game-v3/blob/c54738830b911cea80ee4f6fef46ab8be3a3f8a1/packages/engine/src/gamestate/gamestate.types.ts#L130)
