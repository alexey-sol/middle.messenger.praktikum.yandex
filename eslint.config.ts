import eslint from "@eslint/js";
import { json, prettier, typescript } from "eslint-config-canonical";
import auto from "eslint-config-canonical/auto";
import { defineConfig, globalIgnores } from "eslint/config";

const ESLINT_FILES = ["**/*.{js,mjs,jsx,ts,mts,tsx}"];
const ESLINT_EXTENSIONS = [".js", ".mjs", ".jsx", ".ts", ".mts", ".tsx"];

const jsonConfig = defineConfig([
    ...json.recommended,
    {
        files: ["**/*.json"],
        rules: {
            "jsonc/indent": ["error", 4],
            "jsonc/object-curly-spacing": ["error", "always"],
        },
    },
    {
        files: ["package.json", "tsconfig.json", "tsconfig.*.json"],
        rules: {
            "jsonc/sort-keys": "off",
        },
    },
    {
        files: ["tsconfig.json", "tsconfig.*.json"],
        rules: {
            "jsonc/no-comments": "off",
        },
    },
]);

const prettierConfig = defineConfig({
    extends: [...prettier.recommended],
    files: ESLINT_FILES,
    rules: {
        "prettier/prettier": [
            "error",
            {
                arrowParens: "always",
                bracketSameLine: false,
                bracketSpacing: true,
                endOfLine: "lf",
                printWidth: 100,
                proseWrap: "preserve",
                quoteProps: "as-needed",
                semi: true,
                singleAttributePerLine: true,
                singleQuote: false,
                tabWidth: 4,
                trailingComma: "all",
                useTabs: false,
            },
            { usePrettierrc: false },
        ],
    },
});

export default defineConfig([
    globalIgnores(["dist", "package-lock.json", "vite.config.ts"]),
    ...auto,
    {
        ...eslint.configs.recommended,
        extends: [...typescript.recommended],
        files: ESLINT_FILES,
        languageOptions: {
            parserOptions: {
                project: ["tsconfig.json"],
            },
        },
        rules: {
            "canonical/filename-match-exported": "off",
            "canonical/filename-match-regex": "off",
            "import/no-unassigned-import": "off",
            "no-console": ["error", { allow: ["error", "warn", "log"] }],
            "no-implicit-coercion": ["error", { allow: ["!!"] }],
            "prefer-promise-reject-errors": "off",
            "promise/prefer-await-to-then": "off",
            "unicorn/filename-case": ["error", { case: "kebabCase" }],
            "unicorn/no-array-for-each": "off",
            "unicorn/no-array-reduce": "off",
            "unicorn/prefer-regexp-test": "off",
            "unicorn/prevent-abbreviations": "off",
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: ESLINT_EXTENSIONS,
                },
            },
        },
    },
    ...jsonConfig,
    ...prettierConfig,
]);
