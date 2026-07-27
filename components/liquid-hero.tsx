'use client'

import { LiquidMetal } from '@paper-design/shaders-react'
import { useEffect, useState } from 'react'

import { useTraining } from '@/components/training/progress-provider'

/**
 * The hero metal is the untrained state: molten, unformed, reacting to nothing
 * but the viewer. As the epoch bar trains, the surface settles and cools. That
 * is the only reason this shader is on the page. It is the first frame of the
 * argument the rest of the site makes, not decoration.
 *
 * Rendered as a background layer only. The headline is real DOM text, so it
 * stays the largest contentful paint and the canvas never delays it.
 */
export function LiquidHero() {
  const { progress } = useTraining()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const small = window.matchMedia('(max-width: 767px)')

    const update = () => setEnabled(!reduced.matches && !small.matches)
    update()

    reduced.addEventListener('change', update)
    small.addEventListener('change', update)
    return () => {
      reduced.removeEventListener('change', update)
      small.removeEventListener('change', update)
    }
  }, [])

  // Molten at the top of the page, settled once training converges.
  const settle = Math.min(1, progress * 1.15)

  /*
   * Scaled well past the frame on purpose. At its default size the metaballs
   * read as a single lumpy object sitting behind the headline. Oversized and
   * offset, the same shader reads as a surface the hero is lit by, which is
   * what a background layer should do.
   */
  const common = {
    className: 'size-full',
    shape: 'metaballs' as const,
    colorBack: '#00000000',
    colorTint: '#93a6ba',
    angle: 35,
    scale: 2.6,
    offsetX: 0.32,
    offsetY: -0.18,
  }

  // Radial mask keeps the brightest metal away from the centre, where the
  // headline sits, without dropping a flat scrim over the whole shader.
  const maskStyle = {
    maskImage:
      'radial-gradient(120% 95% at 50% 42%, transparent 0%, transparent 26%, black 62%, black 100%)',
    WebkitMaskImage:
      'radial-gradient(120% 95% at 50% 42%, transparent 0%, transparent 26%, black 62%, black 100%)',
  }

  if (!enabled) {
    // Reduced motion and small screens get a single static frame of the same
    // shader rather than a different looking placeholder.
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden opacity-70" style={maskStyle}>
        <LiquidMetal
          {...common}
          speed={0}
          frame={12000}
          repetition={4.2}
          softness={0.5}
          shiftRed={0.14}
          shiftBlue={0.14}
          distortion={0.14}
          contour={0.85}
          maxPixelCount={1280 * 720}
        />
      </div>
    )
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden opacity-70" style={maskStyle}>
      <LiquidMetal
        {...common}
        // motion slows as the model converges
        speed={1.1 - settle * 0.92}
        repetition={3.6 + settle * 1.8}
        softness={0.6 - settle * 0.28}
        shiftRed={0.26 - settle * 0.2}
        shiftBlue={0.26 - settle * 0.2}
        // the surface stops churning as the loss flattens
        distortion={0.32 - settle * 0.27}
        contour={0.7 + settle * 0.24}
        // cap the render cost, this is a background layer and never the subject
        maxPixelCount={1920 * 1080}
        minPixelRatio={1}
      />
    </div>
  )
}
