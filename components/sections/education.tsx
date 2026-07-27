import { SectionHeading } from '@/components/section-heading'
import { education } from '@/content/profile'

export function Education() {
  return (
    <section id="education" className="section-y">
      <div className="container-page">
        <SectionHeading index="06" label="Training data" title="Where the fundamentals came from." />

        <div className="container-prose mt-12 space-y-6">
          {education.map((item) => (
            <div key={item.qualification} className="border-border/70 border-t pt-6 text-center">
              <h3 className="font-medium">{item.qualification}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{item.institution}</p>
              <p className="mt-2 text-sm">
                <span className="tabular text-muted-foreground">{item.period}</span>
                <span className="mx-2 opacity-40" aria-hidden>
                  ·
                </span>
                <span className="tabular">{item.result}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
