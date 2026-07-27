import { cn } from '@/lib/utils'

/**
 * Shared heading for every section, so rhythm never drifts between them.
 *
 * Two rules hold here. The index digits are monospaced because they are
 * numbers, while the label beside them is not, which is what keeps the page
 * from looking like the old build where every label was monospaced. And the
 * heading itself is plain English with no trailing full stop: the model card
 * conceit lives entirely in the small label above it, so the heading is free
 * to just say what the section is.
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
      <p className="flex items-center justify-center gap-2.5 text-xs">
        <span className="tabular border-primary/25 bg-primary/10 text-primary rounded-full border px-2 py-0.5">
          {index}
        </span>
        <span className="text-muted-foreground tracking-wide">{label}</span>
      </p>
      <h2 className="mt-5 text-3xl font-medium tracking-tight text-balance sm:text-4xl">{title}</h2>
      {intro ? (
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl leading-relaxed">{intro}</p>
      ) : null}
    </div>
  )
}
