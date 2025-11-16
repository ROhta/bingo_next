import {Button} from "@/components/ui/button"

interface ControlButtonsProps {
	isRunning: boolean
	onStart: () => void
	onReset: () => void
}

export const ControlButtons = ({isRunning, onStart, onReset}: ControlButtonsProps) => {
	return (
		<div className="flex gap-0">
			<Button onClick={onStart} className="bg-slate-700 px-20 py-10 rounded-xl text-3xl">
				{isRunning ? "STOP" : "START"}
			</Button>
			<Button onClick={onReset} className="bg-slate-700 px-12 py-10 rounded-xl text-3xl">
				RESET
			</Button>
		</div>
	)
}
