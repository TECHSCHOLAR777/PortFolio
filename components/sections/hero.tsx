import { ArrowDown, Download, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { LiquidHero } from '@/components/liquid-hero'
import { OpenTerminalButton } from '@/components/mode/open-terminal-button'
import { Button } from '@/components/ui/button'
import { site } from '@/content/site'

export function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[90svh] items-center overflow-hidden">
      <LiquidHero />

      <div
        aria-hidden
        className="from-background/30 via-background/70 to-background absolute inset-0 bg-gradient-to-b"
      />

      <div className="container-page relative grid items-center gap-10 py-16 md:grid-cols-[1fr_auto] md:py-20">
        <div>
          <p className="border-alert/60 bg-alert-soft inline-flex items-center gap-2.5 border px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase">
            <span className="live-dot" aria-hidden />
            Open to internships and research collaboration
          </p>

          {/*
           * The name is the headline. Real DOM text, so it stays the largest
           * contentful paint and the shader behind it never delays it.
           */}
          <h1 className="mt-6 text-[22vw] leading-[0.82] sm:text-[17vw] md:text-[9.5rem] lg:text-[11.5rem]">
            <span className="glitch text-signal block" data-text="Rishi">
              Rishi
            </span>
            <span className="text-stroke block">Garg</span>
          </h1>

          <p className="mt-6 max-w-xl font-[family-name:var(--font-heading)] text-xl leading-snug font-medium sm:text-2xl">
            I build AI systems around the people who use them.
          </p>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            Second year software engineering at Delhi Technological University. Researcher at VAIL.
            Cross modal retrieval, gesture interfaces, voice agents, and real turbulent flow.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="font-mono tracking-wider uppercase">
              <a href={site.resume} download>
                <Download className="size-4" />
                Resume
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-mono tracking-wider uppercase">
              <Link href="#work">
                Selected work
                <ArrowDown className="size-4" />
              </Link>
            </Button>
            <OpenTerminalButton />
          </div>

          <div className="text-muted-foreground mt-7 flex flex-wrap items-center gap-5 font-mono text-xs tracking-wider uppercase">
            <a
              className="hover:text-signal inline-flex items-center gap-2 transition-colors"
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              className="hover:text-signal inline-flex items-center gap-2 transition-colors"
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
            <span>{site.location}</span>
          </div>
        </div>

        {/* Duotone portrait: grayscale photo multiplied onto hazard yellow. Hover clears it. */}
        <figure className="group relative mx-auto w-60 sm:w-72 md:w-80">
          <div className="border-signal bg-signal relative overflow-hidden border-2 shadow-[10px_10px_0_0_var(--alert)]">
            <Image
              src="/portrait.jpeg"
              alt="Portrait of Rishi Garg"
              width={455}
              height={549}
              priority
              className="w-full contrast-125 grayscale mix-blend-multiply transition-[mix-blend-mode,filter] duration-300 group-hover:mix-blend-normal"
            />
          </div>
          <figcaption className="bg-background border-signal text-signal absolute -bottom-3 left-4 border-2 px-2 py-0.5 font-mono text-[11px] tracking-wider">
            ~/rishi
          </figcaption>
          <span
            aria-hidden
            className="hazard-tape absolute -top-3 -right-6 h-6 w-28 rotate-12 border-2 border-black"
          />
        </figure>
      </div>
    </section>
  )
}
