[**@repo/schemas**](../README.md)

***

[@repo/schemas](../README.md) / MessageOverride

# Interface: MessageOverride

Defined in: [legacy-types.ts:44](https://github.com/alexqguo/drinking-board-game-v3/blob/1fd51bdd7d56dd7c938617f9ae2969ed8892dac1/packages/schemas/src/legacy-types.ts#L44)

Represents a message override, typically for the Prompt. Uses a stringId which can
first be checked in the board specific i18n, then falling back to the overall i18n
if necessary.

## Properties

### helperTextId?

> `optional` **helperTextId**: `string`

Defined in: [legacy-types.ts:48](https://github.com/alexqguo/drinking-board-game-v3/blob/1fd51bdd7d56dd7c938617f9ae2969ed8892dac1/packages/schemas/src/legacy-types.ts#L48)

***

### stringArgs?

> `optional` **stringArgs**: `object`

Defined in: [legacy-types.ts:47](https://github.com/alexqguo/drinking-board-game-v3/blob/1fd51bdd7d56dd7c938617f9ae2969ed8892dac1/packages/schemas/src/legacy-types.ts#L47)

#### Index Signature

\[`key`: `string`\]: `any`

***

### stringId

> **stringId**: `string`

Defined in: [legacy-types.ts:45](https://github.com/alexqguo/drinking-board-game-v3/blob/1fd51bdd7d56dd7c938617f9ae2969ed8892dac1/packages/schemas/src/legacy-types.ts#L45)
