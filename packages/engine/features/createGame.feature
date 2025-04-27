Feature: Creating a game
  As a player
  I want to create a new game with players and a board
  So that I can start playing with my friends

  Background:
    Given the game engine is initialized

  Scenario: Create a game with two players
    When I create a game with players "Alice,Bob" and board "pokemon-gen1"
    Then the game should have 2 players
    And the game state should be "NotStarted"
    And the player "Alice" should be in position 0
    And the player "Bob" should be in position 0
    And each player should have empty available actions

  Scenario: Create a game with multiple players
    When I create a game with players "Alice,Bob,Charlie,David" and board "pokemon-gen1"
    Then the game should have 4 players
    And the game state should be "NotStarted"
    And each player should have empty available actions

  Scenario: Create and start a game
    When I create a game with players "Alice,Bob" and board "pokemon-gen1"
    And I start the game
    Then the game state should be "GameStart"
    And the first player should be set as current player
    And the game prompt should exist for starter selection
