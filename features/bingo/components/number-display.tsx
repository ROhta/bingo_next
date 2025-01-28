interface NumberDisplayProps {
  number: string
}

export function NumberDisplay({ number }: NumberDisplayProps) {
  return <div className="medieval-number text-[55vmin] font-bold text-white tracking-tight leading-none">{number}</div>
}

