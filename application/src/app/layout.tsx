import "./globals.css"
import { MedievalSharp } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const medievalSharp = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Bingo",
  description: "ビンゴアプリケーション",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/logo.ico" />
        <meta property="description" content="ビンゴアプリケーション" />
        <meta property="og:title" content="Bingo" />
        <meta property="og:image" content="/ogp.png" />
        <meta property="og:url" content="https://rohta-bingo-next.vercel.app/" />
        <meta property="og:type" content="website" />
      </head>
      <body className={`${medievalSharp.className} bg-gray-900 text-white`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

