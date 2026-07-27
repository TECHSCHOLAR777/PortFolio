import { ArrowUpRight } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { achievements } from '@/content/profile'

export function Achievements() {
  return (
    /* The trained region of the page ends here, which is why the epoch bar
       reaches convergence before the contact form rather than at the very
       bottom of the document. */
    <section id="achievements" className="section-y">
      <div className="container-page">
        <SectionHeading index="08" label="Eval results" title="Results that were scored by others." />

        <ol className="container-prose mt-12 space-y-6">
          {achievements.map((item) => (
            <li key={item.title} className="border-border/70 border-t pt-6 text-center">
              <p className="tabular text-primary text-xs">{item.year}</p>
              <h3 className="mt-1.5 font-medium text-balance">{item.title}</h3>
              <p className="text-muted-foreground mt-1.5 text-sm">{item.detail}</p>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary mt-2 inline-flex items-center gap-1 text-xs hover:underline"
                >
                  Proof
                  <ArrowUpRight className="size-3" />
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      <div id="training-end" aria-hidden />
    </section>
  )
}
