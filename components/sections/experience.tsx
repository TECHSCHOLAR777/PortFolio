import { SectionHeading } from '@/components/section-heading'
import { experience } from '@/content/profile'

export function Experience() {
  return (
    <section id="experience" className="section-y bg-muted/25 border-border/70 border-y">
      <div className="container-page">
        <SectionHeading
          index="05"
          label="Fine tuning"
          title="Research and where I learned the fundamentals."
        />

        <ol className="container-prose mt-12 space-y-8">
          {experience.map((item) => (
            <li key={`${item.org}-${item.role}`} className="border-border/70 border-t pt-6">
              <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
                <h3 className="font-medium">{item.role}</h3>
                {item.status === 'ongoing' ? (
                  <span className="border-primary/30 bg-primary/10 text-primary rounded-full border px-2 py-0.5 text-xs">
                    ongoing
                  </span>
                ) : null}
              </div>
              <p className="text-muted-foreground mt-1 text-center text-sm">
                {item.org}
                <span className="mx-2" aria-hidden>
                  ·
                </span>
                <span className="tabular">{item.period}</span>
              </p>
              <p className="text-muted-foreground mt-3 text-center text-sm leading-relaxed">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
