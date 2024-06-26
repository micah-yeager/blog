/** @type {import("prettier").Config} */
const baseConfig = {
  singleQuote: false,
  semi: false,
  trailingComma: "none",
  bracketSpacing: true,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-css-order",
    "prettier-plugin-jsdoc",
    "prettier-plugin-tailwindcss"
  ]
}

const tsconfigPaths = ["@ui", "@content", "~"]
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const sortImportsConfig = {
  importOrder: [
    "", // Empty line for top-of-file comments.
    "<TYPES>^(node:)", // Node.js built-in module types.
    "<BUILTIN_MODULES>", // Node.js built-in modules.
    "",
    "<TYPES>", // Types not matched by other special words or groups.
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "",
    `<TYPES>^(${tsconfigPaths.join("|")})(/.*)$`, // Internal types.
    `^(${tsconfigPaths.join("|")})(/.*)$`, // Internal imports.
    "",
    "<TYPES>^[.]", // Relative types.
    "^[.]" // Relative imports.
  ],
  importOrderTypeScriptVersion: "5.1.6" // TypeScript version used by project.
}

/** @type {import("prettier-plugin-tailwindcss").PluginOptions} */
const tailwindConfig = {
  tailwindFunctions: ["clsx", "tw"]
}

/** @type {import("prettier-plugin-jsdoc").Options} */
const jsdocConfig = {
  tsdoc: true
}

// noinspection JSUnusedGlobalSymbols
export default {
  ...sortImportsConfig,
  ...tailwindConfig,
  ...jsdocConfig,
  ...baseConfig
}
