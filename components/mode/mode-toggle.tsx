'use client'

import { Monitor, SquareTerminal } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { setMode, useMode, type Mode } from '@/components/mode/mode-store'
import { cn } from '@/lib/utils'

const options: { mode: Mode; label: string; Icon: typeof Monitor }[] = [
  { mode: 'terminal', label: 'Terminal', Icon: SquareTerminal },
  { mode: 'graphical', label: 'Graphical', Icon: Monitor },
]

export function ModeToggle({ className }: { className?: string }) {
  const stored = useMode()
  const pathname = usePathname()
  const router = useRouter()
  // The terminal lives on the home page only. Elsewhere the page is graphical,
  // and choosing the terminal takes the visitor home to it.
  const home = pathname === '/'
  const mode = home ? stored : 'graphical'

  return (
    <div
      role="radiogroup"
      aria-label="View mode"
      className={cn(
        'border-signal/60 bg-background/90 inline-flex items-center border-2 p-0.5 font-mono text-[11px] tracking-wider uppercase backdrop-blur',
        className,
      )}
    >
      {options.map(({ mode: value, label, Icon }) => {
        const active = mode === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => {
              setMode(value)
              if (!home && value === 'terminal') router.push('/')
            }}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 transition-colors',
              active
                ? 'bg-signal text-signal-ink font-bold'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </button>
        )
      })}
    </div>
  )
}
