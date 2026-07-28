import { ArrowUp } from 'lucide-react'

import { site } from '@/content/site'

const links = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'LeetCode', href: site.links.leetcode },
]

export function SiteFooter() {
  return (
    <footer className="border-line border-t">
      <div className="container-page py-14 text-center">
        {/* The hero already says he is open to work. Repeating it here would
            be the page telling a reader something they were told at the top. */}
        <p className="text-xl font-medium tracking-tight text-balance">
          Thanks for reading this far.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="text-signal mt-3 inline-block text-sm hover:underline"
        >
          {site.email}
        </a>

        <div className="text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              className="hover:text-foreground transition-colors"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
          <a className="hover:text-foreground transition-colors" href={site.resume} download>
            Resume
          </a>
          <a className="hover:text-foreground transition-colors" href="#hero">
            <span className="inline-flex items-center gap-1">
              Top
              <ArrowUp className="size-3" />
            </span>
          </a>
        </div>

        {/*
         * No colophon. It used to list the libraries and then explain how the
         * epoch bar and the similarity map worked, which is the site defending
         * its own ideas in the footer. Anyone who wants to know can read the
         * repository, and everyone else was being talked at.
         */}
        <p className="text-ink-subtle mt-12 text-xs">
          <span className="tabular">&copy; {new Date().getFullYear()}</span> {site.name}
          <span className="mx-2" aria-hidden>
            ·
          </span>
          {site.location}
        </p>
      </div>
    </footer>
  )
}
