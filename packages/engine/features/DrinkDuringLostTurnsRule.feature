Feature: Drink during lost turns rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: base case
    When I remember the game state
    And the current player rolls to land on ruleId "drinkDuringLostTurnsRuleId"
    Then the prompt should reference ruleId "drinkDuringLostTurnsRuleId"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 2
    And the current player prompt rolls a 2
    Then the current player should have a "promptClose" prompt action
    And "P1" should have 2 missed turns with no other effect changes