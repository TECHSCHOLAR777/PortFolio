import { ArrowUpRight } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { WorkViews } from '@/components/work/work-views'
import { otherProjects } from '@/content/projects'

export function Work() {
  return (
    <section id="work" className="section-y">
      <div className="container-page">
        <SectionHeading
          index="04"
          label="Selected work"
          title="Six systems, with the numbers behind them"
          intro="Each figure carries the data it came from and how it was produced."
        />

        <WorkViews />

        {/*
         * A list, not a card grid. Two of these three have no screenshot, so
         * cards left most of their area empty and read as unfinished. Rows
         * carry text at its natural width and stop advertising the gap.
         */}
        <div className="container-prose mt-20">
          <h3 className="text-muted-foreground text-center text-xs tracking-wide">Also built</h3>

          <ul className="border-line mt-6 border-t">
            {otherProjects.map((project) => (
              <li
                key={project.slug}
                className="border-line hover:bg-surface-alt border-b px-4 py-6 transition-colors"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-medium">{project.title}</h4>
                  <span className="tabular text-muted-foreground text-xs">{project.period}</span>
                </div>

                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {project.tagline}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-muted-foreground text-xs">{project.stack.join(', ')}</p>
                  <span className="grow" />
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-signal inline-flex items-center gap-1 text-xs hover:underline"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3" />
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
