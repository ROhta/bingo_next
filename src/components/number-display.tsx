export const NumberDisplay = ({ number }: { number: string }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div style={{ fontSize: "55vmin" }} className="font-bold">
        {number}
      </div>
    </div>
  )
}

