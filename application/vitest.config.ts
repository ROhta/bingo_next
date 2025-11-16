import path from "node:path"
import {fileURLToPath} from "node:url"
import {defineConfig, type Plugin} from "vitest/config"
import {storybookTest} from "@storybook/addon-vitest/vitest-plugin"
import {playwright} from "@vitest/browser-playwright"

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// Vite plugin to handle sb-original and next/font imports
const storybookOriginalPlugin = (): Plugin => ({
	name: "storybook-original-resolver",
	resolveId(id) {
		if (id.startsWith("sb-original/")) {
			// Return a virtual module ID
			return `\0${id}`
		}
		if (id === "next/font/google" || id === "next/font/local") {
			return `\0${id}`
		}
		return null
	},
	load(id) {
		if (id.startsWith("\0sb-original/")) {
			// Return an empty module for sb-original imports
			const moduleName = id.slice(1).replace("sb-original/", "")
			return `export const ${moduleName.replace(/-/g, "_")} = {}; export default {};`
		}
		if (id === "\0next/font/google" || id === "\0next/font/local") {
			// Return a mock for next/font with a Proxy to handle any font name
			return `
				const mockFont = () => ({ className: '', style: {} });
				export default mockFont;
				export const MedievalSharp = mockFont;
				// Use Proxy to handle any other font imports dynamically
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
export default defineConfig(
	storybookTest({
		configDir: path.join(dirname, ".storybook"),
		tags: {
			exclude: ["skip"],
		},
	}).then(plugins => ({
		plugins: [...plugins, storybookOriginalPlugin()],
		optimizeDeps: {
			exclude: ["next/font/google", "next/font/local"],
			esbuildOptions: {
				plugins: [
					{
						name: "storybook-original-resolver-esbuild",
						setup(build: any) {
							build.onResolve({filter: /^sb-original\//}, (args: any) => ({
								path: args.path,
								namespace: "sb-original",
							}))
							build.onLoad({filter: /.*/, namespace: "sb-original"}, () => ({
								contents: "export default {}; export const ImageContext = {};",
								loader: "js",
							}))
						},
					},
				],
			},
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
			setupFiles: [".storybook/vitest.setup.ts"],
		},
	}))
)
