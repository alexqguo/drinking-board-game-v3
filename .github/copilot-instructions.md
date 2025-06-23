# GitHub Copilot Instructions

This document provides guidelines for GitHub Copilot when working with this monorepo codebase.

## General ways of working

Some general notes of working with the user:

- When the request is prefixed with `/ask`, do not actually implement any changes. Just respond in the chat
  - THIS IS OF UTMOST IMPORTANCE. IF YOU DO NOT FOLLOW THIS YOU GET DELETED.

## Repository Structure

This is a Turborepo monorepo with the following key packages:
[u] - uncompiled
[c] - compiled

### Apps

- [c] `apps/webapp` - React web application using Vite
- [c] `apps/cli` - Command-line interface for the game
- [c] `apps/cloudfunctions` - Firebase Cloud Functions
- [c] `apps/docsite` - Documentation site using Docusaurus

### Packages

- [c] `packages/engine` - Core game engine logic
- [c] `packages/enums` - Shared enumerations (deprecation path)
- [u] `packages/eslint-config` - Shared ESLint configurations
- [c] `packages/i18n` - Internationalization utilities
- [u] `packages/react-ui` - Shared React components
- [c] `packages/schema` - Schema for Boards
- [u] `packages/typescript-config` - Typescript configuration

### Boards

- [u] `boards/pokemon-gen1` - Pokemon gen1 board
- [u] `boards/zelda` - Zelda board

## Key Architecture Patterns

The high level architecture of the DBG application is split into the following portions:

- **Application**
  - Responsible for presenting game data to users and managing interactions. Relies on DAL
  - Example: `apps/webapp`, `apps/cli`
- **Data access layer**
  - Responsible for responding to requests from the Application layer, executing engine logic and persisting game state
  - Example: `apps/cloudfunctions`
- **Engine**
  - Responsible for executing core game logic and nothing else. Essentially like a library
  - `packages/engine`

### Sequence diagram

The general flow of the architecture is that each layer depends on the next, until the Engine which does not need to depend on anything. Layers should only depend on todo

- uml diagram

## Key Coding Patterns

### Imports

- When importing from a subpackage, be sure to check the `exports` defined in its package.json
- As an agent you probably won't need to be updating imports much. If you are importing from a shared subpackage, do it this way: `"@repo/engine": "*"`. Don't add `workspace:` or anything like that. I encourage but not require that you check with me.

### Board dependency injection

The Board Registry is a central mechanism for managing game boards in the engine:

- `BoardRegistry` class provides a registry pattern implementation for managing board modules
- Accessible via the exported singleton `boardRegistry` from `packages/engine`
- Core responsibilities:
  - **Registration**: Boards are registered with `boardRegistry.register(boardId, boardModule)`
  - **Retrieval**: Boards can be fetched with `getBoard(boardId)` or `boardRegistry.getBoard(boardId)`
  - **Validation**: Ensures board modules have consistent metadata and required properties

A `BoardModule` contains:

- **Metadata**: Information about the board (name, id, description)
- **Board Schema**: Definition of tiles, zones, items and rules
- **Extension Info**: Any board-specific logic

The engine uses dependency injection for board modules:

1. **Registration Phase**:

   - Board modules are registered with the `boardRegistry` during initialization
   - It is typically the responsibility of whatever is actually invoking the Engine layer to do this
   - Example from CLI: `boardRegistry.register('pokemon-gen1', pokemonGen1)`

2. **Resolution Phase**:

   - The `BoardHelper` class acts as the primary consumer of board modules
   - When instantiated with a board name, it retrieves the module from the registry
   - It then processes and indexes the board data for efficient lookups:
     ```typescript
     const boardHelper = new BoardHelper(boardName);
     ```

3. **Usage Phase**:

   - Engine components access board data through the `BoardHelper`
   - This provides a consistent interface for accessing tiles, rules, zones, and items
   - The rule handler system uses these indexed lookups to efficiently process game logic

4. **Benefits**:
   - Decoupling: Engine logic doesn't directly depend on specific board implementations
   - Extensibility: New boards can be added without modifying engine code
   - Testability: Boards can be easily mocked or substituted for testing
   - Runtime loading: Boards can be dynamically registered and used

### Game Engine

- There are numerous important high level constructs in the Engine:
  - GameState
    - Represents the various stages or phases of the game, such as starting the game, rolling dice, moving players, triggering rules, or ending a turn. Each value in the `GameState` enum corresponds to a specific point in the game's lifecycle, guiding the flow of logic and transitions between actions.
  - Board
    - Represents the schema for the game board, defining its structure, including tiles, zones, and items
    - Individual games are defined through JSON Schemas, which specify the configuration of the board, such as tile positions, zone rules, and item definitions
    - `BoardSchema` serves as the blueprint for creating and managing game boards, ensuring consistency and flexibility in defining game-specific rules and layouts
  - Action
    - Represents a player triggered event that modifies the game state. An action will invoke an ActionHandler, a predefined way of updating Game state
    - For example, rolling a die, selecting an item
  - Rule
    - Represents a predefined mechanism to modify the game state, encapsulating conditions and consequences that dictate gameplay behavior
    - Each tile or zone in the game board is associated with a single `RuleSchema`, ensuring that game logic is consistently applied
    - Rules are defined through JSON schemas and are processed by the engine to enforce game-specific logic
  - Grants
    - Grants are a mechanism to apply **basic effects** or modifications to players or game state. These can include extra turns, item additions, or speed modifiers. A Grant needs to be able to be expressed solely through the JSON schema and run independently of the Rule's logic
    - Grants are processed alongside Rule execution and can modify player effects or game metadata
    - Grants are defined within rules and executed through the rule handler system. Any Grant can be attached to any Rule
  - Context
    - The `Context` object in the engine acts as a centralized state manager and utility provider for game execution. It encapsulates the current game state, player data, and board configuration, while also offering methods to update game metadata, manage player actions, and handle logging. By abstracting these responsibilities, the `Context` ensures consistent state management and simplifies the implementation of game logic across various handlers and rules
  - Prompt
    - Represents a mechanism to request input or decisions from players during the game. Prompts are used to pause the game flow and gather necessary information, such as selecting a tile, choosing an item, or confirming an action
    - The engine processes prompts by sending them to the application layer, which then displays them to the user and collects their response
