import { ArrowUpRight } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { certifications } from '@/content/profile'

export function Certifications() {
  return (
    <section id="certifications" className="section-y bg-muted/25 border-border/70 border-y">
      <div className="container-page">
        <SectionHeading
          index="07"
          label="Pretraining"
          title="Coursework, each one verifiable."
          intro="Every entry links to the issuer so the credential can be checked rather than taken on trust."
        />

        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {certifications.map((cert) => (
            <li key={cert.url}>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="border-border bg-card hover:border-primary/40 group flex h-full flex-col items-center justify-center rounded-lg border p-5 text-center transition-colors"
              >
                <h3 className="text-sm font-medium">{cert.title}</h3>
                <p className="text-muted-foreground mt-1.5 text-xs">{cert.issuer}</p>
                <span className="text-primary mt-3 inline-flex items-center gap-1 text-xs">
                  Verify
                  <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
