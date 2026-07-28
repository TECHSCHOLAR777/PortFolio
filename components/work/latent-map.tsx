'use client'

import Link from 'next/link'
import { useState } from 'react'

import latentMap from '@/content/latent-map.json'
import { projects } from '@/content/projects'
import { cn } from '@/lib/utils'

const VIEW = 520
const PAD = 68

const domainColor: Record<string, string> = {
  'representation learning': 'var(--chart-1)',
  'human interfaces': 'var(--chart-2)',
  agents: 'var(--chart-3)',
  edge: 'var(--chart-4)',
  systems: 'var(--chart-5)',
}

const toX = (x: number) => PAD + ((x + 1) / 2) * (VIEW - PAD * 2)
const toY = (y: number) => VIEW - PAD - ((y + 1) / 2) * (VIEW - PAD * 2)

/**
 * Project similarity, from real embeddings.
 *
 * Positions are MiniLM embeddings of the project summaries reduced with PCA.
 * PCA and not t-SNE on purpose: with six points a t-SNE plot is noise wearing a
 * scientific label, since perplexity has to sit well below n. A linear
 * projection stays honest at this size, and the explained variance is printed
 * below the plot rather than hidden.
 *
 * Node radius is uniform. Encoding something like impressiveness as size would
 * be fabrication, so size carries no meaning and colour only marks domain.
 */
export function LatentMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  const [pc1, pc2] = latentMap.explainedVariance
  const featuredSlugs = new Set(projects.filter((p) => p.featured).map((p) => p.slug))

  const connected = (slug: string) =>
    latentMap.edges
      .filter((e) => e.source === slug || e.target === slug)
      .map((e) => (e.source === slug ? e.target : e.source))

  const activeNeighbours = hovered ? new Set(connected(hovered)) : null

  return (
    <div className="mt-10">
      <div className="mx-auto max-w-xl">
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="h-auto w-full"
          role="img"
          aria-label="Projects positioned by the similarity of their descriptions, with lines between related projects"
        >
          <defs>
            <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
              <path
                d="M 52 0 L 0 0 0 52"
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width={VIEW} height={VIEW} fill="url(#grid)" rx="8" />

          {latentMap.edges.map((edge) => {
            const a = latentMap.nodes.find((n) => n.slug === edge.source)
            const b = latentMap.nodes.find((n) => n.slug === edge.target)
            if (!a || !b) return null

            const touched = hovered === edge.source || hovered === edge.target
            const midX = (toX(a.x) + toX(b.x)) / 2
            const midY = (toY(a.y) + toY(b.y)) / 2

            return (
              <g key={`${edge.source}-${edge.target}`}>
                <line
                  x1={toX(a.x)}
                  y1={toY(a.y)}
                  x2={toX(b.x)}
                  y2={toY(b.y)}
                  stroke="var(--primary)"
                  strokeWidth={touched ? 1.8 : 1}
                  // opacity carries the cosine, so a stronger link looks stronger
                  opacity={hovered && !touched ? 0.08 : 0.18 + edge.cosine * 0.75}
                  className="transition-all duration-200"
                />
                {touched ? (
                  <text
                    x={midX}
                    y={midY - 6}
                    textAnchor="middle"
                    className="tabular fill-muted-foreground text-[11px]"
                  >
                    {edge.cosine.toFixed(3)}
                  </text>
                ) : null}
              </g>
            )
          })}

          {latentMap.nodes.map((node) => {
            const isHovered = hovered === node.slug
            const isNeighbour = activeNeighbours?.has(node.slug) ?? false
            const dimmed = hovered !== null && !isHovered && !isNeighbour
            const href = featuredSlugs.has(node.slug) ? `/work/${node.slug}` : '/#work'

            return (
              <Link
                key={node.slug}
                href={href}
                onMouseEnter={() => setHovered(node.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.slug)}
                onBlur={() => setHovered(null)}
                className="focus-visible:outline-ring outline-none"
              >
                <g
                  className={cn('transition-opacity duration-200', dimmed && 'opacity-25')}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={toX(node.x)}
                    cy={toY(node.y)}
                    r={isHovered ? 9 : 7}
                    fill={domainColor[node.domain] ?? 'var(--primary)'}
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={toX(node.x)}
                    cy={toY(node.y)}
                    r={16}
                    fill="transparent"
                    stroke={isHovered ? 'var(--primary)' : 'transparent'}
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <text
                    x={toX(node.x)}
                    y={toY(node.y) - 20}
                    textAnchor="middle"
                    className="fill-foreground text-[12px] font-medium"
                  >
                    {node.title}
                  </text>
                </g>
              </Link>
            )
          })}
        </svg>
      </div>

      <div className="text-muted-foreground mx-auto mt-6 max-w-xl space-y-2 text-center text-xs">
        <p>
          <span className="tabular">PC1 {(pc1 * 100).toFixed(1)}%</span>
          <span className="mx-2" aria-hidden>
            ·
          </span>
          <span className="tabular">PC2 {(pc2 * 100).toFixed(1)}%</span>
          <span className="mx-2" aria-hidden>
            ·
          </span>
          <span className="tabular">
            {((pc1 + pc2) * 100).toFixed(1)}% of variance in two dimensions
          </span>
        </p>
        {/*
         * Two lines, not four. A chart should say how to read it and where the
         * numbers came from. It should not also point at the script that made
         * it and invite applause.
         */}
        <p className="leading-relaxed">
          Left to right: camera and microphone in the loop, through to purely statistical. Bottom to
          top: live conversation, through to offline training. Hover a node for its cosine.
        </p>
        <p>
          Project summaries embedded with <span className="tabular">all-MiniLM-L6-v2</span>, reduced
          with PCA.
        </p>
      </div>
    </div>
  )
}
