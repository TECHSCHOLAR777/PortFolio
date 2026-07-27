import { About } from '@/components/sections/about'
import { Achievements } from '@/components/sections/achievements'
import { Architecture } from '@/components/sections/architecture'
import { Certifications } from '@/components/sections/certifications'
import { Contact } from '@/components/sections/contact'
import { Education } from '@/components/sections/education'
import { Experience } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { Limitations } from '@/components/sections/limitations'
import { SignalStrip } from '@/components/sections/signal-strip'
import { Work } from '@/components/sections/work'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { EpochBar } from '@/components/training/epoch-bar'
import { TrainingProvider } from '@/components/training/progress-provider'

export default function HomePage() {
  return (
    <TrainingProvider>
      <a
        href="#content"
        className="bg-primary text-primary-foreground sr-only rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
      >
        Skip to content
      </a>

      <SiteHeader />
      <EpochBar />

      <main id="content">
        <Hero />
        <SignalStrip />
        <About />
        <Architecture />
        <Work />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <Limitations />
        <Contact />
      </main>

      <SiteFooter />
    </TrainingProvider>
  )
}
