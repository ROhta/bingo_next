import { Button } from "../atoms/button"

interface ButtonGroupProps {
  onStart: () => void
  onReset: () => void
}

export function ButtonGroup({ onStart, onReset }: ButtonGroupProps) {
  return (
    <div className="flex gap-4">
      <Button onClick={onStart}>START</Button>
      <Button onClick={onReset} variant="secondary">
        RESET
      </Button>
    </div>
  )
}

