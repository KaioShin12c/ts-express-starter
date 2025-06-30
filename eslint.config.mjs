import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  { ignores: ["node_modules/", "dist/", "build/"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "no-nested-ternary": "off",
      "no-unused-vars": "off",
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
      "@typescript-eslint/no-explicit-any": "error",
      // "@typescript-eslint/no-meaningless-void-operator": "warn",
      // "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
      // "@typescript-eslint/consistent-type-definitions": [1, "type"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-restricted-exports": "off",
      "no-restricted-imports": ["error", { patterns: ["../"] }],
      eqeqeq: "error",
      "no-unneeded-ternary": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "import/prefer-default-export": "off",
      "arrow-body-style": "off",
    },
  },
]);
