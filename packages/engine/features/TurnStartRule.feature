Feature: Turn start rule functionality
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: Turn start rule executes at beginning of turn
    When I remember the game state
    And the current player rolls to land on ruleId "turnStartRuleId_basic"
    Then the prompt should reference ruleId "turnStartRuleId_basic"
    And the current player should have a "promptClose" prompt action
    When the current player closes the prompt
    Then "P1" should have turnStartRule for 1 turns
    # P2's turn
    When the current player skips their turn
    # Back to P1's turn - turnStartRule should trigger
    Then the current player should be "P1"
    And the prompt should reference ruleId "turnStartRuleId_basic_trigger"

  Scenario: Turn start rule decrements and expires
    When I remember the game state
    And the current player rolls to land on ruleId "turnStartRuleId_basic"
    And the current player closes the prompt
    Then "P1" should have turnStartRule for 1 turns
    # P2's turn
    When the current player skips their turn
    # P1's turn - first trigger (1 -> 0)
    Then the current player should be "P1"
    And the prompt should reference ruleId "turnStartRuleId_basic_trigger"
    When the current player closes the prompt
    Then "P1" should have no turnStartRule

  Scenario: Turn start rule with skip turn grant
    When I remember the game state
    And the current player rolls to land on ruleId "turnStartRuleId_skip"
    And the current player closes the prompt
    Then "P1" should have turnStartRule for 999 turns
    # P2's turn
    When the current player skips their turn
    # P1's turn - turnStartRule triggers and grants skip
    Then the current player should be "P1"
    And the prompt should reference ruleId "turnStartRuleId_skip_trigger"
    Then "P1" should have 1 skippedTurns

  Scenario: Turn start rule cancellation
    When I remember the game state
    And the current player rolls to land on ruleId "turnStartRuleId_cancel"
    And the current player closes the prompt
    Then "P1" should have turnStartRule for 999 turns
    # P2's turn
    When the current player skips their turn
    # P1's turn - turnStartRule triggers and cancels itself
    Then the current player should be "P1"
    And the prompt should reference ruleId "turnStartRuleId_cancel_trigger"
    When the current player closes the prompt
    Then "P1" should have no turnStartRule