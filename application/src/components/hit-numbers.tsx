import type React from "react"

interface HitNumbersProps {
	numbers: string[]
}

export const HitNumbers = ({numbers}: HitNumbersProps): React.JSX.Element => {
	return (
		<div className="p-4">
			<h2 className="text-6xl py-10">Hit Numbers</h2>
			<div className="grid grid-cols-6 gap-2">
				{numbers.map(number => (
					<div key={number} className="text-6xl py-10">
						{number}
					</div>
				))}
			</div>
		</div>
	)
}
