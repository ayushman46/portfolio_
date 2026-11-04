/** Clamps a number into [0, 1]. */
export const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);
