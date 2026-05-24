import type {JSX} from "react"

export const NumberDisplay = ({number}: {number: string}): JSX.Element => {
	return (
		<div className="flex">
			<div style={{fontSize: "55vmin"}} className="font-bold">
				{number}
			</div>
		</div>
	)
}
