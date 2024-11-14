import formsPlugin from "@tailwindcss/forms"
import typographyPlugin from "@tailwindcss/typography"
import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"
import type { ValueOf } from "type-fest"
import type { Color } from "./lib/tailwindcss"
import typographyStyles from "./typography"

/**
 * A map of color aliases to their corresponding Tailwind CSS color names.
 *
 * @see {@link colors}
 */
export const colorAliasMap = new Map([
  ["error", "red"],
  ["info", "blue"],
  ["primary", "orange"],
  ["success", "green"],
  ["warning", "yellow"],
] as const satisfies [string, Color][])

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx,mdx}"],
  plugins: [typographyPlugin, formsPlugin],
  // Use class-based dark mode to allow for button-based toggling.
  darkMode: "class",
  theme: {
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    typography: typographyStyles,
    extend: {
      colors: Array.from(colorAliasMap).reduce<
        Record<string, ValueOf<typeof colors>>
      >((acc, [alias, color]) => {
        acc[alias] = colors[color]
        return acc
      }, {}),
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        dyslexic: ["OpenDyslexic"],
      },
    },
  },
} satisfies Config
