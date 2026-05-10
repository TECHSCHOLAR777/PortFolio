import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cognition Engine — Behavioral Intelligence Interface',
  description: 'A live experiment in behavioral intelligence. Your interaction is observed in real time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
