import vitest from "@vitest/eslint-plugin"
import nextConfig from "eslint-config-next"
import {importX} from "eslint-plugin-import-x"
import perfectionist from "eslint-plugin-perfectionist"
import reactCompiler from "eslint-plugin-react-compiler"
import storybook from "eslint-plugin-storybook"
import unicorn from "eslint-plugin-unicorn"
import unusedImports from "eslint-plugin-unused-imports"
import tseslint from "typescript-eslint"

const eslintConfig = tseslint.config(
	{
		ignores: ["src/components/ui/**", "*.md", ".next/**", "storybook-static/**", "coverage/**"],
	},
	...nextConfig,
	{
		files: ["**/*.ts", "**/*.tsx"],
		extends: [
			...tseslint.configs.recommendedTypeChecked,
			importX.flatConfigs.recommended,
			importX.flatConfigs.typescript,
		],
		plugins: {
			unicorn,
			"unused-imports": unusedImports,
			"react-compiler": reactCompiler,
			perfectionist,
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
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
			"react-compiler/react-compiler": "warn",
			"perfectionist/sort-imports": [
				"warn",
				{
					type: "natural",
					order: "asc",
					internalPattern: ["^@/.*", "^~/.*"],
					newlinesBetween: 1,
					groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type", "unknown"],
				},
			],
		},
	},
	{
		files: ["**/*.mjs", "**/*.js"],
		plugins: {
			unicorn,
			"unused-imports": unusedImports,
		},
		rules: {
			"unused-imports/no-unused-imports": "warn",
		},
	},
	{
		files: ["**/page.tsx", "**/layout.tsx", "next.config.ts", "postcss.config.mjs", "tailwind.config.ts"],
		plugins: {
			"import-x": importX,
		},
		rules: {
			"import-x/no-default-export": "off",
			"import-x/prefer-default-export": "error",
		},
	},
	{
		files: ["src/**/*.stories.{ts,tsx}"],
		extends: [storybook.configs["flat/recommended"]],
		plugins: {
			"import-x": importX,
		},
		rules: {
			"import-x/no-default-export": "off",
			"import-x/prefer-default-export": "off",
			"storybook/prefer-pascal-case": "off",
		},
	},
	{
		files: ["src/**/*.test.{ts,tsx}", "src/__tests__/**/*.{ts,tsx}"],
		extends: [vitest.configs.recommended],
		rules: {
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
		},
	},
)

export default eslintConfig
