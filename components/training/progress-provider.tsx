'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { epochs } from '@/content/site'

const EPOCH_COUNT = epochs.length

/** Endpoints chosen so the curve falls steeply then flattens, like a real run. */
const LOSS_START = 4.08
const LOSS_FLOOR = 0.9
const DECAY = 3.4

/**
 * Deterministic value noise in [-1, 1].
 *
 * A clean exponential is the giveaway that a curve was drawn rather than
 * measured, so the displayed loss carries reproducible jitter. Seeded, not
 * random, so the same scroll position always reports the same loss and the
 * number never flickers between renders.
 */
function seededNoise(x: number): number {
  const i = Math.floor(x)
  const f = x - i
  const hash = (n: number) => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
    return s - Math.floor(s)
  }
  const a = hash(i) * 2 - 1
  const b = hash(i + 1) * 2 - 1
  // smoothstep between samples so the jitter reads as noise, not as steps
  const t = f * f * (3 - 2 * f)
  return a + (b - a) * t
}

export function lossAt(progress: number): number {
  const p = Math.min(1, Math.max(0, progress))
  const base = LOSS_FLOOR + (LOSS_START - LOSS_FLOOR) * Math.exp(-DECAY * p)
  // jitter shrinks as training settles, same as a real run
  const jitter = seededNoise(p * 26) * 0.16 * (1 - p) ** 1.5
  return Math.max(0.05, base + jitter)
}

export function accuracyAt(progress: number): number {
  const loss = lossAt(progress)
  const raw = 1 - (loss - LOSS_FLOOR) / (LOSS_START - LOSS_FLOOR)
  return Math.min(0.97, Math.max(0, raw) * 0.94)
}

export type TrainingState = {
  /** 0 to 1 across the trained region of the page. */
  progress: number
  /** 0 while still in the hero, then 1 to EPOCH_COUNT. */
  epoch: number
  epochCount: number
  loss: number
  accuracy: number
  converged: boolean
  /** True once the page has scrolled past the hero, which docks the bar. */
  active: boolean
  /** Set when an epoch boundary is crossed, cleared by the toast. */
  justCompleted: number | null
  clearCompleted: () => void
  /** Sparkline samples up to the current position. */
  curve: { x: number; loss: number }[]
}

const TrainingContext = createContext<TrainingState | null>(null)

export function useTraining() {
  const ctx = useContext(TrainingContext)
  if (!ctx) throw new Error('useTraining must be used inside TrainingProvider')
  return ctx
}

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(false)
  const [justCompleted, setJustCompleted] = useState<number | null>(null)

  const lastEpoch = useRef(0)
  const frame = useRef<number | null>(null)

  const clearCompleted = useCallback(() => setJustCompleted(null), [])

  useEffect(() => {
    const measure = () => {
      frame.current = null

      const hero = document.getElementById('hero')
      const end = document.getElementById('training-end')
      if (!end) return

      // Training starts where the hero ends and finishes at the last graded
      // section, so the bar reaches convergence before the contact form
      // rather than at the very bottom of the document.
      const startY = hero ? hero.offsetTop + hero.offsetHeight : 0
      const endY = end.offsetTop + end.offsetHeight
      const span = Math.max(1, endY - startY - window.innerHeight)
      const raw = (window.scrollY - startY + window.innerHeight * 0.35) / span

      const clamped = Math.min(1, Math.max(0, raw))
      setProgress(clamped)
      setActive(window.scrollY > startY - window.innerHeight * 0.6)

      // Scrolling up must move the bar backwards. It is a scrubber, not a
      // ratchet, and a bar that only ever fills reads as fake immediately.
      const currentEpoch = clamped <= 0 ? 0 : Math.min(EPOCH_COUNT, Math.ceil(clamped * EPOCH_COUNT))
      if (currentEpoch > lastEpoch.current && currentEpoch > 0) {
        setJustCompleted(currentEpoch)
      }
      lastEpoch.current = currentEpoch
    }

    const onScroll = () => {
      if (frame.current !== null) return
      frame.current = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  const value = useMemo<TrainingState>(() => {
    const epoch = progress <= 0 ? 0 : Math.min(EPOCH_COUNT, Math.ceil(progress * EPOCH_COUNT))
    const curve = Array.from({ length: 40 }, (_, i) => {
      const x = i / 39
      return { x, loss: x <= progress ? lossAt(x) : Number.NaN }
    })

    return {
      progress,
      epoch,
      epochCount: EPOCH_COUNT,
      loss: lossAt(progress),
      accuracy: accuracyAt(progress),
      converged: progress >= 0.999,
      active,
      justCompleted,
      clearCompleted,
      curve,
    }
  }, [progress, active, justCompleted, clearCompleted])

  return <TrainingContext.Provider value={value}>{children}</TrainingContext.Provider>
}
