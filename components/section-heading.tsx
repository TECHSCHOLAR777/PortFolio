import { cn } from '@/lib/utils'

/**
 * Shared heading for every section, so rhythm never drifts between them.
 *
 * The index digits are set in mono because they are numbers. The label beside
 * them is not, which is the rule that keeps this from reading like the old
 * build where every label on the page was monospaced.
 */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string
  label: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      <p className="text-muted-foreground flex items-center justify-center gap-2 text-xs tracking-wide">
        <span className="tabular text-primary">{index}</span>
        <span aria-hidden className="bg-border h-px w-6" />
        <span>{label}</span>
      </p>
      <h2 className="mt-5 text-3xl font-medium tracking-tight text-balance sm:text-4xl">{title}</h2>
      {intro ? <p className="text-muted-foreground mt-4 leading-relaxed">{intro}</p> : null}
    </div>
  )
}
