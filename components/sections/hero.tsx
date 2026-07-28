import { ArrowDown, Download, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

import { LiquidHero } from '@/components/liquid-hero'
import { Button } from '@/components/ui/button'
import { site } from '@/content/site'

export function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[88svh] items-center overflow-hidden">
      <LiquidHero />

      {/* Keeps the headline legible over the shader in both themes. Light
          enough that the metal still reads, heavy enough to hold contrast. */}
      <div
        aria-hidden
        className="from-background/40 via-background/75 to-background absolute inset-0 bg-gradient-to-b"
      />

      <div className="container-page relative py-20 text-center">
        <p className="text-muted-foreground text-xs tracking-wide">
          <span className="tabular text-signal">rishi-garg-v2</span>
          <span className="mx-2" aria-hidden>
            ·
          </span>
          model card
        </p>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          I train models, then build the systems that run them.
        </h1>

        <p className="text-muted-foreground container-prose mt-6 leading-relaxed">
          Second year software engineering student at Delhi Technological University. Cross modal
          retrieval, gesture interfaces, voice agents.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href={site.resume} download>
              <Download className="size-4" />
              Download resume
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#work">
              Selected work
              <ArrowDown className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="text-muted-foreground mt-7 flex flex-wrap items-center justify-center gap-5 text-sm">
          <a
            className="hover:text-foreground inline-flex items-center gap-2 transition-colors"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github className="size-4" />
            GitHub
          </a>
          <a
            className="hover:text-foreground inline-flex items-center gap-2 transition-colors"
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="size-4" />
            LinkedIn
          </a>
          <span className="hidden sm:inline">{site.location}</span>
        </div>
      </div>
    </section>
  )
}
