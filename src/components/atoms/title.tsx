interface TitleProps {
  children: React.ReactNode
}

export function Title({ children }: TitleProps) {
  return <h1 className="text-4xl font-bold text-white mb-12">{children}</h1>
}

