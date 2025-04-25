[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [index](../README.md) / GameExtensionInfo

# Interface: GameExtensionInfo

Defined in: [boards/boards.types.ts:15](https://github.com/alexqguo/drinking-board-game-v3/blob/c54738830b911cea80ee4f6fef46ab8be3a3f8a1/packages/engine/src/boards/boards.types.ts#L15)

## Properties

### actions?

> `optional` **actions**: `object`

Defined in: [boards/boards.types.ts:17](https://github.com/alexqguo/drinking-board-game-v3/blob/c54738830b911cea80ee4f6fef46ab8be3a3f8a1/packages/engine/src/boards/boards.types.ts#L17)

#### Index Signature

\[`key`: `string`\]: [`ActionHandlerFactory`](../../actions/type-aliases/ActionHandlerFactory.md)\<`any`\>

***

### gameState?

> `optional` **gameState**: `object`

Defined in: [boards/boards.types.ts:16](https://github.com/alexqguo/drinking-board-game-v3/blob/c54738830b911cea80ee4f6fef46ab8be3a3f8a1/packages/engine/src/boards/boards.types.ts#L16)

#### Index Signature

\[`key`: `string`\]: [`GameStateHandlerFactory`](../../gamestate/type-aliases/GameStateHandlerFactory.md)
