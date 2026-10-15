import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Anton, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

import { modeScript } from '@/components/mode/mode-script'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { site } from '@/content/site'

import './globals.css'

/*
 * Four faces, one job each. Anton is the poster face for the two big heading
 * levels. JetBrains Mono runs the terminal and every number. Space Grotesk
 * carries small headings, where Anton gets cramped, and Geist Sans keeps body
 * copy, where it is quietest.
 */
const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

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
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} ${anton.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Runs before first paint so the terminal never flashes the page under it. */}
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
        </ThemeProvider>
        <div aria-hidden className="crt-overlay" />
      </body>
    </html>
  )
}
