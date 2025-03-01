import path from "node:path"
import {fileURLToPath} from "node:url"

import {defineConfig} from "vitest/config"

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
	test: {
		environment: "jsdom",
		include: ["**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		alias: {
			"@": path.resolve(dirname, "./src"),
		},
	},
})
