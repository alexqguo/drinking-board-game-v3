import { ModifierOperation, ModifierOperationEnum } from '../rules/rules.types.js';

export const sumNumbers = (nums: number[]): number =>
  nums.reduce((acc: number, cur: number) => acc + cur);

export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const getUpdatedValue = (
  mod: ModifierOperation,
  originalValue: number,
  newValue: number,
) => {
  if (!mod) return originalValue;

  switch (mod) {
    case ModifierOperationEnum['+']:
      return originalValue + newValue;

    case ModifierOperationEnum['-']:
      return originalValue - newValue;

    case ModifierOperationEnum['*']:
      return Math.ceil(originalValue * newValue);

    case ModifierOperationEnum['=']:
    default:
      return newValue;
  }
};
