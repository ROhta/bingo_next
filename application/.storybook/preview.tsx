import React from "react"
import type {Preview} from "@storybook/nextjs"
import "../src/app/globals.css"
import {medievalSharp} from "../src/app/fonts"

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
