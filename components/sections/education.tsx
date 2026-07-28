import { SectionHeading } from '@/components/section-heading'
import { education } from '@/content/profile'

export function Education() {
  return (
    <section id="education" className="section-y-tight">
      <div className="container-page">
        <SectionHeading index="06" label="Training data" title="Education" />

        {/*
         * Rows, not stacked blocks. School results matter less every year, so
         * they get one line each instead of the three line treatment that only
         * the degree deserves.
         */}
        <dl className="container-prose border-line mt-10 border-t">
          {education.map((item) => (
            <div
              key={item.qualification}
              className="border-line flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-4"
            >
              <dt className="min-w-0">
                <span className="font-medium">{item.qualification}</span>
                <span className="text-muted-foreground block text-sm">{item.institution}</span>
              </dt>
              <dd className="text-right">
                <span className="tabular text-sm">{item.result}</span>
                <span className="tabular text-muted-foreground block text-xs">{item.period}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
