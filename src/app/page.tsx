"use client"

import { NumberDisplay } from "@/components/number-display"
import { ControlButtons } from "@/components/control-buttons"
import { HitNumbers } from "@/components/hit-numbers"
import { useBingo } from "@/hooks/use-bingo"

export default function Home() {
  const { currentNumber, selectedNumbers, isRunning, startRotation, reset } = useBingo()

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center justify-between p-4">
          <NumberDisplay number={currentNumber} />
          <ControlButtons isRunning={isRunning} onStart={startRotation} onReset={reset} />
        </div>
        <div className="flex flex-col h-screen">
          <div className="flex-grow overflow-auto">
            <HitNumbers numbers={selectedNumbers} />
          </div>
        </div>
      </div>
    </main>
  )
}

