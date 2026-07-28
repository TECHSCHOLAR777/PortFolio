import { SectionHeading } from '@/components/section-heading'
import { experience } from '@/content/profile'

export function Experience() {
  return (
    <section id="experience" className="section-y-tight">
      <div className="container-page">
        <SectionHeading index="05" label="Fine tuning" title="Research work" />

        {/* Same row rhythm as education and achievements below, so the whole
            credentials band reads as one table rather than three layouts. */}
        <ol className="container-prose border-line mt-10 border-t">
          {experience.map((item) => (
            <li key={`${item.org}-${item.role}`} className="border-line border-b py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="flex items-center gap-2 font-medium">
                  {item.role}
                  {item.status === 'ongoing' ? (
                    <span className="border-signal/30 bg-signal-soft text-signal rounded-full border px-2 py-0.5 text-xs font-normal">
                      ongoing
                    </span>
                  ) : null}
                </h3>
                <span className="tabular text-muted-foreground text-xs">{item.period}</span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">{item.org}</p>
              <p className="text-muted-foreground mt-2 leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
