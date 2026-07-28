import { SectionHeading } from '@/components/section-heading'
import { limitations } from '@/content/profile'

/**
 * Model cards state what a model cannot do.
 *
 * This is the section most portfolios leave out, which is exactly why it
 * belongs. It reads better as a scannable claim plus a line of detail than as
 * five paragraphs of grey text, because the point is that a reader can take it
 * in at a glance rather than feel it is being buried.
 */
export function Limitations() {
  return (
    <section id="limitations" className="section-y">
      <div className="container-page">
        <SectionHeading
          index="08"
          label="Limitations"
          title="Where my experience runs out"
          intro="Two years into a four year degree. These are the edges of what I have done."
        />

        <ul className="container-prose mt-12 grid gap-px sm:grid-cols-2">
          {limitations.map((item, i) => (
            <li
              key={item.claim}
              className="border-line bg-surface hover:border-border rounded-lg border p-5 transition-colors"
            >
              <p className="flex items-baseline gap-2.5 font-medium">
                <span className="tabular text-ink-subtle text-xs">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.claim}
              </p>
              <p className="text-muted-foreground mt-2 leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
