import typescript from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import unicorn from "eslint-plugin-unicorn"
import importPlugin from "eslint-plugin-import"
import unusedImports from "eslint-plugin-unused-imports"
import storybook from "eslint-plugin-storybook"
import nextConfig from "eslint-config-next"

const eslintConfig = [
	...nextConfig,
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			"@typescript-eslint": typescript,
			unicorn: unicorn,
			import: importPlugin,
			"unused-imports": unusedImports,
			storybook: storybook,
		},
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		rules: {
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
			"unused-imports/no-unused-imports": "warn",
		},
	},
	{
		files: ["**/*.mjs", "**/*.js"],
		plugins: {
			unicorn: unicorn,
			import: importPlugin,
			"unused-imports": unusedImports,
		},
		rules: {
			"unused-imports/no-unused-imports": "warn",
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
