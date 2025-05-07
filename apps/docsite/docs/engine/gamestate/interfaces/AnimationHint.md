[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / AnimationHint

# Interface: AnimationHint

Defined in: [gamestate/gamestate.types.ts:15](https://github.com/alexqguo/drinking-board-game-v3/blob/d78d6b4d276fd59e889404302f25e63ec2346110/packages/engine/src/gamestate/gamestate.types.ts#L15)

## Extended by

- [`PlayerMoveAnimationHint`](PlayerMoveAnimationHint.md)
- [`TurnRollAnimationHint`](TurnRollAnimationHint.md)
- [`TurnStartAnimationHint`](TurnStartAnimationHint.md)

## Properties

### payload

> **payload**: `unknown`

Defined in: [gamestate/gamestate.types.ts:17](https://github.com/alexqguo/drinking-board-game-v3/blob/d78d6b4d276fd59e889404302f25e63ec2346110/packages/engine/src/gamestate/gamestate.types.ts#L17)

***

### type

> **type**: `"playerMove"` \| `"turnRoll"` \| `"turnStart"` \| `"unsupported"`

Defined in: [gamestate/gamestate.types.ts:16](https://github.com/alexqguo/drinking-board-game-v3/blob/d78d6b4d276fd59e889404302f25e63ec2346110/packages/engine/src/gamestate/gamestate.types.ts#L16)
