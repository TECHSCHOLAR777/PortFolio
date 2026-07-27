import { LiveStats } from '@/components/live-stats'

const facts = [
  { value: '9.90', label: 'SGPA at DTU', note: 'second in the department' },
  { value: 'Top 10', label: 'ISRO hackathon 2026', note: 'national, problem statement 11' },
  { value: '6', label: 'systems shipped', note: 'from edge inference to retrieval' },
]

export function SignalStrip() {
  return (
    <section id="signal" aria-label="Key figures" className="border-border/70 border-y">
      <div className="container-page grid grid-cols-2 gap-px py-0 md:grid-cols-5">
        {facts.map((fact) => (
          <div key={fact.label} className="px-2 py-8 text-center md:py-10">
            <p className="tabular text-2xl font-medium tracking-tight sm:text-3xl">{fact.value}</p>
            <p className="mt-2 text-sm">{fact.label}</p>
            <p className="text-muted-foreground mt-1 text-xs">{fact.note}</p>
          </div>
        ))}
        <LiveStats />
      </div>
    </section>
  )
}
