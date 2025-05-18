# Technical Overview

Welcome to the Technical Overview of the Engine package. This section provides a high-level summary and direct links into the generated API documentation.

## Data Flow Diagram

The following diagram illustrates the typical sequence of events when a user performs an action in the game:

```mermaid
sequenceDiagram
    participant User
    participant AppLayer as Application Layer <br> (e.g., CLI or Webapp)
    participant DAL as Data Access Layer <br> (e.g., Cloud function)
    participant DB as Database <br> (e.g., Firebase or in-memory)
    participant GameEngine as Engine

    User->>+AppLayer: Initiates game action (e.g., roll dice for turn)
    AppLayer->>+DAL: Request action (e.g., /gameRequest with action details)
    Note over DAL,DB: DAL loads current game state in a transaction
    DAL->>+DB: Load current game state for gameId
    DB-->>-DAL: Return current game state
    DAL->>+GameEngine: gameRequest(prevGame, action, actionArgs)
    GameEngine-->>-DAL: Return { game, animationHints }
    Note over DAL,DB: DAL persists the new game state

    DAL->>+DB: Save new game state
    DB-->>-DAL: Confirm persistence

    alt Basic integration
        DAL-->>AppLayer: Direct response { gameState }
    else Realtime integration
        DB-->>AppLayer: Realtime update { gameState }
        DAL-->>AppLayer: Response { success }
    end
    deactivate DAL
    AppLayer->>User: Update UI, play animations, show prompts
```
