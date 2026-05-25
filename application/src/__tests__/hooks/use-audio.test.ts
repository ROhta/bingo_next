import {renderHook} from "@testing-library/react"
import {describe, it, expect, vi, beforeEach, afterEach} from "vitest"

import {useAudio} from "@/hooks/use-audio"

// Audio要素のモック
class AudioMock {
	src: string
	currentTime = 0
	onended: (() => void) | null = null
	pause = vi.fn()
	play = vi.fn().mockImplementation(() => Promise.resolve())

	constructor(url: string) {
		this.src = url
	}
}

describe("useAudio hook", () => {
	// グローバルAudioをモック化
	const originalAudio = global.Audio
	let audioInstances: AudioMock[] = []

	beforeEach(() => {
		// インスタンスの配列をリセット
		audioInstances = []

		// AudioクラスをモックAudioで置き換え
		global.Audio = vi.fn().mockImplementation((url: string) => {
			const instance = new AudioMock(url)
			audioInstances.push(instance)
			return instance
		})

		vi.clearAllMocks()
	})

	afterEach(() => {
		// テスト後に元のAudioクラスを復元
		global.Audio = originalAudio
	})

	it("should initialize audio elements", () => {
		renderHook(() => useAudio())

		// 2つのAudioインスタンスが作成されたことを確認
		expect(global.Audio).toHaveBeenCalledTimes(2)
		expect(global.Audio).toHaveBeenCalledWith("/drumroll.mp3")
		expect(global.Audio).toHaveBeenCalledWith("/cymbals.mp3")
	})

	it("playDrumroll should play drumroll audio and set onended callback", () => {
		const {result} = renderHook(() => useAudio())
		const onEndedMock = vi.fn()

		result.current.playDrumroll(onEndedMock)

		// 最新のインスタンスを使用
		const [drumroll] = audioInstances
		expect(drumroll).toBeDefined()
		if (!drumroll) return

		expect(drumroll.currentTime).toBe(0)
		// onendedの検証方法を変更
		expect(drumroll.onended).not.toBeNull()
		expect(drumroll.play).toHaveBeenCalled()
	})

	it("stopDrumroll should pause drumroll audio and reset currentTime", () => {
		const {result} = renderHook(() => useAudio())

		result.current.stopDrumroll()

		// drumrollのAudioインスタンスのメソッドが正しく呼ばれたか確認
		const [drumroll] = audioInstances
		expect(drumroll).toBeDefined()
		if (!drumroll) return

		expect(drumroll.pause).toHaveBeenCalled()
		expect(drumroll.currentTime).toBe(0)
	})

	it("playCymbals should play cymbals audio", () => {
		const {result} = renderHook(() => useAudio())

		result.current.playCymbals()

		// cymbalsのAudioインスタンスのメソッドが正しく呼ばれたか確認
		const [, cymbals] = audioInstances
		expect(cymbals).toBeDefined()
		if (!cymbals) return

		expect(cymbals.currentTime).toBe(0)
		expect(cymbals.play).toHaveBeenCalled()
	})

	it("should cleanup audio elements on unmount", () => {
		const {unmount} = renderHook(() => useAudio())

		unmount()

		// アンマウント時に両方のAudioインスタンスのpauseが呼ばれたか確認
		const [drumroll, cymbals] = audioInstances
		expect(drumroll).toBeDefined()
		expect(cymbals).toBeDefined()
		if (!drumroll || !cymbals) return

		expect(drumroll.pause).toHaveBeenCalled()
		expect(cymbals.pause).toHaveBeenCalled()
	})
})
