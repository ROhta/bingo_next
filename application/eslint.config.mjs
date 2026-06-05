import eslintReact from "@eslint-react/eslint-plugin"
import vitest from "@vitest/eslint-plugin"
import nextConfig from "eslint-config-next"
import {importX} from "eslint-plugin-import-x"
import perfectionist from "eslint-plugin-perfectionist"
import reactCompiler from "eslint-plugin-react-compiler"
import storybook from "eslint-plugin-storybook"
import unicorn from "eslint-plugin-unicorn"
import unusedImports from "eslint-plugin-unused-imports"
import tseslint from "typescript-eslint"

const nextConfigFiles = ["src/**/*.{js,jsx,ts,tsx}", "next.config.ts"]
const eslint10CompatibleNextConfig = nextConfig.map(config => {
	const files = config.files?.map(filePattern => (filePattern === "**/*.{js,jsx,mjs,ts,tsx,mts,cts}" ? nextConfigFiles[0] : filePattern)) ?? config.files
	const scopedConfig = files ? {...config, files} : config

	if (!config.rules) {
		return scopedConfig
	}

	return {
		...scopedConfig,
		rules: Object.fromEntries(Object.entries(config.rules).filter(([ruleName]) => !ruleName.startsWith("react/"))),
	}
})

const eslintConfig = tseslint.config(
	{
		ignores: ["src/components/ui/**", "*.md", ".next/**", "storybook-static/**", "coverage/**"],
	},
	...eslint10CompatibleNextConfig,
	{
		files: ["**/*.ts", "**/*.tsx"],
		extends: [...tseslint.configs.recommendedTypeChecked, eslintReact.configs["recommended-type-checked"], importX.flatConfigs.recommended, importX.flatConfigs.typescript],
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
		files: [".storybook/**/*.{ts,tsx}"],
		extends: [storybook.configs["flat/recommended"]],
		plugins: {
			"import-x": importX,
		},
		rules: {
			"import-x/no-default-export": "off",
			"import-x/prefer-default-export": "off",
			"storybook/story-exports": "off",
		},
	},
	{
		files: ["src/**/*.test.{ts,tsx}", "src/__tests__/**/*.{ts,tsx}"],
		extends: [vitest.configs.recommended],
		rules: {
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"react-compiler/react-compiler": "off",
		},
	},
)

export default eslintConfig
