interface HitNumbersProps {
	numbers: string[]
}

export const HitNumbers = ({numbers}: HitNumbersProps) => {
	return (
		<div className="p-4">
			<h2 className="text-6xl py-10">Hit Numbers</h2>
			<div className="grid grid-cols-6 gap-2">
				{numbers.map((number, index) => (
					<div key={index} className="text-6xl py-10">
						{number}
					</div>
				))}
			</div>
		</div>
	)
}
