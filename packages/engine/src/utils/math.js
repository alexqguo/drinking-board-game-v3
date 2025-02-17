import { ModifierOperation } from '../enums.js';
export const sumNumbers = (nums) => (nums.reduce((acc, cur) => acc + cur));
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
export const getAdjustedRoll = (originalRoll, mod) => {
    if (!mod)
        return originalRoll;
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
};
