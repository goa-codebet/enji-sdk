import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import esLint from "@eslint/js";

export default tseslint.config([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    ignores: ["dist/**"],
    plugins: { js },
    extends: [esLint.configs.recommended, tseslint.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
]);
