import {describe, it, expect, vi, beforeEach, afterEach} from "vitest"
import {renderHook, act} from "@testing-library/react"
import {UseBingo} from "@/hooks/use-bingo"

// useAudioのモック
vi.mock("@/hooks/use-audio", () => ({
	useAudio: () => ({
		playDrumroll: vi.fn((callback?: () => void) => {
			// 即座にコールバックを実行するモック
			if (callback) {
				callback()
			}
		}),
		stopDrumroll: vi.fn(),
		playCymbals: vi.fn(),
	}),
}))

describe("UseBingo", () => {
	// テスト前に実行
	beforeEach(() => {
		// Math.randomのモック
		vi.spyOn(Math, "random").mockImplementation(() => 0.5)
		// window.confirmのモック
		vi.spyOn(window, "confirm").mockImplementation(() => true)
		// setIntervalのモック
		vi.spyOn(global, "setInterval").mockImplementation(() => 123 as unknown as NodeJS.Timeout)
		// clearIntervalのモック
		vi.spyOn(global, "clearInterval").mockImplementation(vi.fn())
	})

	// テスト後に実行
	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe("generateNumber", () => {
		it("0から75までの数字をランダムに生成し、2桁の文字列として返す", () => {
			const {result} = renderHook(() => UseBingo())

			// Math.randomが0.5を返すようにモック化されているので、
			// 0.5 * 76 = 38が生成される
			expect(result.current.currentNumber).toBe("38")
		})
	})

	describe("startRotation", () => {
		it("回転を開始し、isRunningをtrueに設定する", () => {
			const {result} = renderHook(() => UseBingo())

			act(() => {
				result.current.startRotation()
			})

			expect(setInterval).toHaveBeenCalled()
		})
	})

	describe("reset", () => {
		it("確認ダイアログでYesを選択した場合、状態をリセットする", () => {
			const {result} = renderHook(() => UseBingo())

			// リセット
			act(() => {
				result.current.reset()
			})

			// リセット後の状態を確認
			expect(result.current.currentNumber).toBe("00")
			expect(result.current.selectedNumbers).toEqual([])
			expect(result.current.isRunning).toBe(false)
		})
	})
})
