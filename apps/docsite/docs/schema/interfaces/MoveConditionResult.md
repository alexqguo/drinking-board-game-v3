[**@repo/schemas**](../README.md)

---

[@repo/schemas](../README.md) / MoveConditionResult

# Interface: MoveConditionResult

Defined in: [legacy-types.ts:25](https://github.com/alexqguo/drinking-board-game-v3/blob/15932662279983c0f0b2a6fa59ef653227975f0d/packages/schemas/src/legacy-types.ts#L25)

Result of attempting to satisfy a move condition through dice rolling.

Used by the ApplyMoveConditionRule to determine what happens after a roll:

- canMove: true = All required successes achieved, player can move normally
- canMove: false + isPartialSuccess: true = This roll succeeded but more successes needed
- canMove: false + isPartialSuccess: false = This roll failed, apply consequences

## Properties

### canMove

> **canMove**: `boolean`

Defined in: [legacy-types.ts:27](https://github.com/alexqguo/drinking-board-game-v3/blob/15932662279983c0f0b2a6fa59ef653227975f0d/packages/schemas/src/legacy-types.ts#L27)

Whether the player has satisfied all requirements and can move

---

### isPartialSuccess?

> `optional` **isPartialSuccess**: `boolean`

Defined in: [legacy-types.ts:29](https://github.com/alexqguo/drinking-board-game-v3/blob/15932662279983c0f0b2a6fa59ef653227975f0d/packages/schemas/src/legacy-types.ts#L29)

True if this roll succeeded but more successes are still needed

---

### message

> **message**: [`MessageOverride`](MessageOverride.md)

Defined in: [legacy-types.ts:31](https://github.com/alexqguo/drinking-board-game-v3/blob/15932662279983c0f0b2a6fa59ef653227975f0d/packages/schemas/src/legacy-types.ts#L31)

Message to display to the player about the roll result
