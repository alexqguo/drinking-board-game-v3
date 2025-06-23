[**@repo/schemas**](../README.md)

---

[@repo/schemas](../README.md) / MessageOverride

# Interface: MessageOverride

Defined in: [legacy-types.ts:32](https://github.com/alexqguo/drinking-board-game-v3/blob/fc5adf9b53e666003d4a7f6c500cdc49fb9dbd39/packages/schemas/src/legacy-types.ts#L32)

Represents a message override, typically for the Prompt. Uses a stringId which can
first be checked in the board specific i18n, then falling back to the overall i18n
if necessary.

## Properties

### helperTextId?

> `optional` **helperTextId**: `string`

Defined in: [legacy-types.ts:36](https://github.com/alexqguo/drinking-board-game-v3/blob/fc5adf9b53e666003d4a7f6c500cdc49fb9dbd39/packages/schemas/src/legacy-types.ts#L36)

---

### stringArgs?

> `optional` **stringArgs**: `object`

Defined in: [legacy-types.ts:35](https://github.com/alexqguo/drinking-board-game-v3/blob/fc5adf9b53e666003d4a7f6c500cdc49fb9dbd39/packages/schemas/src/legacy-types.ts#L35)

#### Index Signature

\[`key`: `string`\]: `any`

---

### stringId

> **stringId**: `string`

Defined in: [legacy-types.ts:33](https://github.com/alexqguo/drinking-board-game-v3/blob/fc5adf9b53e666003d4a7f6c500cdc49fb9dbd39/packages/schemas/src/legacy-types.ts#L33)
