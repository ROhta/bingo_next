interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: "primary" | "secondary"
}

export function Button({ onClick, children, variant = "primary" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 text-white font-medium rounded transition-colors
        ${variant === "primary" ? "bg-slate-600 hover:bg-slate-700" : "bg-slate-500 hover:bg-slate-600"}`}
    >
      {children}
    </button>
  )
}

