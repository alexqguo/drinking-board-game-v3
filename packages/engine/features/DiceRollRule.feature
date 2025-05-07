Feature: Dice roll rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: no outcomes
    When I remember the game state
    And the current player rolls to land on ruleId "diceRollRuleId_noOutcomes"
    Then the prompt should reference ruleId "diceRollRuleId_noOutcomes"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 3
    Then the current player should have a "promptClose" prompt action
    And "P1" game state data should be unchanged except for location and visited tiles
    And "P2" game state data should be unchanged

  Scenario: basic roll based outcome

  Scenario: cumulative roll based outcome

  Scenario: all match roll based outcome