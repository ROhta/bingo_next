import {NumberDisplay} from "@/components/number-display"

import type {Meta, StoryObj} from "@storybook/nextjs-vite"

const meta: Meta<typeof NumberDisplay> = {
	title: "Component/Number Display",
	component: NumberDisplay,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof NumberDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Initial: Story = {
	args: {
		number: "00",
	},
}

export const Drawn: Story = {
	args: {
		number: "75",
	},
}
