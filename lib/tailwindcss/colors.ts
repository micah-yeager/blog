import { colorAliasMap } from "tailwind.config"
import type { DefaultColors } from "tailwindcss/types/generated/colors"
import type { IterableElement, ValueOf } from "type-fest"

/**
 * TailwindCSS color name that represents a utility.
 *
 * @see {@link DefaultColors}
 */
type UtilityColor = "inherit" | "current" | "transparent"

/**
 * TailwindCSS color name that represents a simple color with no variations.
 *
 * @see {@link DefaultColors}
 */
type SimpleColor = "black" | "white"

/**
 * TailwindCSS color name that is not used in the app or Catalyst.
 *
 * @see {@link DefaultColors}
 */
type UnusedColor = "slate" | "gray" | "neutral" | "stone"

/**
 * Deprecated TailwindCSS color name.
 *
 * @see {@link DefaultColors}
 */
type DeprecatedColor =
  | "lightBlue"
  | "warmGray"
  | "trueGray"
  | "coolGray"
  | "blueGray"

/**
 * A normalized subset of the Tailwind CSS color names, specifically excluding
 * {@link UtilityColor utility}, {@link SimpleColor simple},
 * {@link UnusedNeutralColor unused neutral}, and
 * {@link DeprecatedColor deprecated} colors.
 *
 * @see {@link DefaultColors}
 */
export type Color = Exclude<
  keyof DefaultColors,
  UtilityColor | SimpleColor | UnusedColor | DeprecatedColor
>

/**
 * Color alias name.
 *
 * @see {@link colorAliasMap}
 */
export type ColorAlias = IterableElement<ReturnType<typeof colorAliasMap.keys>>

/**
 * Color that is aliased by a {@link ColorAlias}.
 *
 * @see {@link colorAliasMap}
 */
export type AliasedColor = IterableElement<
  ReturnType<typeof colorAliasMap.values>
>

/**
 * Builds a map of color aliases to the corresponding color values input.
 *
 * @param colors - The color values to build aliases from.
 * @returns A map of color aliases to the corresponding color values.
 * @see {@link colorAliasMap}
 */
export function buildColorAliases<T extends Record<AliasedColor, unknown>>(
  colors: T,
): Record<ColorAlias, ValueOf<T>> {
  return Array.from(colorAliasMap).reduce(
    (acc, [alias, color]) => {
      acc[alias] = colors[color] as ValueOf<T>
      return acc
    },
    {} as Record<ColorAlias, ValueOf<T>>,
  )
}

/**
 * Adds color aliases to the given colors.
 *
 * @param colors - The colors to add aliases to.
 * @returns The colors with aliases added.
 * @see {@link colorAliasMap}
 */
export function addColorAliases<T extends Record<AliasedColor, unknown>>(
  colors: T,
): T & Record<ColorAlias, ValueOf<T>> {
  return { ...colors, ...buildColorAliases(colors) }
}

export const darkZincKey = "dark/zinc"
export const darkWhiteKey = "dark/white"

/**
 * A Catalyst color name that represents neutral shades that adapt to the user's
 * preferred color scheme.
 */
export type AdaptiveShade = typeof darkZincKey | typeof darkWhiteKey

export const darkKey = "dark"
export const whiteKey = "white"

/**
 * A Catalyst color name that represents neutral shades that are not affected by
 * the user's preferred color scheme.
 */
export type StaticShade = typeof darkKey | typeof whiteKey

/**
 * A Catalyst color name that represents a shade.
 */
export type Shade = AdaptiveShade | StaticShade
