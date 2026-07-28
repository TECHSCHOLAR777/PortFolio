import { ArrowUpRight } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { achievements } from '@/content/profile'

export function Achievements() {
  return (
    /* The trained region of the page ends here, which is why the epoch bar
       reaches convergence before the contact form rather than at the very
       bottom of the document. */
    <section id="achievements" className="section-y-tight">
      <div className="container-page">
        <SectionHeading index="07" label="Recognition" title="Achievements" />

        {/*
         * Rows on a year rail, matching the education block above it. Six
         * centred blocks each stacking four lines made this the tallest
         * section in the credentials band for the least content in it.
         */}
        <ol className="container-prose border-line mt-10 border-t">
          {achievements.map((item) => (
            <li
              key={item.title}
              className="border-line grid grid-cols-[3.5rem_1fr] gap-x-4 border-b py-4 text-left"
            >
              <span className="tabular text-muted-foreground pt-0.5 text-xs">{item.year}</span>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  {item.detail}
                  {item.url ? (
                    <>
                      {' '}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-signal inline-flex items-center gap-0.5 whitespace-nowrap hover:underline"
                      >
                        Proof
                        <ArrowUpRight className="size-3" />
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div id="training-end" aria-hidden />
    </section>
  )
}
