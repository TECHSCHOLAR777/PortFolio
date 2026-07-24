'use client'

import { useEffect, useRef } from 'react'

type BackgroundTreatment = 'quiet' | 'halo'

export interface ParticlePortraitProps {
  src: string
  accentColor?: string
  particleDensity?: number
  backgroundTreatment?: BackgroundTreatment
  className?: string
}

type Particle = {
  x: number
  y: number
  homeX: number
  homeY: number
  startX: number
  startY: number
  radius: number
  alpha: number
  tone: number
  phase: number
  depth: number
  delay: number
  accent: boolean
  right: number
  down: number
}

const TAU = Math.PI * 2

function clamp(value: number) {
  return Math.max(0, Math.min(1, value))
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

export default function ParticlePortrait({
  src,
  accentColor = '#e06a32',
  particleDensity = 1,
  backgroundTreatment = 'halo',
  className = '',
}: ParticlePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: false })
    if (!context) return

    const image = new Image()
    image.decoding = 'async'

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let onScreen = true
    let disposed = false
    let documentVisible = !document.hidden
    let startTime = performance.now()
    let pointerX = -9999
    let pointerY = -9999
    let targetPointerX = -9999
    let targetPointerY = -9999
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const makeParticle = (
      homeX: number,
      homeY: number,
      luminance: number,
      matteAlpha: number,
      bodyAlpha: number,
      seed: number,
      detail: boolean,
    ): Particle => {
      const angle = (seed % 628) / 100
      const depth = .2 + ((seed >>> 3) % 80) / 100
      const scatter = 22 + (seed % 54) * depth
      const alpha = (.3 + luminance * .64) * matteAlpha * bodyAlpha

      return {
        x: homeX + Math.cos(angle) * scatter,
        y: homeY + Math.sin(angle) * scatter,
        homeX,
        homeY,
        startX: homeX + Math.cos(angle) * scatter,
        startY: homeY + Math.sin(angle) * scatter,
        radius: .48 + luminance * (detail ? 1.14 : .94),
        alpha,
        tone: Math.round(112 + luminance * 98),
        phase: (seed % 1000) / 100,
        depth,
        delay: detail ? (seed % 9) / 100 : .1 + (seed % 19) / 100,
        accent: seed % 211 === 0 && matteAlpha > .7 && bodyAlpha > .7,
        right: -1,
        down: -1,
      }
    }

    const samplePortrait = () => {
      if (!image.naturalWidth || !image.naturalHeight || !width || !height) return

      const sampleWidth = Math.min(520, image.naturalWidth)
      const sampleHeight = Math.round(sampleWidth * image.naturalHeight / image.naturalWidth)
      const source = document.createElement('canvas')
      source.width = sampleWidth
      source.height = sampleHeight
      const sourceContext = source.getContext('2d', { willReadFrequently: true })
      if (!sourceContext) return

      sourceContext.drawImage(image, 0, 0, sampleWidth, sampleHeight)
      const pixels = sourceContext.getImageData(0, 0, sampleWidth, sampleHeight).data
      const portraitAspect = sampleWidth / sampleHeight
      const drawHeight = Math.min(height * 1.04, width / portraitAspect)
      const drawWidth = drawHeight * portraitAspect
      const offsetX = width - drawWidth * .94
      const offsetY = height - drawHeight
      const step = Math.max(3.8, 4.5 / Math.max(.55, particleDensity))
      const columns = Math.ceil(sampleWidth / step)
      const rows = Math.ceil(sampleHeight / step)
      const grid = new Int32Array(columns * rows)
      grid.fill(-1)
      const next: Particle[] = []

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = Math.min(sampleWidth - 1, Math.floor(column * step))
          const y = Math.min(sampleHeight - 1, Math.floor(row * step))
          const pixelIndex = y * sampleWidth + x
          const offset = pixelIndex * 4
          const sourceAlpha = pixels[offset + 3] / 255

          // Subject membership comes only from the prepared alpha matte.
          if (sourceAlpha < .18) continue

          const luminance = (
            pixels[offset] * .2126 +
            pixels[offset + 1] * .7152 +
            pixels[offset + 2] * .0722
          ) / 255
          const nx = x / sampleWidth
          const ny = y / sampleHeight
          const faceDistance = Math.pow((nx - .51) / .34, 2) + Math.pow((ny - .36) / .3, 2)
          const identityZone = faceDistance < 1
          const deterministic = ((x * 73856093) ^ (y * 19349663)) >>> 0

          // Clothing remains legible but is a little quieter than the face.
          if (!identityZone && deterministic % 8 === 0) continue

          const matteAlpha = clamp((sourceAlpha - .12) / .72)
          const bodyAlpha = ny < .82 ? 1 : .22 + .78 * clamp(1 - (ny - .82) / .18)
          const homeX = offsetX + nx * drawWidth
          const homeY = offsetY + ny * drawHeight
          const particle = makeParticle(
            homeX,
            homeY,
            luminance,
            matteAlpha,
            bodyAlpha,
            deterministic,
            identityZone,
          )
          particle.delay += identityZone ? 0 : .08 + ny * .08
          const particleIndex = next.push(particle) - 1
          grid[row * columns + column] = particleIndex

          // Extra samples around the face preserve the eyes, nose, mouth, and jaw.
          if (identityZone && deterministic % 10 === 0) {
            const detailX = Math.min(sampleWidth - 1, x + Math.max(1, Math.floor(step / 2)))
            const detailOffset = (y * sampleWidth + detailX) * 4
            const detailAlpha = pixels[detailOffset + 3] / 255
            if (detailAlpha >= .18) {
              const detailLuminance = (
                pixels[detailOffset] * .2126 +
                pixels[detailOffset + 1] * .7152 +
                pixels[detailOffset + 2] * .0722
              ) / 255
              next.push(makeParticle(
                offsetX + (detailX / sampleWidth) * drawWidth,
                homeY,
                detailLuminance,
                clamp((detailAlpha - .12) / .72),
                bodyAlpha,
                deterministic + 17,
                true,
              ))
            }
          }
        }
      }

      // Cache mesh neighbours once. No spatial lookups happen during animation.
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const particleIndex = grid[row * columns + column]
          if (particleIndex < 0) continue
          next[particleIndex].right = column + 1 < columns
            ? grid[row * columns + column + 1]
            : -1
          next[particleIndex].down = row + 1 < rows
            ? grid[(row + 1) * columns + column]
            : -1
        }
      }

      particles = next
      startTime = performance.now()
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      samplePortrait()
      requestFrame()
    }

    const requestFrame = () => {
      if (disposed || frameRef.current || !onScreen || !documentVisible) return
      frameRef.current = requestAnimationFrame(render)
    }

    const render = (time: number) => {
      frameRef.current = undefined
      if (disposed || !onScreen || !documentVisible) return

      context.fillStyle = '#070809'
      context.fillRect(0, 0, width, height)

      if (backgroundTreatment === 'halo') {
        const halo = context.createRadialGradient(width * .72, height * .4, 8, width * .72, height * .4, width * .58)
        halo.addColorStop(0, 'rgba(199,205,210,.09)')
        halo.addColorStop(.52, 'rgba(199,205,210,.024)')
        halo.addColorStop(1, 'rgba(7,8,9,0)')
        context.fillStyle = halo
        context.fillRect(0, 0, width, height)
      }

      pointerX += (targetPointerX - pointerX) * .075
      pointerY += (targetPointerY - pointerY) * .075
      const assembly = reducedMotion ? 1 : clamp((time - startTime) / 1500)

      // First update all positions, so mesh links and dots share one stable state.
      for (const particle of particles) {
        const localAssembly = reducedMotion
          ? 1
          : easeOutCubic(clamp((assembly - particle.delay) / Math.max(.01, 1 - particle.delay)))
        const dx = particle.homeX - pointerX
        const dy = particle.homeY - pointerY
        const distanceSquared = dx * dx + dy * dy
        const influence = reducedMotion || distanceSquared > 9200
          ? 0
          : 1 - Math.sqrt(distanceSquared) / 96
        const drift = reducedMotion || assembly < 1
          ? 0
          : Math.sin(time * .00036 + particle.phase) * .28 * particle.depth
        const displacementX = influence > 0 ? dx * influence * .04 * particle.depth : 0
        const displacementY = influence > 0 ? dy * influence * .04 * particle.depth : 0
        const restingX = particle.homeX + drift + displacementX
        const restingY = particle.homeY + drift * .55 + displacementY

        particle.x = particle.startX + (restingX - particle.startX) * localAssembly
        particle.y = particle.startY + (restingY - particle.startY) * localAssembly
      }

      // The mesh appears only after the face is nearly assembled.
      const linkAlpha = clamp((assembly - .76) / .24)
      if (linkAlpha > .01) {
        context.beginPath()
        context.lineWidth = .45
        for (const particle of particles) {
          for (const neighbourIndex of [particle.right, particle.down]) {
            if (neighbourIndex < 0) continue
            const neighbour = particles[neighbourIndex]
            context.moveTo(particle.x, particle.y)
            context.lineTo(neighbour.x, neighbour.y)
          }
        }
        context.strokeStyle = `rgba(199,205,210,${.038 * linkAlpha})`
        context.stroke()
      }

      for (const particle of particles) {
        const localAssembly = reducedMotion
          ? 1
          : easeOutCubic(clamp((assembly - particle.delay) / Math.max(.01, 1 - particle.delay)))
        const visibleAlpha = particle.alpha * localAssembly
        if (visibleAlpha < .01) continue

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, TAU)
        context.fillStyle = particle.accent
          ? accentColor
          : `rgba(${particle.tone},${particle.tone + 5},${particle.tone + 10},${visibleAlpha})`
        context.fill()
      }

      context.fillStyle = 'rgba(199,205,210,.11)'
      for (let index = 0; index < 14; index += 1) {
        const x = (index * 83.71) % width
        const y = (index * 137.19 + (reducedMotion ? 0 : time * .002 * (index % 3))) % height
        context.fillRect(x, y, .65, .65)
      }

      if (!reducedMotion) requestFrame()
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetPointerX = event.clientX - rect.left
      targetPointerY = event.clientY - rect.top
    }
    const handlePointerLeave = () => {
      targetPointerX = -9999
      targetPointerY = -9999
    }
    const handleVisibility = () => {
      documentVisible = !document.hidden
      if (!documentVisible && frameRef.current) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = undefined
      }
      if (documentVisible) requestFrame()
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (!onScreen && frameRef.current) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = undefined
      }
      if (onScreen) requestFrame()
    }, { threshold: .03 })

    image.addEventListener('load', resize)
    canvas.addEventListener('pointermove', handlePointerMove, { passive: true })
    canvas.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('visibilitychange', handleVisibility)
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    image.src = src

    return () => {
      disposed = true
      image.removeEventListener('load', resize)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [src, accentColor, particleDensity, backgroundTreatment])

  return (
    <canvas
      ref={canvasRef}
      className={`particle-portrait ${className}`}
      role="img"
      aria-label="Particle portrait of Rishi Garg"
    />
  )
}
