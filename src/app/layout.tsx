import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import localFont from 'next/font/local'

const inter = Inter({ subsets: ['latin'] })

const andale = localFont({
  src: './styles/fonts/ANDALEMO.ttf',
})

export const metadata: Metadata = {
  title: 'Jack Davey – Terminal',
  description: 'A CLI for exploring Jack Davey&#39;s website.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={andale.className}>{children}</body>
    </html>
  )
}
