import type {StorybookConfig} from "@storybook/nextjs-vite"

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

	addons: ["@chromatic-com/storybook", "@storybook/addon-mcp"],

	framework: {
		name: "@storybook/nextjs-vite",
		options: {},
	},

	staticDirs: ["../public"],

	typescript: {
		reactDocgen: "react-docgen-typescript",
	},

	core: {
		disableTelemetry: true,
	},
}
export default config
