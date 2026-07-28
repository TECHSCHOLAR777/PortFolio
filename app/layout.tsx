import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Space_Grotesk } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { site } from '@/content/site'

import './globals.css'

/*
 * Two faces, one job each.
 *
 * Space Grotesk is built on a monospace skeleton, so headings echo the
 * numerals and readouts that run through this site without the page being set
 * in mono, which is what made the previous build look templated. It is wide
 * and slightly mechanical, which reads well large and badly small, so it never
 * touches body copy. Geist Sans keeps that job.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s, ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: `${site.name}, ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: `${site.name}, ${site.role}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}, ${site.role}`,
    description: site.description,
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
