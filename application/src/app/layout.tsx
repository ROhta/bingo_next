import "./globals.css"
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/next"

import {medievalSharp} from "@/app/fonts"

import type {Metadata} from "next"
import type {JSX, ReactNode} from "react"

export const metadata: Metadata = {
	metadataBase: new URL("https://rohta-bingo-next.vercel.app/"),
	title: "Bingo",
	description: "ビンゴアプリケーション",
	icons: {icon: "/logo.ico"},
	openGraph: {
		title: "Bingo",
		description: "ビンゴアプリケーション",
		images: "/ogp.png",
		url: "https://rohta-bingo-next.vercel.app/",
		type: "website",
	},
}

export default function RootLayout({children}: {children: ReactNode}): JSX.Element {
	return (
		<html lang="ja">
			<body className={`${medievalSharp.className} bg-gray-900 text-white`}>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
