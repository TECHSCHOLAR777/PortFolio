'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

import { ModeToggle } from '@/components/mode/mode-toggle'
import { useMode } from '@/components/mode/mode-store'
import { AsciiPortrait } from '@/components/terminal/ascii-portrait'
import { Cmd, commandNames, commands, Neofetch, ShellContext } from '@/components/terminal/commands'
import { projects } from '@/content/projects'

const BANNER = String.raw`██████╗ ██╗███████╗██╗  ██╗██╗     ██████╗  █████╗ ██████╗  ██████╗
██╔══██╗██║██╔════╝██║  ██║██║    ██╔════╝ ██╔══██╗██╔══██╗██╔════╝
██████╔╝██║███████╗███████║██║    ██║  ███╗███████║██████╔╝██║  ███╗
██╔══██╗██║╚════██║██╔══██║██║    ██║   ██║██╔══██║██╔══██╗██║   ██║
██║  ██║██║███████║██║  ██║██║    ╚██████╔╝██║  ██║██║  ██║╚██████╔╝
╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝`

/** Boot log, styled as a model coming up. Plays once per browser session. */
const BOOT: { t: string; text: string; tone?: 'ok' | 'warn' }[] = [
  { t: '0.000', text: 'rishi-os 2.0 (tty1), booting from rishi-garg.ckpt' },
  { t: '0.041', text: 'cuda: 1 x T4 found, graph capture enabled' },
  { t: '0.118', text: 'data: loading DTU coursework, 7 builds, 2 leaderboards' },
  { t: '0.203', text: 'mount: /lab/vail as rw' },
  { t: '0.286', text: 'train: epoch 01/06 ......... loss 3.478' },
  { t: '0.352', text: 'train: epoch 03/06 ......... loss 1.204' },
  { t: '0.419', text: 'train: epoch 06/06 ......... loss 0.311' },
  { t: '0.488', text: 'eval: top20@neurips-realpde  top10@isro-bah  rank2@dept', tone: 'ok' },
  { t: '0.533', text: 'warn: limitations.log is not empty, see `limitations`', tone: 'warn' },
  { t: '0.571', text: 'model ready, starting shell', tone: 'ok' },
]

const CHIPS = [
  'help',
  'whoami',
  'ls',
  'cat realpde',
  'experience',
  'achievements',
  'skills',
  'contact',
  'resume',
  'sudo hire rishi',
  'gui',
]

type Line = { id: number; node: ReactNode }

function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-signal font-bold">rishi</span>
      <span className="text-muted-foreground">@</span>
      <span className="text-alert font-bold">vail</span>
      <span className="text-muted-foreground">:~$</span>
    </span>
  )
}

function Welcome() {
  return (
    <div className="space-y-5 pb-2">
      <pre
        className="glitch text-signal overflow-hidden font-mono text-[6px] leading-[1.15] sm:text-[9px] lg:text-[13px]"
        data-text={BANNER}
        aria-label="Rishi Garg"
        role="img"
      >
        {BANNER}
      </pre>
      <div className="grid items-start gap-6 lg:grid-cols-[auto_1fr]">
        <AsciiPortrait src="/portrait.jpeg" cols={58} />
        <Neofetch />
      </div>
      <p className="text-muted-foreground">
        Type a command, or click one. New here? Start with <Cmd run="whoami" />, then{' '}
        <Cmd run="cat realpde" />.
      </p>
    </div>
  )
}

