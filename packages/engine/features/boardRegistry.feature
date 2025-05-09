Feature: Board registry

  Scenario: Registering an board with no metadata should error
    Then registering a board with no metadata should error

  Scenario: Registering a board with mismatched IDs should error
    Then registering a board with mismatched IDs should error

  Scenario: Should tell if it has a board or not
    Then the registry should know if a board exists

  Scenario: Should list all available boards
    Then the registry should list all available boards