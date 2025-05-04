Feature: Turn actions
  As a player
  I want to be able to take actions on my turn
  So that I can play the game I guess

  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "zelda"
    And the game is started

  Scenario: Can roll or skip
    Then the current player should be able to roll and skip
    And other players should have no turn actions

  Scenario: Skipping
    When the current player skips their turn
    Then the current player should be "P2"

  Scenario: Rolling
    When the current player rolls a 2
    Then the current player should be on tile 2