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
  accent: boolean
}

const TAU = Math.PI * 2

function easeOutExpo(value: number) {
  return value === 1 ? 1 : 1 - Math.pow(2, -10 * value)
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
    image.src = src
    image.decoding = 'async'

    let particles: Particle[] = []
    let width = 0
    let height = 0
    let visible = true
    let disposed = false
    let startTime = performance.now()
    let pointerX = -9999
    let pointerY = -9999
    let targetPointerX = -9999
    let targetPointerY = -9999
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

      // Flood only near-white pixels connected to the image edge. This removes the
      // studio background while protecting light facial and clothing detail inside it.
      const background = new Uint8Array(sampleWidth * sampleHeight)
      const queue = new Int32Array(sampleWidth * sampleHeight)
      let head = 0
      let tail = 0

      const isBackground = (index: number) => {
        const offset = index * 4
        const luminance = pixels[offset] * .2126 + pixels[offset + 1] * .7152 + pixels[offset + 2] * .0722
        const spread = Math.max(pixels[offset], pixels[offset + 1], pixels[offset + 2]) -
          Math.min(pixels[offset], pixels[offset + 1], pixels[offset + 2])
        return luminance > 244 && spread < 11
      }

      const enqueue = (index: number) => {
        if (background[index] || !isBackground(index)) return
        background[index] = 1
        queue[tail++] = index
      }

      for (let x = 0; x < sampleWidth; x += 1) {
        enqueue(x)
        enqueue((sampleHeight - 1) * sampleWidth + x)
      }
      for (let y = 0; y < sampleHeight; y += 1) {
        enqueue(y * sampleWidth)
        enqueue(y * sampleWidth + sampleWidth - 1)
      }

      while (head < tail) {
        const index = queue[head++]
        const x = index % sampleWidth
        const y = Math.floor(index / sampleWidth)
        if (x > 0) enqueue(index - 1)
        if (x < sampleWidth - 1) enqueue(index + 1)
        if (y > 0) enqueue(index - sampleWidth)
        if (y < sampleHeight - 1) enqueue(index + sampleWidth)
      }

      const portraitAspect = sampleWidth / sampleHeight
      const drawHeight = Math.min(height * 1.04, width / portraitAspect)
      const drawWidth = drawHeight * portraitAspect
      const offsetX = width - drawWidth * .94
      const offsetY = height - drawHeight
      const baseStep = Math.max(2.4, 4.2 / Math.max(.55, particleDensity))
      const next: Particle[] = []

      for (let sy = 0; sy < sampleHeight; sy += baseStep) {
        for (let sx = 0; sx < sampleWidth; sx += baseStep) {
          const x = Math.min(sampleWidth - 1, Math.floor(sx))
          const y = Math.min(sampleHeight - 1, Math.floor(sy))
          const index = y * sampleWidth + x
          if (background[index]) continue

          const offset = index * 4
          const luminance = (pixels[offset] * .2126 + pixels[offset + 1] * .7152 + pixels[offset + 2] * .0722) / 255
          const nx = x / sampleWidth
          const ny = y / sampleHeight
          const faceDistance = Math.pow((nx - .51) / .34, 2) + Math.pow((ny - .36) / .3, 2)
          const identityZone = faceDistance < 1
          const deterministic = ((x * 73856093) ^ (y * 19349663)) >>> 0

          if (!identityZone && deterministic % 7 === 0) continue
          if (identityZone && deterministic % 11 === 0) {
            const detailX = Math.min(sampleWidth - 1, x + Math.max(1, Math.floor(baseStep / 2)))
            if (!background[y * sampleWidth + detailX]) {
              const detailHomeX = offsetX + (detailX / sampleWidth) * drawWidth
              const detailHomeY = offsetY + ny * drawHeight
              next.push(makeParticle(detailHomeX, detailHomeY, luminance, deterministic + 17, true))
            }
          }

          const homeX = offsetX + nx * drawWidth
          const homeY = offsetY + ny * drawHeight
          next.push(makeParticle(homeX, homeY, luminance, deterministic, identityZone))
        }
      }

      particles = next
      startTime = performance.now()
    }

    const makeParticle = (homeX: number, homeY: number, luminance: number, seed: number, detail: boolean): Particle => {
      const angle = (seed % 628) / 100
      const scatter = 15 + (seed % 51)
      return {
        x: homeX + Math.cos(angle) * scatter,
        y: homeY + Math.sin(angle) * scatter,
        homeX,
        homeY,
        startX: homeX + Math.cos(angle) * scatter,
        startY: homeY + Math.sin(angle) * scatter,
        radius: .46 + luminance * (detail ? 1.02 : .86),
        alpha: .34 + luminance * .62,
        tone: Math.round(112 + luminance * 93),
        phase: (seed % 1000) / 100,
        depth: .2 + ((seed >>> 3) % 80) / 100,
        accent: seed % 181 === 0,
      }
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
    }

    const render = (time: number) => {
      if (disposed) return
      if (!visible) {
        frameRef.current = requestAnimationFrame(render)
        return
      }

      context.fillStyle = '#070809'
      context.fillRect(0, 0, width, height)

      if (backgroundTreatment === 'halo') {
        const halo = context.createRadialGradient(width * .72, height * .4, 10, width * .72, height * .4, width * .58)
        halo.addColorStop(0, 'rgba(199,205,210,.095)')
        halo.addColorStop(.52, 'rgba(199,205,210,.025)')
        halo.addColorStop(1, 'rgba(7,8,9,0)')
        context.fillStyle = halo
        context.fillRect(0, 0, width, height)
      }

      pointerX += (targetPointerX - pointerX) * .08
      pointerY += (targetPointerY - pointerY) * .08
      const entrance = reducedMotion ? 1 : Math.min(1, (time - startTime) / 1350)
      const assembled = easeOutExpo(entrance)

      for (const particle of particles) {
        const dx = particle.homeX - pointerX
        const dy = particle.homeY - pointerY
        const distanceSquared = dx * dx + dy * dy
        const influence = reducedMotion || distanceSquared > 9200 ? 0 : (1 - Math.sqrt(distanceSquared) / 96)
        const drift = reducedMotion ? 0 : Math.sin(time * .00042 + particle.phase) * .22 * particle.depth
        const displacementX = influence > 0 ? dx * influence * .045 * particle.depth : 0
        const displacementY = influence > 0 ? dy * influence * .045 * particle.depth : 0
        const homeX = particle.homeX + drift + displacementX
        const homeY = particle.homeY + drift * .55 + displacementY

        particle.x = particle.startX + (homeX - particle.startX) * assembled
        particle.y = particle.startY + (homeY - particle.startY) * assembled

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, TAU)
        context.fillStyle = particle.accent
          ? accentColor
          : `rgba(${particle.tone},${particle.tone + 5},${particle.tone + 10},${particle.alpha * assembled})`
        context.fill()
      }

      // Sparse atmosphere, kept deterministic and visually subordinate.
      context.fillStyle = 'rgba(199,205,210,.14)'
      for (let i = 0; i < 24; i += 1) {
        const x = (i * 83.71) % width
        const y = (i * 137.19 + time * .004 * (i % 3)) % height
        context.fillRect(x, y, .7, .7)
      }

      frameRef.current = requestAnimationFrame(render)
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

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }, { threshold: .05 })

    image.addEventListener('load', resize)
    canvas.addEventListener('pointermove', handlePointerMove, { passive: true })
    canvas.addEventListener('pointerleave', handlePointerLeave)
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    frameRef.current = requestAnimationFrame(render)

    return () => {
      disposed = true
      image.removeEventListener('load', resize)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
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
