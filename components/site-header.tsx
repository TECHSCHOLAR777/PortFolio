'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { ModeToggle } from '@/components/mode/mode-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { site } from '@/content/site'

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#architecture', label: 'Stack' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-background/85 border-signal/30 sticky top-0 z-50 border-b-2 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <span className="bg-signal text-signal-ink px-1.5 font-[family-name:var(--font-display)] text-xl leading-tight">
            RG<span className="text-alert">.</span>
          </span>
          <span className="text-muted-foreground hidden font-mono text-[11px] tracking-wider uppercase lg:inline">
            {site.role}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              size="sm"
              className="hover:text-signal font-mono text-xs tracking-wider uppercase"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ModeToggle className="mr-1 hidden sm:inline-flex" />
          <ThemeToggle />
          <Button asChild size="sm" className="hidden font-mono tracking-wider uppercase lg:inline-flex">
            <a href={site.resume} download>
              Resume
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                <ModeToggle className="mb-3 self-start" />
                {nav.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setOpen(false)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
                <Button asChild className="mt-3">
                  <a href={site.resume} download>
                    Download resume
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
