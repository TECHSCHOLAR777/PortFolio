import { SectionHeading } from '@/components/section-heading'
import { about } from '@/content/profile'

export function About() {
  return (
    <section id="about" className="section-y">
      <div className="container-page">
        <SectionHeading index="02" label="Overview" title="What I actually work on." />

        {/* Centred block, left aligned prose. Centring paragraphs this long
            costs more legibility than the symmetry is worth. */}
        <div className="container-prose mt-12 space-y-5">
          {about.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
