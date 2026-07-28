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
        <p className="text-xl font-medium tracking-tight text-balance">
          Currently looking for internships and research collaboration.
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

        {/* A colophon is a small thing, and it says the build was deliberate. */}
        <p className="text-ink-subtle mx-auto mt-10 max-w-xl text-xs leading-relaxed">
          Built with Next.js, Tailwind and shadcn/ui. The hero shader is Paper Design. The
          similarity map is computed offline with all-MiniLM-L6-v2 and PCA, and the script that
          produces it is in the repository. The epoch bar is scroll position drawn as a training
          run, and it says so when you hover it.
        </p>

        <p className="text-ink-subtle mt-6 text-xs">
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
