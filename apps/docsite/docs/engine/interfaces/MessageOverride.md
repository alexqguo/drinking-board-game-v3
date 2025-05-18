[**@repo/schemas**](../README.md)

***

[@repo/schemas](../globals.md) / MessageOverride

# Interface: MessageOverride

Defined in: [legacy-types.ts:32](https://github.com/alexqguo/drinking-board-game-v3/blob/6219b44c05bf1b55de4a76da31192aa5179671e8/packages/schemas/src/legacy-types.ts#L32)

Represents a message override, typically for the Prompt. Uses a stringId which can
first be checked in the board specific i18n, then falling back to the overall i18n
if necessary.

## Properties

### stringArgs?

> `optional` **stringArgs**: `object`

Defined in: [legacy-types.ts:35](https://github.com/alexqguo/drinking-board-game-v3/blob/6219b44c05bf1b55de4a76da31192aa5179671e8/packages/schemas/src/legacy-types.ts#L35)

#### Index Signature

\[`key`: `string`\]: `any`

***

### stringId

> **stringId**: `string`

Defined in: [legacy-types.ts:33](https://github.com/alexqguo/drinking-board-game-v3/blob/6219b44c05bf1b55de4a76da31192aa5179671e8/packages/schemas/src/legacy-types.ts#L33)
