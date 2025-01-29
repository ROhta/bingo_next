interface HitNumbersProps {
  numbers: string[]
}

export const HitNumbers = ({ numbers }: HitNumbersProps) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Hit Numbers</h2>
      <div className="grid grid-cols-6 gap-2">
        {numbers.map((number, index) => (
          <div key={index} className="text-xl text-center p-2 rounded">
            {number}
          </div>
        ))}
      </div>
    </div>
  )
}