export function Terminal() {
  const mode = useMode()
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const [booting, setBooting] = useState(false)
  const started = useRef(false)
  const nextId = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const push = useCallback((node: ReactNode) => {
    setLines((prev) => [...prev, { id: nextId.current++, node }])
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const run = useCallback(
    (raw: string) => {
      const text = raw.trim()
      push(
        <p className="flex gap-2">
          <Prompt />
          <span>{text}</span>
        </p>,
      )
      if (!text) return
      setHistory((h) => [...h, text])
      setCursor(-1)

      const [name, ...args] = text.split(/\s+/)
      const command = commands.find((c) => c.name === name.toLowerCase())
      if (!command) {
        push(
          <p>
            <span className="text-alert">{`command not found: ${name}`}</span>
            <span className="text-muted-foreground">{'. Type '}</span>
            <Cmd run="help" />
          </p>,
        )
        return
      }
      const out = command.run(args, { run, clear, history: [...history, text] })
      if (out) push(out)
    },
    [push, clear, history],
  )

  const shell = useMemo(() => ({ run, clear, history }), [run, clear, history])

  // Boot once, the first time the terminal is actually on screen.
  useEffect(() => {
    if (mode !== 'terminal' || started.current) return
    started.current = true

    let seen = false
    try {
      seen = sessionStorage.getItem('rg-booted') === '1'
      sessionStorage.setItem('rg-booted', '1')
    } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const finish = () => {
      setBooting(false)
      setLines([{ id: nextId.current++, node: <Welcome /> }])
    }

    if (seen || reduced) {
      finish()
      return
    }

    setBooting(true)
    const timers: number[] = []
    BOOT.forEach((line, i) => {
      timers.push(
        window.setTimeout(() => {
          push(
            <p>
              <span className="text-muted-foreground">{`[${line.t.padStart(8, ' ')}] `}</span>
              <span
                className={
                  line.tone === 'ok' ? 'text-signal' : line.tone === 'warn' ? 'text-alert' : undefined
                }
              >
                {line.text}
              </span>
            </p>,
          )
        }, 90 * i),
      )
    })
    timers.push(window.setTimeout(finish, 90 * BOOT.length + 450))

    const skip = () => {
      timers.forEach(clearTimeout)
      finish()
    }
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('pointerdown', skip, { once: true })
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [mode, push])

  // Keep the newest output in view.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  useEffect(() => {
    if (mode === 'terminal' && !booting) inputRef.current?.focus({ preventScroll: true })
  }, [mode, booting])

  const complete = () => {
    const parts = input.split(/\s+/)
    if (parts.length <= 1) {
      const hits = commandNames.filter((n) => n.startsWith(parts[0].toLowerCase()))
      if (hits.length === 1) setInput(`${hits[0]} `)
      else if (hits.length > 1) push(<p className="text-muted-foreground">{hits.join('  ')}</p>)
      return
    }
    const [cmd, partial] = parts
    if (!['cat', 'eval', 'open'].includes(cmd)) return
    const hits = projects.map((p) => p.slug).filter((s) => s.startsWith(partial.toLowerCase()))
    if (hits.length === 1) setInput(`${cmd} ${hits[0]}`)
    else if (hits.length > 1) push(<p className="text-muted-foreground">{hits.join('  ')}</p>)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      complete()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cursor === -1) return
      const next = cursor + 1
      if (next >= history.length) {
        setCursor(-1)
        setInput('')
      } else {
        setCursor(next)
        setInput(history[next])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      clear()
    }
  }

  return (
    <ShellContext.Provider value={shell}>
      <div
        className="terminal-shell bg-background fixed inset-0 z-[60] flex-col p-2 font-mono text-[12px] leading-relaxed sm:p-4 sm:text-[13px] lg:p-6"
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true })
        }}
      >
        <div className="border-signal/50 bg-surface relative flex min-h-0 flex-1 flex-col border-2 shadow-[6px_6px_0_0_var(--alert)]">
          <div className="border-signal/40 bg-background flex items-center gap-3 border-b-2 px-3 py-2">
            <span className="flex gap-1.5" aria-hidden>
              <span className="bg-alert size-3" />
              <span className="bg-signal size-3" />
              <span className="bg-ink-subtle size-3" />
            </span>
            <span className="text-muted-foreground hidden truncate text-xs sm:inline">
              rishi@vail: ~/portfolio
            </span>
            <span className="grow" />
            <ModeToggle />
          </div>

          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
            className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-4 sm:px-5"
          >
            {lines.map((line) => (
              <div key={line.id}>{line.node}</div>
            ))}

            {!booting ? (
              <label className="flex items-center gap-2">
                <Prompt />
                <span className="sr-only">Command</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  className="caret-signal min-w-0 flex-1 bg-transparent outline-none"
                  style={{ caretColor: 'var(--signal)' }}
                />
              </label>
            ) : (
              <p className="text-muted-foreground">press any key to skip</p>
            )}
          </div>

          <div className="border-signal/30 bg-background flex flex-wrap gap-x-3 gap-y-1 border-t-2 px-3 py-2 text-xs">
            <span className="text-muted-foreground">try:</span>
            {CHIPS.map((c) => (
              <Cmd key={c} run={c} />
            ))}
          </div>
        </div>
      </div>
    </ShellContext.Provider>
  )
}
