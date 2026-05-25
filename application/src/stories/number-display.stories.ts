import {NumberDisplay} from "@/components/number-display"

import type {Meta, StoryObj} from "@storybook/nextjs-vite"

const meta: Meta<typeof NumberDisplay> = {
	title: "LeftSide/Number Display",
	component: NumberDisplay,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof NumberDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const number_display: Story = {
	args: {
		number: "03",
	},
}
