import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rishi Garg | AI-ML Engineer',
  description: 'Portfolio of Rishi Garg, an AI-ML Engineer specializing in Artificial Intelligence, Machine Learning, and multi-modal systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
