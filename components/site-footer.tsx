import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="border-border/70 border-t">
      <div className="container-page py-10 text-center">
        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <a className="hover:text-foreground transition-colors" href={site.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="hover:text-foreground transition-colors" href={site.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="hover:text-foreground transition-colors" href={site.links.leetcode} target="_blank" rel="noreferrer">
            LeetCode
          </a>
          <a className="hover:text-foreground transition-colors" href={`mailto:${site.email}`}>
            Email
          </a>
        </div>

        {/* A colophon is a small thing that says the build was deliberate. */}
        <p className="text-muted-foreground mx-auto mt-6 max-w-lg text-xs leading-relaxed">
          Built with Next.js, Tailwind and shadcn/ui. The hero shader is Paper Design. The similarity
          map is computed offline with all-MiniLM-L6-v2 and PCA. The epoch bar is a scroll position
          drawn as a training run, and it says so when you hover it.
        </p>

        <p className="text-muted-foreground mt-4 text-xs">
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
