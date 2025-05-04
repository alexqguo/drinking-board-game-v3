Feature: Creating a game
  As a player
  I want to create a new game with players and a board
  So that I can start playing with my friends

  Background:
    Given the game engine is initialized

  Scenario: Create a game with two players
    When the game is created with players "P1,P2" and board "pokemon-gen1"
    Then the game should have 2 players
    And the game state should be "NotStarted"
    And the player "P1" should be in position 0
    And the player "P2" should be in position 0
    And each player should have empty available actions

  Scenario: Create a game with multiple players
    When the game is created with players "P1,P2,P3,P4" and board "pokemon-gen1"
    Then the game should have 4 players
    And the game state should be "NotStarted"
    And each player should have empty available actions

  Scenario: Create and start a game
    When the game is created with players "P1,P2" and board "pokemon-gen1"
    And the game is started
    Then the game state should be "GameStart"
    And the first player should be set as current player
    And the game prompt should exist for starter selection
