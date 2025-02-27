import type {Meta, StoryObj} from "@storybook/react"
import {fn} from "@storybook/test"

import {ControlButtons} from "@/components/control-buttons"

const meta: Meta<typeof ControlButtons> = {
	title: "LeftSide/Control Buttons",
	component: ControlButtons,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	args: {
		isRunning: false,
		onStart: fn(),
		onReset: fn(),
	},
} satisfies Meta<typeof ControlButtons>

export default meta
type Story = StoryObj<typeof meta>

export const twoButtons: Story = {
	args: {
		isRunning: false,
		onStart: fn(),
		onReset: fn(),
	},
}
