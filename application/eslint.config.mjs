import {dirname} from "path"
import {fileURLToPath} from "url"
import {FlatCompat} from "@eslint/eslintrc"
import typescript from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import unicorn from "eslint-plugin-unicorn"
import importPlugin from "eslint-plugin-import"
import unusedImports from "eslint-plugin-unused-imports"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			"@typescript-eslint": typescript,
			unicorn: unicorn,
			import: importPlugin,
			"unused-imports": unusedImports,
		},
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				project: true,
			},
		},
		rules: {
			...(typescript.configs?.["recommended-type-checked"]?.rules ?? {}),
			...(typescript.configs?.["stylistic-type-checked"]?.rules ?? {}),
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{
					prefer: "type-imports",
					fixStyle: "inline-type-imports",
				},
			],
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: {attributes: false},
				},
			],
			"unicorn/filename-case": [
				"error",
				{
					case: "kebabCase",
				},
			],
			"func-style": ["error", "declaration", {allowArrowFunctions: false}],
			"prefer-arrow-callback": ["error", {allowNamedFunctions: false}],
			"import/no-default-export": "error",
			"unused-imports/no-unused-imports": "warn",
			"func-style": "off",
			"@typescript-eslint/consistent-type-definitions": "off",
		},
	},
	{
		files: ["**/page.tsx", "**/layout.tsx", "next.config.ts", "postcss.config.mjs", "tailwind.config.ts"],
		rules: {
			"import/no-default-export": "off",
			"import/prefer-default-export": "error",
		},
	},
	{
		ignores: ["src/components/ui/*", "*.md", ".next/**"],
	},
]

export default eslintConfig
