import {HitNumbers} from "@/components/hit-numbers"

import type {Meta, StoryObj} from "@storybook/nextjs-vite"

const meta: Meta<typeof HitNumbers> = {
	title: "Component/Hit Number",
	component: HitNumbers,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof HitNumbers>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
	args: {
		numbers: [],
	},
}

export const SingleRow: Story = {
	args: {
		numbers: ["01", "02", "03", "04", "05", "06"],
	},
}

export const Wrapped: Story = {
	args: {
		numbers: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"],
	},
}
