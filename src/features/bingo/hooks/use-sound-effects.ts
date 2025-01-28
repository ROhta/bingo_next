"use client"

import { useRef, useCallback } from "react"

export function useSoundEffects() {
  const drumrollRef = useRef<HTMLAudioElement | null>(null)
  const cymbalsRef = useRef<HTMLAudioElement | null>(null)

  const playDrumroll = useCallback(() => {
    if (drumrollRef.current) {
      drumrollRef.current.currentTime = 0
      drumrollRef.current.play()
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
      cymbalsRef.current.play()
    }
  }, [])

  return {
    drumrollRef,
    cymbalsRef,
    playDrumroll,
    stopDrumroll,
    playCymbals,
  }
}

