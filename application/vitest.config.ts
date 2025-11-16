import path from "node:path"
import {fileURLToPath} from "node:url"
import {defineConfig} from "vitest/config"
import {storybookTest} from "@storybook/addon-vitest/vitest-plugin"
import {playwright} from "@vitest/browser-playwright"

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig(
	storybookTest({
		configDir: path.join(dirname, ".storybook"),
		tags: {
			exclude: ["skip"],
		},
	}).then(plugins => ({
		plugins,
		test: {
			name: "storybook",
			environment: "jsdom",
			alias: {
				"@": path.resolve(dirname, "./src"),
			},
			browser: {
				enabled: true,
				headless: true,
				instances: [
					{
						browser: "chromium" as const,
						viewport: {
							width: 1280,
							height: 720,
						},
					},
				],
				provider: playwright(),
			},
			setupFiles: [".storybook/vitest.setup.ts"],
		},
	}))
)
