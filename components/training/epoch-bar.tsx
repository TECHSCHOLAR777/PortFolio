'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'

import { lossAt, useTraining } from '@/components/training/progress-provider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { epochs } from '@/content/site'
import { cn } from '@/lib/utils'

/**
 * Sparkline of the loss so far, drawn from the same function the bar reports.
 * Sized generously: at 64px the curve was an unreadable squiggle, which is
 * worse than showing nothing.
 */
function LossSparkline({ progress }: { progress: number }) {
  const width = 120
  const height = 22
  const samples = 56

  const points: string[] = []
  for (let i = 0; i < samples; i++) {
    const x = i / (samples - 1)
    if (x > progress) break
    const loss = lossAt(x)
    // fixed domain so the line does not rescale as it grows
    const y = height - ((loss - 0.8) / (4.2 - 0.8)) * height
    points.push(`${(x * width).toFixed(2)},${Math.max(1, Math.min(height - 1, y)).toFixed(2)}`)
  }

  if (points.length < 2) {
    return <svg width={width} height={height} aria-hidden className="hidden md:block" />
  }

  const last = points[points.length - 1].split(',')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className="hidden shrink-0 md:block"
    >
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-signal"
      />
      {/* leading dot marks the current position on the curve */}
      <circle cx={last[0]} cy={last[1]} r="2" className="fill-primary" />
    </svg>
  )
}

/** Segmented track, one tick per section. A smooth bar would read as a reading indicator. */
function EpochTrack({ progress, epochCount }: { progress: number; epochCount: number }) {
  return (
    <div className="flex min-w-24 flex-1 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: epochCount }, (_, i) => {
        const start = i / epochCount
        const fill = Math.min(1, Math.max(0, (progress - start) * epochCount))
        return (
          <div key={i} className="bg-border/70 h-1 flex-1 overflow-hidden rounded-full">
            <div
              className="bg-signal h-full origin-left rounded-full transition-transform duration-150 ease-out"
              style={{ transform: `scaleX(${fill})` }}
            />
          </div>
        )
      })}
    </div>
  )
}

function BoundaryToast() {
  const { justCompleted, clearCompleted, epochCount } = useTraining()

  useEffect(() => {
    if (justCompleted === null) return
    const t = setTimeout(clearCompleted, 1200)
    return () => clearTimeout(t)
  }, [justCompleted, clearCompleted])

  const label = justCompleted ? epochs[justCompleted - 1]?.label : null

  return (
    <AnimatePresence>
      {justCompleted !== null && label ? (
        <motion.div
          key={justCompleted}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="bg-popover text-popover-foreground border-border pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md border px-3 py-1.5 text-xs shadow-sm"
          role="status"
        >
          <span className="tabular text-signal">
            epoch {String(justCompleted).padStart(2, '0')}/{String(epochCount).padStart(2, '0')}
          </span>
          <span className="mx-1.5 opacity-50" aria-hidden>
            ·
          </span>
          {label} complete
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * Reading position, expressed as a training run.
 *
 * Three rules keep this from feeling fake:
 *   1. it scrubs both directions, scrolling up lowers the epoch again
 *   2. it stays docked permanently and never unmounts, it only pulses at a
 *      boundary, because an element that appears and disappears reads as a bug
 *   3. the loss carries seeded jitter, since a perfectly smooth exponential is
 *      the signature of a curve that was drawn rather than measured
 */
export function EpochBar() {
  const { progress, epoch, epochCount, loss, accuracy, converged, active } = useTraining()

  return (
    <div
      className={cn(
        'sticky top-16 z-40 transition-all duration-300',
        active ? 'opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      )}
    >
      <div className="bg-background/80 border-line relative border-b backdrop-blur-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="container-page flex h-11 items-center gap-3 text-xs sm:gap-4"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={epochCount}
              aria-valuenow={epoch}
              aria-label="Reading progress, shown as training epochs"
            >
              <span className="tabular text-muted-foreground shrink-0">
                <span className="text-foreground">
                  {converged ? 'converged' : `epoch ${String(epoch).padStart(2, '0')}`}
                </span>
                {!converged ? `/${String(epochCount).padStart(2, '0')}` : null}
              </span>

              <span className="text-muted-foreground hidden shrink-0 truncate md:inline">
                {epochs[Math.max(0, epoch - 1)]?.label}
              </span>

              <EpochTrack progress={progress} epochCount={epochCount} />

              <LossSparkline progress={progress} />

              <span className="tabular text-muted-foreground shrink-0">
                loss <span className="text-foreground">{loss.toFixed(3)}</span>
              </span>
              <span className="tabular text-muted-foreground hidden shrink-0 sm:inline">
                acc <span className="text-foreground">{accuracy.toFixed(2)}</span>
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            Your position on the page, drawn as a training run. The loss is a function of scroll, not
            a measurement. Real training numbers live in the PT-JEPA case study.
          </TooltipContent>
        </Tooltip>

        <BoundaryToast />
      </div>
    </div>
  )
}
