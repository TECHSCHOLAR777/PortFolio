'use client'

import { useEffect, useState } from 'react'

/** Sparse to dense. Brighter pixels get denser glyphs, so the face lights up on black. */
const RAMP = ' .:-=+*#%@'

/** Anything brighter is studio backdrop and becomes blank space. */
const BACKGROUND = 0.965

/**
 * The portrait, re-drawn as text in the browser.
 *
 * Sampling happens on a canvas the size of the character grid, so each glyph
 * stands for one averaged cell. The near white studio background is cut to
 * blank space, otherwise it would render as a solid block of `@` around the
 * head.
 */
export function AsciiPortrait({ src, cols = 46 }: { src: string; cols?: number }) {
  const [art, setArt] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.src = src
    img.onload = () => {
      // Monospace cells are about twice as tall as wide.
      const rows = Math.round(cols * (img.height / img.width) * 0.5)
      const canvas = document.createElement('canvas')
      canvas.width = cols
      canvas.height = rows
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(img, 0, 0, cols, rows)
      const { data } = ctx.getImageData(0, 0, cols, rows)

      const lums: number[] = []
      for (let i = 0; i < data.length; i += 4) {
        lums.push((0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255)
      }
      // Stretch contrast over the subject only, so the face uses the whole ramp.
      const subject = lums.filter((l) => l <= BACKGROUND)
      const lo = Math.min(...subject)
      const hi = Math.max(...subject)

      let out = ''
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const lum = lums[y * cols + x]
          if (lum > BACKGROUND) {
            out += ' '
            continue
          }
          const t = Math.pow((lum - lo) / (hi - lo || 1), 0.8)
          out += RAMP[Math.min(RAMP.length - 1, Math.floor(t * RAMP.length))]
        }
        out += '\n'
      }
      if (!cancelled) setArt(out)
    }
    return () => {
      cancelled = true
    }
  }, [src, cols])

  return (
    <pre
      aria-label="Portrait of Rishi Garg drawn in text characters"
      role="img"
      className="text-signal min-h-[18rem] font-mono text-[6.5px] leading-[1.05] select-none sm:text-[7.5px]"
    >
      {art ?? ''}
    </pre>
  )
}
