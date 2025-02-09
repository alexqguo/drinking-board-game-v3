import { RuleHandlerFactory } from './types.js';
import { DisplayRule } from './DisplayRule.js';
import { BaseContext } from '../engine.js';

const ruleMappings: { [key: string]: RuleHandlerFactory } = {
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

const executeTurnRule = (ctx: BaseContext) => {
  // get current rule object,
  // open modal (set currentRule object)
  // find and execute rule handler
  // TODO- update items
};