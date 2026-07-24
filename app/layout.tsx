import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rishigarg.vercel.app'),
  title: 'Rishi Garg | AI Systems Engineer',
  description: 'AI/ML engineer building multimodal, real-time systems across computer vision, voice agents, edge AI, and human-computer interaction.',
  openGraph: {
    title: 'Rishi Garg | AI Systems Engineer',
    description: 'Research-minded engineering for AI systems that perceive, reason, and act in real time.',
    url: 'https://rishigarg.vercel.app',
    siteName: 'Rishi Garg',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1536,
        height: 1024,
        alt: 'Rishi Garg, AI Systems Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishi Garg | AI Systems Engineer',
    description: 'AI systems that see, listen, decide, and respond.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
