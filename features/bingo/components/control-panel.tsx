interface ControlPanelProps {
  onStart: () => void
  onReset: () => void
  isRunning: boolean
}

export function ControlPanel({ onStart, onReset, isRunning }: ControlPanelProps) {
  const handleReset = () => {
    if (confirm("Do you really want to reset?")) {
      onReset()
    }
  }

  return (
    <div className="flex">
      <button
        onClick={onStart}
        className="w-[240px] h-[100px] text-xl text-white font-medium rounded-2xl transition-colors bg-slate-600 hover:bg-slate-700"
      >
        {isRunning ? "STOP" : "START"}
      </button>
      <button
        onClick={handleReset}
        className="w-[100px] h-[100px] text-xl text-white font-medium rounded-2xl transition-colors bg-slate-600 hover:bg-slate-700"
      >
        RESET
      </button>
    </div>
  )
}

