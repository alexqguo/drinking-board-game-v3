import { RuleHandler } from './types.js';
import { DisplayRule } from './displayRule.js';

const ruleMappings: { [key: string]: RuleHandler } = {
  DisplayRule,
  // ExtraTurnRule,
  // MoveRule,
  // RollUntilRule,
  // AddMandatoryRule,
  // DiceRollRule,
  // GameOverRule,
  // DrinkDuringLostTurnsRule,
  // ProxyRule,
  // ApplyMoveConditionRule,
  // ChoiceRule,
  // ReverseTurnOrderRule,
  // ChallengeRule,
  // SkipTurnRule,
  // SpeedModifierRule,
  // SkipNextMandatoryRule,
  // StarterSelectionRule,
  // UpdateStarterRule,
  // AnchorRule,
  // GroupRollRule,
  // RollAugmentationRule,
};