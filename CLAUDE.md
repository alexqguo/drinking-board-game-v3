# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a monorepo for a drinking board game system built with TypeScript. The project consists of multiple apps and packages managed with Turbo and npm workspaces.

## Common Development Commands

### Primary Commands

- `npm run dev` - Start all development servers concurrently (webapp, cli, engine, etc.)
  - **Important**: If you make changes to the engine package, the cloud function will not pick up the changes until the server is restarted
- `npm run build` - Build all packages and apps
- `npm run test` - Run all tests across the monorepo
- `npm run lint` - Lint all code
- `npm run check-types` - Type check all TypeScript code
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing Commands

- `npm run test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- Engine tests use Cucumber with BDD features in `packages/engine/features/`
- Do NOT suggest unit tests for the engine - the engine uses BDD/Cucumber exclusively
- Step definitions are in `packages/engine/features/step_definitions/`
- Feature files use Gherkin syntax and test complete game scenarios

### CLI Usage

- `npm run cli` - Run the CLI tool (after building)
- CLI is built from `apps/cli/` and outputs to `dist/`

### Deployment

- `npm run deploy` - Deploy apps (webapp to Netlify, cloud functions to Firebase)
- `npm run preview` - Preview webapp build locally

### Important NPM Usage Rule

ALWAYS run npm commands from the top-level turborepo directory. Never cd into subpackages to run npm commands.

**NEVER** use `cd packages/[package-name] && npm run [command]` - this breaks the turborepo build system and can cause dependency issues. Always use `npm run [command]` from the root directory instead.

## Architecture

### Three-Layer Architecture

- **Application Layer**: Presents game data to users, manages interactions (apps/webapp, apps/cli)
- **Data Access Layer**: Responds to requests, executes engine logic, persists state (apps/cloudfunctions)
- **Engine Layer**: Core game logic only, acts as pure library (packages/engine)

### Monorepo Structure

- `apps/` - Applications (webapp, cli, cloudfunctions, docsite)
- `packages/` - Shared packages (engine, schemas, react-ui, i18n, etc.)
- `boards/` - Game board definitions (pokemon-gen1, pokemon-gen2, zelda, etc.)

### Package Compilation Status

[c] = compiled, [u] = uncompiled

#### Apps

- [c] `apps/webapp` - React web application using Vite
- [c] `apps/cli` - Command-line interface for the game
- [c] `apps/cloudfunctions` - Firebase Cloud Functions
- [c] `apps/docsite` - Documentation site using Docusaurus

#### Packages

- [c] `packages/engine` - Core game engine logic
- [c] `packages/enums` - Shared enumerations (deprecation path)
- [u] `packages/eslint-config` - Shared ESLint configurations
- [c] `packages/i18n` - Internationalization utilities
- [u] `packages/react-ui` - Shared React components
- [c] `packages/schemas` - Schema definitions and validation
- [u] `packages/typescript-config` - TypeScript configuration

### Core Components

#### Engine (`packages/engine/`)

- Game logic engine with state machine architecture
- Uses action-based system with request handlers
- Key constructs:
  - **GameState**: Game phases (GameStart → RollStart → MoveCalculate → MoveEnd → RuleTrigger → etc.)
  - **Actions**: Player-triggered events that modify game state
  - **Rules**: Predefined mechanisms to modify game state based on conditions
  - **Grants**: Basic effects that can be expressed in JSON schema
  - **Context**: Centralized state manager and utility provider
  - **Prompts**: Request input/decisions from players
- Entry point: `requestHandler.ts`

#### Board Registry & Dependency Injection

The Board Registry manages game boards in the engine:

- **Registration**: `boardRegistry.register(boardId, boardModule)`
- **Retrieval**: `getBoard(boardId)` or `boardRegistry.getBoard(boardId)`
- **BoardModule** contains: metadata, board schema, extension info
- **BoardHelper** acts as consumer, processing board data for efficient lookups

#### Schemas (`packages/schemas/`)

- TypeScript types and JSON schemas for game definitions
- Board schemas, rule schemas, and validation utilities
- Auto-generated documentation in `docs-generated/`

#### React UI (`packages/react-ui/`)

- Shared React components with no third-party dependencies except React
- Defines UI structure but not implementation
- Uses context pattern for dependency injection:
  - `GameContext`: Game state management (implementation in webapp)
  - `UIEnvironmentContext`: UI component interfaces (implementation in webapp with ChakraUI)
- Animation system with `AnimationContext` and hint-based architecture

#### Webapp (`apps/webapp/`)

- Vite-based React app with Firebase integration
- Implements UI component interfaces from react-ui using Chakra UI
- Routes: HomePage, JoinPage, GamePage

### Key Patterns

#### Anti-Corruption Layers

- `packages/engine` has no data storage dependencies - pure game logic
- `packages/react-ui` defines UI structure but no implementations
- High abstraction levels reduce third-party dependency coupling

#### Firebase Integration

- Cloud Functions use transactions to prevent race conditions
- Real-time database structure: `/games/{gameId}/game` and `/games/{gameId}/messages`

#### Animation System

The webapp implements a robust animation system for smooth visual transitions:

- **Animation Context System**: `AnimationProvider` acts as the central registry for animation handlers
- **Animation Hints**: Driven by `AnimationHint` objects generated by the Engine with `type` and `payload`
- **Registration Pattern**: Components register via `useAnimationHandler` hook:
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
- **Animation Flow**: Engine generates hints → GameContext requests playAnimations → AnimationContext processes sequentially
- **Best Practices**: Always wrap in promises, register for specific hint types, check player IDs in handlers

#### Import Conventions

- Check `exports` in package.json before importing from subpackages
- Use `"@repo/package-name": "*"` format for internal dependencies
- No `workspace:` prefixes

## Development Rules

### TypeScript & Code Quality

- Use TypeScript strictly with explicit typing for function parameters
- Prefer interfaces over types for object definitions
- Use enums for fixed value sets
- Export types and interfaces when shared across packages
- Always check for TypeScript/linting errors before presenting solutions

### Require Confirmation Before:

- Modifying any `package.json` files
- Adding dependencies
- Changing configuration files (vite, eslint, typescript)

### Testing Strategy

- Engine uses Cucumber for BDD testing with comprehensive feature coverage
- Feature files in `packages/engine/features/` written in Gherkin syntax
- Step definitions in `packages/engine/features/step_definitions/`
- Tests focus on complete game scenarios and user behaviors, not individual functions
- Coverage reports generated in `packages/engine/coverage/`
- When adding new engine functionality, write BDD features that test the complete user journey
- **Do NOT suggest Vitest tests** - Vitest is present but unused, engine uses BDD/Cucumber exclusively

#### Puppeteer Browser Testing

**⚠️ Use Sparingly** - Puppeteer testing consumes significant tokens/requests and should be used judiciously.

The webapp includes centralized test IDs (in `packages/react-ui/src/constants/testIds.ts`) for browser automation testing:

- **Primary Use Cases**: Test specific features, individual game spaces, or UI components in isolation
- **Token Conservation**: Use the `__dbg_movePlayer` function to advance players to specific board positions rather than playing through entire games
- **Test ID Coverage**: Core gameplay actions have test IDs like `__dbg_turn_turnRoll_btn`, `__dbg_prompt_close_btn`
- **Best Practices**:
  - Test targeted functionality, not full gameplay sessions
  - Use `__dbg_movePlayer` to position players for specific test scenarios
  - Focus on testing UI interactions and state transitions
  - Validate specific game mechanics rather than general progression

**Available Test ID Categories**:

- Game creation: board selection, player management, form submission
- Role selection: host vs player role selection modal
- Turn actions: roll buttons, skip actions (dynamic based on action type)
- Prompt actions: close buttons, selection confirmations (dynamic based on prompt type)
- Utility: support/donation widgets

### Board Development

To create a new board:

1. Copy `packages/__sample_copyme/` as template
2. Define board schema in `schema.json`
3. Implement board module with metadata and extensions
4. Register with `boardRegistry.register()` in consuming application

### UI Component Development

- New UI components go in `packages/react-ui`
- If new UI library component needed, define interface in `UIEnvironmentContext`
- Implement in application layer (e.g., ChakraEnvironmentProvider)
- Use `const ui = useUI()` pattern: `<ui.Button>Click me!</ui.Button>`
- There should be exceedingly few UI components in the webapp layer, most should be in `react-ui`
- When in doubt, follow existing patterns in `packages/react-ui`

### Cloud Function Changes

- Use transactions for game state updates
- Include proper error handling
- Follow existing logging patterns

## GitHub Project Management

This repository uses GitHub Projects for task tracking and project management.

### Project Details

- **Project ID**: 1 (owner: alexqguo)
- **Name**: DBGv3 Kanban Board
- **URL**: https://github.com/users/alexqguo/projects/1
- **Type**: Kanban board with Status, Priority, and Size fields

### Common GitHub Commands

#### View Project Details

```bash
gh project view 1 --owner alexqguo
```

#### View Available Labels

```bash
gh label list
```

#### View Issues with Details

When asked about issue details, always include comments:

```bash
gh issue view [issue_number] --comments
```

#### Create Issues and Add to Project

**Important**: Prefix all issue titles created by Claude with `[Claude]` to identify AI-generated issues.

```bash
# Create issue and add directly to project
gh issue create --title "[Claude] Issue Title" --body "Issue description" --project "DBGv3 Kanban Board"

