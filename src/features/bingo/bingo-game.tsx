"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { NumberDisplay } from "./components/number-display"
import { ControlPanel } from "./components/control-panel"
import { HistoryPanel } from "./components/history-panel"
import { useSoundEffects } from "./hooks/use-sound-effects"

export function BingoGame() {
  const [number, setNumber] = useState("00")
  const [history, setHistory] = useState<string[]>([])
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const { drumrollRef, cymbalsRef, playDrumroll, stopDrumroll, playCymbals } = useSoundEffects()
  const drumrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const finishGame = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    stopDrumroll()
    playCymbals()
    setHistory((prev) => [...prev, number])
  }, [intervalId, number, stopDrumroll, playCymbals])

  const startGame = useCallback(() => {
    if (intervalId) {
      finishGame()
      return
    }

    playDrumroll()
    const id = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 100)
      setNumber(randomNum.toString().padStart(2, "0"))
    }, 100)

    setIntervalId(id)

    // drumroll.mp3の長さに合わせて自動的に停止
    drumrollTimeoutRef.current = setTimeout(() => {
      finishGame()
    }, 2000) // drumrollの長さに応じて調整してください
  }, [intervalId, finishGame, playDrumroll])

  const resetGame = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    if (drumrollTimeoutRef.current) {
      clearTimeout(drumrollTimeoutRef.current)
      drumrollTimeoutRef.current = null
    }
    stopDrumroll()
    setNumber("00")
    setHistory([])
  }, [intervalId, stopDrumroll])

  // drumrollの再生が終わったときのイベントリスナー
  useEffect(() => {
    const drumrollAudio = drumrollRef.current
    if (drumrollAudio) {
      const handleEnded = () => {
        if (intervalId) {
          finishGame()
        }
      }
      drumrollAudio.addEventListener("ended", handleEnded)
      return () => {
        drumrollAudio.removeEventListener("ended", handleEnded)
      }
    }
  }, [drumrollRef, intervalId, finishGame])

  // コンポーネントのアンマウント時にインターバルとオーディオをクリーンアップ
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
      if (drumrollTimeoutRef.current) {
        clearTimeout(drumrollTimeoutRef.current)
      }
      stopDrumroll()
    }
  }, [intervalId, stopDrumroll])

  return (
    <div className="min-h-screen bg-gray-800 flex">
      <audio
        ref={drumrollRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drumroll-FgfEKkQtYeMwnrQTzvoZF73ARBhTXT.mp3"
      />
      <audio
        ref={cymbalsRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cymbals-jUKgeggg3UYmYBN54GlCOGPZNfgKYw.mp3"
      />

      {/* 左カラム */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="mb-12">
          <NumberDisplay number={number} />
        </div>
        <ControlPanel onStart={startGame} onReset={resetGame} isRunning={!!intervalId} />
      </div>

      {/* 右カラム */}
      <div className="flex-1 p-8 overflow-y-auto">
        <HistoryPanel numbers={history} />
      </div>
    </div>
  )
}

