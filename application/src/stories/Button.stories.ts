import {fn} from "storybook/test"

import {Button} from "@/components/ui/button"

import type {Meta, StoryObj} from "@storybook/nextjs-vite"

const meta: Meta<typeof Button> = {
	title: "LeftSide/Button",
	component: Button,
	parameters: {
		layout: "centered",
		chromatic: {
			disableSnapshot: true,
		},
	},
	tags: ["autodocs"],
	args: {onClick: fn()},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const button: Story = {
	args: {
		asChild: false,
	},
}
