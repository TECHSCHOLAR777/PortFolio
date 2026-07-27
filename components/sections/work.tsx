import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { SectionHeading } from '@/components/section-heading'
import { WorkViews } from '@/components/work/work-views'
import { Button } from '@/components/ui/button'
import { otherProjects } from '@/content/projects'

export function Work() {
  return (
    <section id="work" className="section-y">
      <div className="container-page">
        <SectionHeading
          index="04"
          label="Selected work"
          title="Six systems, and what each one is actually worth."
          intro="Every figure below carries the dataset it came from and how it was measured. Where something was never measured, it says so."
        />

        <WorkViews />

        <div className="mt-16">
          <h3 className="text-center text-sm font-medium">Also built</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {otherProjects.map((project) => (
              <article
                key={project.slug}
                className="border-border bg-card flex flex-col rounded-lg border p-5 text-center"
              >
                <p className="text-muted-foreground text-xs">{project.period}</p>
                <h4 className="mt-2 font-medium">{project.title}</h4>
                <p className="text-muted-foreground mt-2 grow text-sm leading-relaxed">
                  {project.tagline}
                </p>
                <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <li
                      key={tech}
                      className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-xs"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {project.links.map((link) => (
                    <Button key={link.url} asChild variant="ghost" size="sm">
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeaturedLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Button asChild variant="outline">
      <Link href={`/work/${slug}`}>
        {children}
        <ArrowUpRight className="size-4" />
      </Link>
    </Button>
  )
}
