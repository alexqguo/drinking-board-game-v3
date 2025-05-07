Feature: Item based rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: rule based on having an item
    When "P1" has the item "test_item"
    And the current player rolls to land on ruleId "itemBasedRuleId"
    Then the prompt should reference follow up ruleId "itemBasedRuleId_has"

  Scenario: rule based on not having an item
    When the current player rolls to land on ruleId "itemBasedRuleId"
    Then the prompt should reference follow up ruleId "itemBasedRuleId_lacks"