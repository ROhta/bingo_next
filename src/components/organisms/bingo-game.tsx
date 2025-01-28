"use client"

import { useState, useCallback } from "react"
import { Title } from "../atoms/title"
import { ButtonGroup } from "../molecules/button-group"
import { NumberPanel } from "../molecules/number-panel"

export function BingoGame() {
  const [number, setNumber] = useState("00")
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const startGame = useCallback(() => {
    if (intervalId) return

    const id = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 100)
      setNumber(randomNum.toString().padStart(2, "0"))
    }, 100)

    setIntervalId(id)
  }, [intervalId])

  const resetGame = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    setNumber("00")
  }, [intervalId])

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <Title>Hit Numbers</Title>
      <NumberPanel number={number} />
      <div className="mt-12">
        <ButtonGroup onStart={startGame} onReset={resetGame} />
      </div>
    </div>
  )
}

