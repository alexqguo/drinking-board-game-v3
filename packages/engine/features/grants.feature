Feature: Grants
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: Applying all effect grants!
    When I remember the game state
    And the current player rolls to land on ruleId "uberEffectsGrantRuleId"
    Then the prompt should reference ruleId "uberEffectsGrantRuleId"
    And "P2" game state data should be unchanged
    And "P1" should have the item "test_item_1"
    And "P1" should have 1 immediateTurns
    And "P1" should have 1 extraTurns
    And "P1" should have 1 anchors
    And "P1" should have 1 mandatorySkips
    And "P1" should have 11 as a customMandatoryTileIndex
    And "P1" should have a speed modifier of "+1" for 1 turns
    # TODO - roll augmentation

  Scenario: Metadata grant - reversing turn order
    When I remember the game state
    And the current player rolls to land on ruleId "metaGrantRuleId"
    Then the prompt should reference ruleId "metaGrantRuleId"
    And "P1" game state data should be unchanged except for location and visited tiles
    And "P2" game state data should be unchanged
    And the turnOrder should be -1


# item equal custom target