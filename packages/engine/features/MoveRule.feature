Feature: Move rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: tileIndex based moving
    When I remember the game state
    And the current player rolls to land on ruleId "moveRuleId_tileIndex"
    Then the prompt should reference ruleId "moveRuleId_tileIndex"
    And the current player should have a "promptClose" prompt action
    And "P1" should be on tile 10
    And "P2" game state data should be unchanged

  Scenario: diceRolls based moving
    When I remember the game state
    And the current player rolls to land on ruleId "moveRuleId_diceRolls"
    Then the prompt should reference ruleId "moveRuleId_diceRolls"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 1
    Then "P1" should be on tile 7
    And "P2" game state data should be unchanged

  Scenario: custom playerTarget (tileIndex based moving)
    When the current player rolls to land on ruleId "moveRuleId_customTargetTileIndex"
    Then the prompt should reference ruleId "moveRuleId_customTargetTileIndex"
    And the current player should have a "promptSelectPlayer" prompt action
    When the current player chooses player "P2"
    Then "P2" should be on tile 10

  Scenario: Invalid custom player target should be immediately closable
    When the current player rolls to land on ruleId "moveRuleId_invalidCustomTargetTileIndex"
    Then the current player should have a "promptClose" prompt action

  Scenario: swapping
    When I remember the game state
    And the current player rolls to land on ruleId "moveRuleId_swapping"
    Then the prompt should reference ruleId "moveRuleId_swapping"
    And the current player should have a "promptSelectPlayer" prompt action
    When the current player chooses player "P2"
    Then "P2" should be on tile 9
    And "P1" should be on tile 0
    And "P1" game state data should be unchanged except for location and visited tiles
    And "P2" game state data should be unchanged except for location and visited tiles

  Scenario: numSpaces
    When I remember the game state
    And the current player rolls to land on ruleId "moveRuleId_numSpaces"
    Then the prompt should reference ruleId "moveRuleId_numSpaces"
    # moveRuleId_numSpaces is tile 8 and specifies to move -2
    And "P1" should be on tile 6
    And "P2" game state data should be unchanged