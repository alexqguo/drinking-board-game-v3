Feature: Display rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: Landing on a DisplayRule
    When the current player rolls to land on ruleId "displayRuleId"
    Then the prompt should reference ruleId "displayRuleId"
    And the current player should be able to close the prompt