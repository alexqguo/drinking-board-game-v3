export const sumNumbers = (nums: number[]): number => (
  nums.reduce((acc: number, cur: number) => acc + cur)
);

export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);