import packageJson from "./package.json" with { type: "json" }
import tsconfigJson from "./tsconfig.json" with { type: "json" }

/** @type {import("prettier").Config} */
const baseConfig = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-jsdoc",
    "prettier-plugin-css-order",
    "prettier-plugin-tailwindcss"
  ],
  singleQuote: false,
  semi: false,
  trailingComma: "none",
  bracketSpacing: true
}

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
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
const sortImportsConfig = {
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
  importOrderTypeScriptVersion: packageJson.devDependencies.typescript.slice(1)
}

/** @type {import("prettier-plugin-jsdoc").Options} */
const jsdocConfig = {
  tsdoc: true
}

/** @type {import("prettier-plugin-tailwindcss").PluginOptions} */
const tailwindConfig = {
  tailwindFunctions: ["clsx", "tw"]
}

// noinspection JSUnusedGlobalSymbols
export default {
  ...tailwindConfig,
  ...jsdocConfig,
  ...sortImportsConfig,
  ...baseConfig
}
