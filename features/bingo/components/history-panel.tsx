interface HistoryPanelProps {
  numbers: string[]
}

export function HistoryPanel({ numbers }: HistoryPanelProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-4xl font-bold text-white mb-12 text-left sticky top-8">Hit Numbers</h1>
      <div className="grid grid-cols-6 gap-4 mt-4">
        {numbers.map((num, index) => (
          <div
            key={`${num}-${index}`}
            className="medieval-number w-16 h-16 flex items-center justify-center text-3xl text-white font-bold"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  )
}

