import type {Meta, StoryObj} from "@storybook/react"
import {HitNumbers} from "@/components/hit-numbers"

const meta: Meta<typeof HitNumbers> = {
	title: "Right Side",
	component: HitNumbers,
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof HitNumbers>

export default meta
type Story = StoryObj<typeof meta>

export const HitNumber: Story = {
	args: {
		numbers: ["01", "02", "03", "04", "05", "06"],
	},
}
