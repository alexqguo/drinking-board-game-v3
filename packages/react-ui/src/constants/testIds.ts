/**
 * Centralized test IDs for UI components
 * All test IDs are prefixed with __dbg_ for easy identification
 */

export const testIds = {
  // CreateGameForm - Game creation form components
  boardSelectionField: '__dbg_board_selection_field', // Board selection radio field container
  boardOption: (boardId: string) => `__dbg_board_option_${boardId}`, // Individual board radio card
  playerNameInput: '__dbg_player_name_input', // Input field for adding player names
  addPlayerBtn: '__dbg_add_player_btn', // Button to add a new player to the list
  playerChip: (index: number) => `__dbg_player_chip_${index}`, // Player name chips with remove option
  createGameBtn: '__dbg_create_game_btn', // Submit button to create the game

  // JoinGameForm - Game joining form components
  gameIdInput: '__dbg_game_id_input', // Input field for entering game ID
  joinGameBtn: '__dbg_join_game_btn', // Submit button to join an existing game

  // RoleSelectionModal - Role selection modal components
  roleSelectionField: '__dbg_role_selection_field', // Role selection field container
  roleSelectionRadio: '__dbg_role_selection_radio', // Radio group for selecting host/player role
  roleContinueBtn: '__dbg_role_continue_btn', // Button to confirm role selection

  // Game Actions - Prompt-based action buttons
  promptRollBtn: '__dbg_prompt_roll_btn', // Roll dice button in game prompts
  promptSelectionField: '__dbg_prompt_selection_field', // Selection field container in prompts
  promptSelectionRadio: (actionType: string) => `__dbg_prompt_${actionType}_radio`, // Radio group for prompt selections
  promptSelectionConfirmBtn: (actionType: string) => `__dbg_prompt_${actionType}_confirm_btn`, // Confirm button for prompt selections
  promptCloseBtn: '__dbg_prompt_close_btn', // Button to close/dismiss prompts

  // Game Actions - Turn-based action buttons
  turnActionBtn: (actionType: string) => `__dbg_turn_${actionType}_btn`, // Turn action buttons (roll, skip, etc.)

  // Utility Components
  supportBtn: '__dbg_support_btn', // Donation/support button in donation widget

  // Tutorial Components
  tutorialBtn: '__dbg_tutorial_btn', // Tutorial button in sidebar
  tutorialModal: '__dbg_tutorial_modal', // Tutorial modal container
  tutorialCloseBtn: '__dbg_tutorial_close_btn', // Close button in tutorial modal
} as const;
