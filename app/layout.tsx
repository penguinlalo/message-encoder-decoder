import type { Metadata } from 'next'
import { Inter } from "next/font/google" 
import './globals.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "pnguin's emoji encoder",
  description: "Encode secret messages in emojis, letters, and numbers",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐧</text></svg>"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
