import { Button } from "@/components/ui/button"

interface ControlButtonsProps {
  isRunning: boolean
  onStart: () => void
  onReset: () => void
}

export const ControlButtons = ({ isRunning, onStart, onReset }: ControlButtonsProps) => {
  return (
    <div className="flex gap-0">
      <Button
        onClick={onStart}
        className="rounded-l-lg rounded-r-none px-8 py-6 text-xl bg-gray-600 hover:bg-gray-700 text-white"
      >
        {isRunning ? "STOP" : "START"}
      </Button>
      <Button
        onClick={onReset}
        className="rounded-r-lg rounded-l-none px-4 py-6 text-xl bg-gray-600 hover:bg-gray-700 text-white"
      >
        RESET
      </Button>
    </div>
  )
}

