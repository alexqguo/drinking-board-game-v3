Feature: zones
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: Passive zones should update on the player
    When I remember the game state
    # Roll onto the zone
    And the current player rolls to land on ruleId "passiveZoneRuleId"
    Then the prompt should reference ruleId "passiveZoneRuleId"
    And "P1" should be in zoneId "test_zone_passive"
    And "P2" game state data should be unchanged
    # Skip next player turn
    When the current player closes the prompt
    And the current player skips their turn
    # P1's turn again
    And the current player rolls to land on ruleId "displayRuleId"
    Then "P1" should not be in a zone
    And "P1" game state data should be unchanged except for location and visited tiles

  Scenario: Active zones
    When I remember the game state
    And the current player rolls to land on ruleId "activeZoneRuleId"
    And the current player closes the prompt
    # P2's turn
    And the current player skips their turn
    # Back to P1
    Then the current player should be "P1"
    And the prompt should reference ruleId "test_zone_rule_active"
    When the current player closes the prompt
    Then the current player should be "P1"
    And the game state should be "RollStart"

  # todo- common zone leader for zelda