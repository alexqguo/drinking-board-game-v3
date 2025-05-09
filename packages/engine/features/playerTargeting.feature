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
    When the current player rolls to land on ruleId "customPlayerTargetGrantRuleId"
    Then the current player should have a "promptGrantSelectPlayer" prompt action
    And the player options should include "P2,P3,P4"
    When the current player selects custom option "uuid-for-P2"
    Then "P2" should have the item "test_item_1"
    And "P1" game state data should be unchanged except for location and visited tiles
    And "P3" game state data should be unchanged
    And "P4" game state data should be unchanged

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

  Scenario: PlayerTargetType: zone
    # P1 goes into a zone, P2 lands on a zone target which gives P1 an item
    When the current player rolls to land on ruleId "passiveZoneRuleId"
    And the current player closes the prompt
    And the current player rolls to land on ruleId "zonePlayerTargetGrantRuleId"
    Then "P1" should have the item "test_item_1"
    And "P2" game state data should be unchanged except for location and visited tiles
    And "P3" game state data should be unchanged
    And "P4" game state data should be unchanged

  Scenario: PlayerTargetType: closestAhead
    When the current player rolls to land on ruleId "postClosestAheadPlayerTargetGrantRuleId"
    And the current player closes the prompt
    And the current player rolls to land on ruleId "closestAheadPlayerTargetGrantRuleId"
    Then "P1" should have the item "test_item_1"
    And "P2" game state data should be unchanged except for location and visited tiles
    And "P3" game state data should be unchanged
    And "P4" game state data should be unchanged

  Scenario: PlayerTargetType: range
    When the current player rolls a 1 for their turn
    And the current player closes the prompt
    And the current player rolls to land on ruleId "rangePlayerTargetGrantRuleId"
    Then "P1" should have the item "test_item_1"
    And "P2" game state data should be unchanged except for location and visited tiles
    And "P3" game state data should be unchanged
    And "P4" game state data should be unchanged
