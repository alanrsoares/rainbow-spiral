/**
 * Linear interpolation function
 * 
 * @param start - The starting value
 * @param end - The ending value
 * @param t - The interpolation factor
 * @returns The interpolated value
 */
export const lerp = (start: number, end: number, t: number) =>
    start * (1 - t) + end * t;
