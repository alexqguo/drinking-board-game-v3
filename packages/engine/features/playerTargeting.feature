Feature: Player targeting
  # Applies a basic grant to each player target type and ensure it was applied

  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2,P3,P4" and board "testing-board"
    And the game is started
    And I remember the game state

  Scenario: PlayerTargetType: self
    When the current player rolls to land on ruleId "selfPlayerTargetGrantRuleId"
    Then "P1" should have the item "test_item_1"
    And "P2" game state data should be unchanged
    And "P3" game state data should be unchanged
    And "P4" game state data should be unchanged

  Scenario: PlayerTargetType: custom

  Scenario: PlayerTargetType: allOthers
    When the current player rolls to land on ruleId "allOthersPlayerTargetGrantRuleId"
    Then "P1" game state data should be unchanged except for location and visited tiles
    And "P2" should have the item "test_item_1"
    And "P3" should have the item "test_item_1"
    And "P4" should have the item "test_item_1"

  Scenario: PlayerTargetType: all
    When the current player rolls to land on ruleId "allPlayerTargetGrantRuleId"
    Then "P1" should have the item "test_item_1"
    And "P2" should have the item "test_item_1"
    And "P3" should have the item "test_item_1"
    And "P4" should have the item "test_item_1"

  Scenario: PlayerTargetType: closestAhead
  Scenario: PlayerTargetType: zone
  Scenario: PlayerTargetType: range