import { SpeedModifier } from '../gamestate/gamestate.types.js';
import { ModifierOperation } from '../rules/rules.types.js';

export const sumNumbers = (nums: number[]): number => (
  nums.reduce((acc: number, cur: number) => acc + cur)
);

export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const getAdjustedRoll = (originalRoll: number, mod: SpeedModifier): number => {
  if (!mod) return originalRoll;
  const { operation, modifier } = mod;

  switch (operation) {
    case ModifierOperation.addition:
      return originalRoll + modifier;

    case ModifierOperation.subtraction:
      return originalRoll - modifier;

    case ModifierOperation.multiplication:
      return Math.ceil(originalRoll * modifier);

    case ModifierOperation.equal:
    default:
      return originalRoll;
  }
}