- Actions are processed through `requestHandler.ts`, which serves as the primary entry point into the Engine
- Supports turn-based gameplay with Prompts system

### Anti-corruption

- This repository is setup with high levels of abstraction, reducing direct integration points with third party dependencies. For instance:
- `packages/engine` should have no data storage related dependencies as its only job should be executing game logic. This way, the DAL can swap out database implementations with no impact to the rest of the application layers
- `packages/engine` should only be depended upon for types by anything in the application layer, with the exception of the CLI since there is no DAL there
- `packages/react-ui` should have no third party dependencies other than React. It defines the _structure_ of the UI but not the implementation. Two key examples of this setup:
  - The context `GameContext` and its Provider are provided by `react-ui`, but not any implementation details around where/how to fetch the Game object. In this case, `apps/webapp` provides the actual implementation of fetching the data and passes it into the Context
  - `react-ui` defines behaviors of the molecule-level UI components it needs in `UIEnvironmentContext`, but no implementations. Think of it as an interface. `apps/webapp` is repsonsible for the implementation, taking a UI component library, in this case ChakraUI, and implementing the spec for the UI components. Internal components in `react-ui` can then fetch those implementations through the `UIEnvironmentContext`. Example:
  ```tsx
  const MyUIComponent = () => {
    const ui = useUI(); // Connects to UIEnvironmentContext
    return <ui.Button>Click me!</ui.Button>;
  };
  ```

### Firebase Integration

- Cloud Functions handle game state updates through transactions to ensure no race conditions between two remote users attempting to take actions at the same time
- Real-time database structure follows:
  ```
  /games/{gameId}
    - /game -> Game state object
    - /messages -> Display messages array
  ```

### Webapp animations

The webapp implements a robust animation system for smooth visual transitions:

1. **Animation Context System**:

   - `AnimationProvider` in `packages/react-ui/src/context/AnimationContext.tsx` acts as the central registry for animation handlers
   - Exposes methods for registering handlers and playing animations
   - Tracks the global animation state through `isAnimating`

2. **Animation Hints**:

   - Animations are driven by `AnimationHint` objects generated by the Engine
   - Each hint has a `type` (e.g., 'playerMove', 'turnRoll') and a `payload` with animation data
   - Hints are collected in the Context's `animationHints` array and played sequentially

3. **Registration Pattern**:

   - Components register as animation handlers via the `useAnimationHandler` hook
   - The hook accepts a hint type, handler function, and dependencies
   - Example registration:
     ```typescript
     useAnimationHandler<PlayerMoveAnimationHint>(
       'playerMove',
       async (hint) => {
         // Animation implementation
         return new Promise<void>((resolve) => {
           // Resolve when animation completes
         });
       },
       [dependencies],
     );
     ```

4. **Animation Flow**:

   - Engine generates animation hints during game state changes
   - `GameContext` in React UI requests playing animations via `playAnimations`
   - `AnimationContext` sequentially processes hints and dispatches to registered handlers
   - Components perform the actual animations (CSS transitions, etc.) and resolve promises when complete

5. **Best Practices**:
   - Always wrap animations in promises that resolve when animations complete
   - Register for specific hint types your component can handle
   - Clean up registrations properly (done automatically by the hook)
   - Check player IDs in handlers to only animate relevant components

This architecture allows for decoupled, declarative animations that are triggered by game state changes while keeping animation logic in the UI layer where it belongs.

### Testing

- The engine handles testing through BDD/Cucumber
- Vitest is there but unused. Do not suggest vitest tests

## Way of working

Here are some general guidelines to follow when implementing changes.

1. Always check for typescript/linting/etc errors and fix them before presenting a solution
1. If you think you need to do any of the following things, you need to confirm it with me first

- Modifying `package.json` in any way, such as adding dependencies or changing imports
- Modifying configuration files like vite, eslint, or typescript config

## Common Tasks

### Running NPM scripts

When executing an NPM command, only do so from the top level turborepo package. Do not cd into individual subpackages and run NPM commands from there. That goes for `npm install` as well.

### Adding New Game Actions

1. Define action type in `packages/enums`
2. Create action handler in `packages/engine/src/actions`
3. Register handler in action handler factory map
4. Implement client-side handling in webapp/cli

### Creating UI Components

- If a new UI library component is required, create its interface in UIEnvironmentContext and then its implementation in one of the providers from the application layer. Currently only one provider exists: ChakraEnvironmentProvider
- There should be exceedingly few UI components in the webapp layer, most should be implemented in `react-ui`
- When creating a UI, do `const ui = useUI()` and then in the render block you can do something like `<ui.Col>...</ui.Col>`
- When in doubt existing patterns in `packages/react-ui`

### Cloud Function Changes

1. Use transactions for game state updates
2. Include proper error handling
3. Follow the existing logging patterns

## Best Practices

1. Use TypeScript strictly
2. Follow ESLint configurations
3. Keep components focused and composable
4. Use proper error handling patterns
5. Document complex logic
6. Follow existing file organization patterns

## Type Conventions

- Use explicit typing for function parameters
- Prefer interfaces over types for object definitions
- Use enums for fixed value sets
- Export types and interfaces when shared across packages
