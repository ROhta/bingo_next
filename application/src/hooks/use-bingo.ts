"use client"

import { useState, useCallback, useRef } from "react"
import { useAudio } from "@/hooks/use-audio"

export const useBingo = () => {
  const [currentNumber, setCurrentNumber] = useState("00")
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>(null)
  const { playDrumroll, stopDrumroll, playCymbals } = useAudio()

  const generateNumber = useCallback(() => {
    const num = Math.floor(Math.random() * 76)
    return num.toString().padStart(2, "0")
  }, [])

  const selectNumber = useCallback(() => {
    let newNumber
    do {
      newNumber = generateNumber()
    } while (selectedNumbers.includes(newNumber))

    playCymbals()
    setSelectedNumbers((prev) => [...prev, newNumber])
    setCurrentNumber(newNumber)
  }, [selectedNumbers, playCymbals, generateNumber])

  const startRotation = useCallback(() => {
    if (isRunning) {
      // STOPボタンが押された場合
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      stopDrumroll()
      selectNumber() // ここで数字を選択し、Hit Numbersに追加
      setIsRunning(false)
      return
    }

    if (selectedNumbers.length >= 76) {
      return
    }

    setIsRunning(true)

    playDrumroll(() => {
      // drumrollの再生が終了したときに実行
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      selectNumber()
      setIsRunning(false)
    })

    intervalRef.current = setInterval(() => {
      setCurrentNumber(generateNumber())
    }, 50)
  }, [isRunning, selectedNumbers.length, playDrumroll, stopDrumroll, selectNumber, generateNumber])

  const reset = useCallback(() => {
    if (window.confirm("Do you really want to reset?")) {
      setCurrentNumber("00")
      setSelectedNumbers([])
      setIsRunning(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      stopDrumroll()
    }
  }, [stopDrumroll])

  return {
    currentNumber,
    selectedNumbers,
    isRunning,
    startRotation,
    reset,
  }
}

