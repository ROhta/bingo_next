import type React from "react"

export const NumberDisplay = ({number}: {number: string}): React.JSX.Element => {
	return (
		<div className="flex">
			<div className="font-bold text-[55vmin]">{number}</div>
		</div>
	)
}
