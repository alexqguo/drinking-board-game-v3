Feature: mandatory tiles
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: Should stop at once mandatory spaces only once
    # Place P1 on the tile before the always mandatory tile
    When the current player rolls to land on ruleId "preOnceMandatoryRuleId"
    And the current player closes the prompt
    # Skip P2's turn to get back to P1
    And the current player skips their turn
    Then the current player should be "P1"
    And the current player should be on tile 29
    When the current player rolls a 2 for their turn
    Then the current player should be on tile 30
    And the prompt should reference ruleId "onceMandatoryRuleId"
    When the current player closes the prompt
    # Skip P2
    Then the current player should be "P2"
    When the current player skips their turn
    # Move P1 back before the once mandatory spot so they can try again
    And the current player rolls to land on ruleId "preOnceMandatoryRuleId"
    And the current player closes the prompt
    # Skip P2 once more
    Then the current player should be "P2"
    When the current player skips their turn
    # Finally, P1 should be able to pass the once mandatory space
    Then the current player should be on tile 29
    When the current player rolls a 2 for their turn
    Then the current player should be on tile 31
    And the prompt should reference ruleId "postOnceMandatoryRuleId"

  Scenario: Should always stop at always mandatory tiles
    # Place P1 on the tile before the always mandatory tile
    When the current player rolls to land on ruleId "preAlwaysMandatoryRuleId"
    And the current player closes the prompt
    # Skip P2's turn to get back to P1
    And the current player skips their turn
    Then the current player should be "P1"
    And the current player should be on tile 27
    When the current player rolls a 6 for their turn
    # P1 should only move one space since 28 is always mandatory
    Then the current player should be on tile 28
    And the prompt should reference ruleId "alwaysMandatoryRuleId"
    # Finish P1's turn and skip P2 again
    When the current player closes the prompt
    And the current player skips their turn
    # Move P1 back and try again
    Then the current player should be "P1"
    When the current player rolls to land on ruleId "preAlwaysMandatoryRuleId"
    And the current player closes the prompt
    # Skip P2's turn to get back to P1
    And the current player skips their turn
    Then the current player should be "P1"
    And the current player should be on tile 27
    When the current player rolls a 6 for their turn
    # Once again, P1 should end on 28
    Then the current player should be on tile 28
    And the prompt should reference ruleId "alwaysMandatoryRuleId"

# TODO - anchors, custom mandatory index