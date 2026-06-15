import {expect, fn, userEvent, within} from "storybook/test"

import {Button} from "@/components/ui/button"

import type {Meta, StoryObj} from "@storybook/nextjs-vite"

const meta: Meta<typeof Button> = {
	title: "Component/Button",
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

export const Default: Story = {
	args: {
		asChild: false,
		children: "クリック",
	},
	play: async ({canvasElement, args}) => {
		const canvas = within(canvasElement)
		await userEvent.click(canvas.getByRole("button"))
		await expect(args.onClick).toHaveBeenCalled()
	},
}

export const Disabled: Story = {
	args: {
		children: "クリック",
		disabled: true,
	},
}

export const Large: Story = {
	args: {
		children: "クリック",
		size: "lg",
	},
}

export const Icon: Story = {
	args: {
		children: "＋",
		size: "icon",
	},
}
