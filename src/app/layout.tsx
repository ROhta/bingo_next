import "./globals.css"
import { MedievalSharp } from "next/font/google"

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
      </head>
      <body className={`${medievalSharp.className} bg-gray-900 text-white`}>{children}</body>
    </html>
  )
}

