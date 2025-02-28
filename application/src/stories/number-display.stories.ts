import type {Meta, StoryObj} from "@storybook/react"
import {NumberDisplay} from "@/components/number-display"

const meta: Meta<typeof NumberDisplay> = {
	title: "LeftSide/Number Display",
	component: NumberDisplay,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof NumberDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const number_display: Story = {
	args: {
		number: "03",
	},
}
