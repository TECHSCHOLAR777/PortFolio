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

        <ul className="container-prose mt-12 grid gap-4 sm:grid-cols-2">
          {limitations.map((item, i) => (
            <li key={item.claim} className="brutal p-5">
              <p className="text-alert font-mono text-[11px] font-bold tracking-widest">
                {`WARN ${String(i + 1).padStart(2, '0')}`}
              </p>
              <p className="mt-1.5 font-medium">{item.claim}</p>
              <p className="text-muted-foreground mt-2 leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
