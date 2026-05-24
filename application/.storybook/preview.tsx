import React from "react"

import {medievalSharp} from "../src/app/fonts"
import "../src/app/globals.css"

import type {Preview} from "@storybook/nextjs-vite"

const preview: Preview = {
	tags: ["autodocs"],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		Story => (
			<div className={medievalSharp.className}>
				<Story />
			</div>
		),
	],
}

export default preview
