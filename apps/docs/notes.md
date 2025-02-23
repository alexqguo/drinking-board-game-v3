# notes
todo space for the doc site until it starts getting built

## structure of doc site
- `/tutorial` tutorial documentation
  - how to actually play the game
  - starting a game
  - joining a game
- `/technical` technical documentation
  - `/` Overall (not for any specific app/lib)
    - [Section] define high level layers of the app
      - engine: responsible for game logic
      - data repository/access layer - responsible for storing game state but not executing it
      - application layer - responsible for presenting game data to users and managing their interactions, relies on DAL
        - examples: webapp or texting based version
      - benefits of this approach compared to past versions
      - diagram for overall architecture, UML?
      - Describe the actual layer implementations at a high level (packages#engine, apps#CF, apps#webapp) and how they specifically fit those descriptions
    - [Section] Auth (does this really need a section)
      - authN is verified at DAL
        - confirm user is who they say they are
        - using firebase anon auth it sort of blends in both the app and dal, in theory there could be a completely separate Auth layer
      - authZ is handled by the engine
        - is the person actually allowed to do the thing they're trying to do
  - `/engine` Engine
    - [section] overall description and outline
      - essentially a stateless pure function, can be used in any application (currently does have one node dependency though), or like a state machine
      - UML flows
    - [section] important concepts
      - board
        - schema, how it's meant to interact with the rest of the engine
      - action
        - follows our handlers pattern
      - rule
        - (same structure as action)
        - there is an execute and postActionExecute for actions
      - gamestate
        - (same structure as action)
    - [section] validation
      - tbd. where and when validation occurs

