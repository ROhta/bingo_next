import {fn} from "storybook/test"

import {ControlButtons} from "@/components/control-buttons"

import type {Meta, StoryObj} from "@storybook/nextjs-vite"

const meta: Meta<typeof ControlButtons> = {
	title: "Component/Control Buttons",
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

export const Stopped: Story = {}

export const Running: Story = {
	args: {
		isRunning: true,
	},
}
