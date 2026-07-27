import { SectionHeading } from '@/components/section-heading'
import { limitations } from '@/content/profile'

/**
 * Model cards state what a model cannot do.
 *
 * This is the section most portfolios leave out, which is exactly why it
 * belongs. Naming the gaps precisely is more persuasive than implying there
 * are none, and a reader who finds a limitation stated plainly tends to trust
 * the numbers above it.
 */
export function Limitations() {
  return (
    <section id="limitations" className="section-y bg-muted/25 border-border/70 border-y">
      <div className="container-page">
        <SectionHeading
          index="09"
          label="Limitations"
          title="What this model has not learned yet."
          intro="I am two years into a degree. These are the honest edges of what I have done."
        />

        <ul className="container-prose mt-12 space-y-4">
          {limitations.map((item) => (
            <li key={item} className="border-border/70 flex gap-3 border-t pt-4">
              <span aria-hidden className="text-muted-foreground/50 mt-1.5 select-none">
                &bull;
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
