import path from "node:path"
import {fileURLToPath} from "node:url"
import {defineConfig, type Plugin, type ViteUserConfigExport} from "vitest/config"
import {storybookTest} from "@storybook/addon-vitest/vitest-plugin"
import {playwright} from "@vitest/browser-playwright"

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// Vite plugin to handle sb-original and next/font imports
const storybookOriginalPlugin = (): Plugin => ({
	name: "storybook-original-resolver",
	resolveId(id) {
		if (id.startsWith("sb-original/")) {
			return `\0${id}`
		}
		if (id === "next/font/google" || id === "next/font/local") {
			return `\0${id}`
		}
		return null
	},
	load(id) {
		if (id.startsWith("\0sb-original/")) {
			const moduleName = id.slice(1).replace("sb-original/", "")
			return `export const ${moduleName.replace(/-/g, "_")} = {}; export default {};`
		}
		if (id === "\0next/font/google" || id === "\0next/font/local") {
			return `
				const mockFont = () => ({ className: '', style: {} });
				export default mockFont;
				export const MedievalSharp = mockFont;
				const handler = {
					get: (target, prop) => {
						if (prop === '__esModule') return true;
						if (prop === 'default') return mockFont;
						return mockFont;
					}
				};
				const proxy = new Proxy({}, handler);
				export { proxy };
			`
		}
		return null
	},
})

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
const config: ViteUserConfigExport = defineConfig(
	storybookTest({
		configDir: path.join(dirname, ".storybook"),
		tags: {
			exclude: ["skip"],
		},
	}).then(plugins => ({
		plugins: [...plugins, storybookOriginalPlugin()],
		optimizeDeps: {
			exclude: ["next/font/google", "next/font/local"],
		},
		resolve: {
			alias: {
				"@": path.resolve(dirname, "./src"),
				"next/font/google": path.resolve(dirname, ".storybook/mocks/next-font.js"),
				"next/font/local": path.resolve(dirname, ".storybook/mocks/next-font.js"),
			},
		},
		define: {
			"process.env.NODE_ENV": JSON.stringify("test"),
			"process.env.__NEXT_ROUTER_BASEPATH": JSON.stringify(""),
			"process.env.__NEXT_I18N_SUPPORT": JSON.stringify(false),
			"process.env.__NEXT_TRAILING_SLASH": JSON.stringify(false),
			"process.env.__NEXT_NEW_LINK_BEHAVIOR": JSON.stringify(true),
		},
		test: {
			name: "storybook",
			environment: "jsdom",
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
		},
	})),
)

export default config
