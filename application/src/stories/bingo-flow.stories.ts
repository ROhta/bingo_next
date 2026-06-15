import {expect, spyOn, userEvent, waitFor, within} from "storybook/test"

import Home from "@/app/page"

import type {Meta, StoryObj} from "@storybook/nextjs-vite"

const meta: Meta<typeof Home> = {
	title: "UX/Bingo Flow",
	component: Home,
	parameters: {
		layout: "fullscreen",
		// 抽選番号は Math.random() で非決定的なため、視覚スナップショットは無効化し
		// play による操作テストとして価値を持たせる。
		chromatic: {
			disableSnapshot: true,
		},
	},
	// 操作デモのため autodocs からは除外する（preview.tsx でグローバル付与されているのを打ち消す）。
	tags: ["!autodocs"],
} satisfies Meta<typeof Home>

export default meta
type Story = StoryObj<typeof meta>

// START を押して数字を回し、STOP を押すと 1 つ確定して Hit Numbers に追加される、という
// アプリ本来の抽選 UX を play で再現する。
export const DrawNumber: Story = {
	play: async ({canvasElement}) => {
		const canvas = within(canvasElement)

		// 抽選前: Hit Numbers はまだ空。
		const hitNumbers = within(canvas.getByRole("heading", {name: "Hit Numbers"}).parentElement ?? canvasElement)
		await expect(hitNumbers.queryAllByText(/^\d{2}$/)).toHaveLength(0)

		// START を押す → ラベルが STOP に反転し、数字の回転が始まる。
		await userEvent.click(canvas.getByRole("button", {name: "START"}))
		const stopButton = await canvas.findByRole("button", {name: "STOP"})

		// STOP を押す → 数字が 1 つ確定し、Hit Numbers に追加される。
		await userEvent.click(stopButton)
		await waitFor(async () => {
			await expect(hitNumbers.queryAllByText(/^\d{2}$/).length).toBeGreaterThan(0)
		})

		// 抽選が終わり、ラベルは START 表示に戻る。
		await canvas.findByRole("button", {name: "START"})
	},
}

// RESET を押すと confirm ダイアログが出て、OK で Hit Numbers の行が全消去される UX を再現する。
// confirm は実ブラウザではモーダルでテストをブロックするため、OK 固定にスタブして検証後に復元する。
export const Reset: Story = {
	play: async ({canvasElement}) => {
		const canvas = within(canvasElement)
		const hitNumbers = within(canvas.getByRole("heading", {name: "Hit Numbers"}).parentElement ?? canvasElement)

		const originalConfirm = window.confirm
		window.confirm = () => true
		try {
			// 事前準備: 2 回抽選して Hit Numbers に行を作る。
			await userEvent.click(canvas.getByRole("button", {name: "START"}))
			await userEvent.click(await canvas.findByRole("button", {name: "STOP"}))
			await userEvent.click(await canvas.findByRole("button", {name: "START"}))
			await userEvent.click(await canvas.findByRole("button", {name: "STOP"}))
			await waitFor(async () => {
				await expect(hitNumbers.queryAllByText(/^\d{2}$/).length).toBeGreaterThan(0)
			})

			// RESET を押す → confirm(OK) で全行がクリアされる。
			await userEvent.click(canvas.getByRole("button", {name: "RESET"}))
			await waitFor(async () => {
				await expect(hitNumbers.queryAllByText(/^\d{2}$/)).toHaveLength(0)
			})
		} finally {
			window.confirm = originalConfirm
		}
	},
}

// START を押した後 STOP を押さず、ドラムロールが鳴り終わると自動的に数字が確定する UX を再現する。
// useBingo はドラムロール音声の ended イベントで selectNumber() を呼ぶ設計のため、実音声（再生が長く
// テストに不向き）の代わりに play() をスタブし、再生直後に ended を発火させて「鳴り終わり」を擬似再現する。
export const AutoDraw: Story = {
	play: async ({canvasElement}) => {
		const canvas = within(canvasElement)
		const hitNumbers = within(canvas.getByRole("heading", {name: "Hit Numbers"}).parentElement ?? canvasElement)
		await expect(hitNumbers.queryAllByText(/^\d{2}$/)).toHaveLength(0)

		const playSpy = spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (this: HTMLMediaElement) {
			// startRotation 内で setInterval 代入が終わってから ended を発火させたいので非同期にする。
			setTimeout(() => {
				this.dispatchEvent(new Event("ended"))
			}, 100)
			return Promise.resolve()
		})
		try {
			// START を押す → 回転開始。STOP は押さない。
			await userEvent.click(canvas.getByRole("button", {name: "START"}))
			await canvas.findByRole("button", {name: "STOP"})

			// ドラムロールが鳴り終わると自動的に数字が 1 つ確定し、Hit Numbers に追加される。
			await waitFor(async () => {
				await expect(hitNumbers.queryAllByText(/^\d{2}$/).length).toBeGreaterThan(0)
			})
			// 自動確定後はラベルが START に戻る。
			await canvas.findByRole("button", {name: "START"})
		} finally {
			playSpy.mockRestore()
		}
	},
}
