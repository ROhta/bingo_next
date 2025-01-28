import { NumberDisplay } from "../atoms/number-display"

interface NumberPanelProps {
  number: string
}

export function NumberPanel({ number }: NumberPanelProps) {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <NumberDisplay number={number} />
    </div>
  )
}

