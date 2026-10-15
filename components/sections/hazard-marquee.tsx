import { achievements } from '@/content/profile'

/** Short labels for the tape. The full wording lives in the achievements section. */
const items = [
  'Top 20 · NeurIPS 2026 RealPDE',
  'Top 10 · ISRO Bharatiya Antariksh Hackathon',
  '2nd in department · CGPA 9.70',
  'Top 10 · KRITI at BITS Pilani',
  'Top 30 · SahAI for Shiksha',
  'Researcher · VAIL',
  'JEE Main · top 1%',
]

export function HazardMarquee() {
  return (
    <section aria-label="Highlights" className="relative">
      <div aria-hidden className="hazard-tape h-2.5" />
      <div className="marquee bg-signal text-signal-ink overflow-hidden py-3">
        {/* Two copies so the loop has no seam. Screen readers get the list once. */}
        <ul className="sr-only">
          {achievements.map((a) => (
            <li key={a.title}>{a.title}</li>
          ))}
        </ul>
        <div aria-hidden className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {items.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center font-[family-name:var(--font-display)] text-xl tracking-wide whitespace-nowrap uppercase sm:text-2xl"
                >
                  <span className="px-6">{item}</span>
                  <span className="text-alert text-lg">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden className="hazard-tape h-2.5" />
    </section>
  )
}
