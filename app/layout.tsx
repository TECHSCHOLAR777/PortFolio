import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rishigarg.vercel.app'),
  title: 'Rishi Garg — AI Systems Engineer',
  description: 'AI/ML engineer building multimodal, real-time systems across computer vision, voice agents, edge AI, and human-computer interaction.',
  openGraph: {
    title: 'Rishi Garg — AI Systems Engineer',
    description: 'Research-minded engineering for AI systems that perceive, reason, and act in real time.',
    url: 'https://rishigarg.vercel.app',
    siteName: 'Rishi Garg',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
