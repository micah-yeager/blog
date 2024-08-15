import packageJson from "./package.json" with { type: "json" }
import tsconfigJson from "./tsconfig.json" with { type: "json" }

/**
 * A regex pattern that matches any of the path aliases from `tsconfig.json`.
 *
 * Note that this is a string, not RegExp, since the plugin requires strings.
 *
 * @type {string}
 */
const tsconfigPathAliasesRegex =
  // Start matching group.
  "(" +
  Object.keys(tsconfigJson.compilerOptions.paths)
    // Remove the trailing "/*" from the path aliases.
    .map((item) => item.slice(0, item.length - 2))
    // Add the "or" operator between each path alias
    .join("|") +
  // End matching group.
  ")"

/**
 * @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig &
 *   import("prettier-plugin-jsdoc").Options &
 *   import("prettier-plugin-tailwindcss").PluginOptions}
 * @see https://prettier.io/docs/en/configuration.html
 * @see https://github.com/IanVS/prettier-plugin-sort-imports#options
 * @see https://github.com/hosseinmd/prettier-plugin-jsdoc?tab=readme-ov-file#Options
 * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss#options
 */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-jsdoc",
    "prettier-plugin-css-order",
    "prettier-plugin-tailwindcss" // Must be last.
  ],
  singleQuote: false,
  semi: false,
  trailingComma: "none",
  bracketSpacing: true,

  // Import order
  importOrder: [
    "", // Empty line for top-of-file comments.
    "<TYPES>^(node:)", // Node.js built-in module types.
    "<BUILTIN_MODULES>", // Node.js built-in modules.
    "",
    "<TYPES>", // Types not matched by other special words or groups.
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "",
    `<TYPES>^${tsconfigPathAliasesRegex}(/.*)$`, // Internal types.
    `^${tsconfigPathAliasesRegex}(/.*)$`, // Internal imports.
    "",
    "<TYPES>^[.]", // Relative types.
    "^[.]" // Relative imports.
  ],
  // Add the "importAttributes" Babel plugin, in addition to the defaults.
  importOrderParserPlugins: [
    "typescript",
    "jsx",
    "importAttributes",
    "decorators"
  ],
  // Remove the leading version indicator from the TypeScript package version.
  importOrderTypeScriptVersion: packageJson.devDependencies.typescript.slice(1),

  // JSDoc
  tsdoc: true,

  // Tailwind CSS
  tailwindFunctions: ["clsx", "tw"]
}

export default config
