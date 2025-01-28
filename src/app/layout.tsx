import type { Metadata } from "next"
import { medievalSharp } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bingo Game",
  description: "シンプルなビンゴゲーム",
  icons: {
    icon: "/logo.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={medievalSharp.className}>{children}</body>
    </html>
  )
}

