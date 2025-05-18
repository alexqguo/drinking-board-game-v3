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

  Scenario: Rolling after a speed modifier grant
    When the current player rolls to land on ruleId "speedModifierGrantRuleId"
    And the current player closes the prompt
    # Skip P2 to get back to P1
    And the current player skips their turn
    Then "P1" should be on tile 42
    And the current player should be "P1"
    When the current player rolls a 2 for their turn
    # 2 should be adjusted down to 1
    Then "P1" should be on tile 43

  Scenario: Prompt message after a skipped turn grant
    When the current player rolls to land on ruleId "skippedTurnGrantRuleId"
    And the current player closes the prompt
    # Skip P2 to get back to P1
    And the current player skips their turn
    # P1 should now have a skipped turn prompt
    Then the prompt should reference messageOverride "engine_lostTurns"

# item swap
# item equal custom target