/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param number The number to clamp.
 * @param a The minimum value.
 * @param b The maximum value.
 * @returns The clamped number.
 */
export function clamp(number: number, a: number, b: number) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}
