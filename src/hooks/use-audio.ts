"use client"

import { useEffect, useRef, useCallback } from "react"

export const useAudio = () => {
  const drumrollRef = useRef<HTMLAudioElement | null>(null)
  const cymbalsRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    drumrollRef.current = new Audio("/drumroll.mp3")
    cymbalsRef.current = new Audio("/cymbals.mp3")

    return () => {
      if (drumrollRef.current) {
        drumrollRef.current.pause()
        drumrollRef.current = null
      }
      if (cymbalsRef.current) {
        cymbalsRef.current.pause()
        cymbalsRef.current = null
      }
    }
  }, [])

  const playDrumroll = useCallback((onEnded: () => void) => {
    if (drumrollRef.current) {
      drumrollRef.current.currentTime = 0
      drumrollRef.current.onended = onEnded
      drumrollRef.current.play().catch(console.error)
    }
  }, [])

  const stopDrumroll = useCallback(() => {
    if (drumrollRef.current) {
      drumrollRef.current.pause()
      drumrollRef.current.currentTime = 0
    }
  }, [])

  const playCymbals = useCallback(() => {
    if (cymbalsRef.current) {
      cymbalsRef.current.currentTime = 0
      cymbalsRef.current.play().catch(console.error)
    }
  }, [])

  return {
    playDrumroll,
    stopDrumroll,
    playCymbals,
  }
}

