[**@repo/schemas**](../README.md)

***

[@repo/schemas](../globals.md) / Grant

# Type Alias: Grant

> **Grant**: `object`

Defined in: [legacy-types.ts:306](https://github.com/alexqguo/drinking-board-game-v3/blob/e685f3b5240058db25c494e5486105704e4feaf9/packages/schemas/src/legacy-types.ts#L306)

SCHEMA_EQUIVALENT: Replace with @repo/schemas

## Type declaration

### effects?

> `optional` **effects**: `{ [K in keyof PlayerEffects]?: K extends "anchors" ? BasicEffectGrant : K extends "extraTurns" ? BasicEffectGrant : K extends "immediateTurns" ? BasicEffectGrant : K extends "skippedTurns" ? BasicEffectGrant : K extends "mandatorySkips" ? BasicEffectGrant : K extends "customMandatoryTileIndex" ? BasicEffectGrant : K extends "rollAugmentation" ? BasicEffectGrant : K extends "speedModifier" ? { modifier: ...; numTurns: ... } : (...) extends (...) ? (...) : (...) }`

### metadata?

> `optional` **metadata**: `{ [K in keyof Pick<GameMetadata, "turnOrder">]?: K extends "turnOrder" ? BasicEffectGrant : never }`
