'use client'

import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>_/[]{}=+*^?#%&01'

/**
 * Text that decodes itself the first time it scrolls into view.
 *
 * The server renders the final string, so search engines, screen readers and
 * reduced motion visitors only ever see the real words.
 */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // A timer rather than animation frames: frames pause in background tabs,
    // which would leave a heading stuck as noise.
    let frame = 0
    let timer = 0
    const total = 22

    const tick = () => {
      frame++
      const settled = Math.floor((frame / total) * text.length)
      setShown(
        text
          .split('')
          .map((ch, i) =>
            i < settled || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(''),
      )
      if (frame >= total) {
        window.clearInterval(timer)
        setShown(text)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = window.setInterval(tick, 32)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearInterval(timer)
    }
  }, [text])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown}</span>
    </span>
  )
}
