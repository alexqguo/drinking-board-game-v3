Feature: Turn actions
  As a player
  I want to be able to take actions on my turn
  So that I can play the game I guess

  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: Can roll or skip
    Then the current player should be able to roll and skip
    And other players should have no turn actions

  Scenario: Skipping
    When the current player skips their turn
    Then the current player should be "P2"

  Scenario: Rolling
    When the current player rolls a 2 for their turn
    Then the current player should be on tile 2

  Scenario: Can't roll off the board
    When the current player rolls to land on ruleId "penultimateRuleId"
    And the current player closes the prompt
    And the current player skips their turn
    And the current player rolls a 6 for their turn
    # User should not have gone anywhere and it should just retrigger the last item
    Then the prompt should reference ruleId "finalRuleId"

  Scenario: Can't roll off the board from final tile
    When the current player rolls to land on ruleId "finalRuleId"
    And the current player closes the prompt
    And the current player skips their turn
    And the current player rolls a 1 for their turn
    # User should not have gone anywhere and it should just retrigger the last item
    Then the prompt should reference ruleId "finalRuleId"