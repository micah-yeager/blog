// @ts-check

import eslint from "@eslint/js"
import unusedImports from "eslint-plugin-unused-imports"
import tseslint from "typescript-eslint"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  { plugins: { "unused-imports": unusedImports } },
  {
    rules: {
      // Reduce severity of unused variables and properties.
      "no-unused-private-class-members": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "unused-imports/no-unused-imports": "warn",
      // Superseded by "unused-imports/no-unused-vars" above.
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
)