# Create issue with labels and project
gh issue create \
  --title "[Claude] Issue Title" \
  --body "Issue description" \
  --project "DBGv3 Kanban Board" \
  --label "webapp,enhancement" \
  --assignee "@me"
```

#### Available Labels

Common labels for this project:

- `webapp` - Webapp related tasks
- `engine` - Task for the core engine
- `enhancement` - New feature or request
- `bug` - Something isn't working
- `documentation` - Improvements or additions to documentation
- `techdebt` - Tech debt items
- `i18n` - Translations related
- `validation` - Validation related tasks
- Board-specific: `board:gen1`, `board:gen2`, `board:gen3`, `board:zelda`

#### Project Authorization

Note: Adding issues to projects requires authorization with the `project` scope:

```bash
gh auth refresh -s project
```

### Project Organization

The project tracks development milestones:

- ✅ **Alpha** (Critical priority) - May 2025
- **Beta** (High priority) - June 2025
- **GA** (Medium priority) - August 2025

When creating issues, the project allows setting Priority and Size fields through the web interface after creation.

## Common Tasks

### Adding New Game Actions

1. Define action type in `packages/enums`
2. Create action handler in `packages/engine/src/actions`
3. Register handler in action handler factory map
4. Implement client-side handling in webapp/cli

### Best Practices

1. Use TypeScript strictly
2. Follow ESLint configurations
3. Keep components focused and composable
4. Use proper error handling patterns
5. Document complex logic
6. Follow existing file organization patterns

## More info

Refer to the old `/.github/copilot-instructions.md` file for additional details
