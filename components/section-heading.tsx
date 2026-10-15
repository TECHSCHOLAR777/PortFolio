import { ScrambleText } from '@/components/scramble-text'
import { cn } from '@/lib/utils'

/**
 * Shared heading for every section, so rhythm never drifts between them.
 *
 * The index sits in a solid yellow block, the label reads like a code comment,
 * and the title is set in the poster face and decodes as it scrolls in.
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
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      <p className="flex items-center justify-center gap-3 font-mono text-[11px] tracking-widest uppercase">
        <span className="bg-signal text-signal-ink px-2 py-0.5 font-bold">{index}</span>
        <span className="text-muted-foreground">{`// ${label}`}</span>
      </p>
      <h2 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">
        <ScrambleText text={title} />
      </h2>
      {intro ? (
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl leading-relaxed">{intro}</p>
      ) : null}
    </div>
  )
}
