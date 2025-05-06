Feature: Gen1 board
  As a player on the gen1 board
  I want it to actually work
  These descriptions are stupid

  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "pokemon-gen1"
    And the game is started

  Scenario: Starter selection
    When "P1" selects "starter_bulbasaur" as their gen1 starter
    And "P2" selects "starter_charmander" as their gen1 starter
    And the current player closes the prompt
    Then the game state should be "RollStart"
    And "P1" should have the item "starter_bulbasaur"
    And "P2" should have the item "starter_charmander"

  Scenario: Battles
    When "P1" selects "starter_bulbasaur" as their gen1 starter
    And "P2" selects "starter_charmander" as their gen1 starter
    And the current player closes the prompt
    # P1 -> Ratata
    And the current player rolls a 1
    And the current player closes the prompt
    # P2 -> Ratata
    And the current player rolls a 1
    Then the game state should be "Battle"
    And "P1" should have 1 battle roll actions
    And "P2" should have 2 battle roll actions
