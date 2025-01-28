interface NumberDisplayProps {
  number: string
}

export function NumberDisplay({ number }: NumberDisplayProps) {
  return <div className="text-[200px] font-bold text-white tracking-tight leading-none">{number}</div>
}

