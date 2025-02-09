import { RuleHandler } from './types.js';
import { DisplayRule } from './DisplayRule.js';

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

const executeTurnRule = () => {
  // get current rule object,
  // open modal (set currentRule object)
  // find and execute rule handler
  // TODO- update items
};