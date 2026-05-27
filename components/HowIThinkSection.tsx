'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function HowIThinkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="px-4 py-20 md:px-16 md:py-32 lg:px-24 relative">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[10px] font-mono text-[#3d3b38] tracking-[0.4em] uppercase">02 / How I Think</span>
        <div className="flex-1 h-px bg-[#1e1e1e]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="text-gray-300 font-body text-[17px] md:text-lg max-w-2xl mb-8 leading-relaxed"
      >
        These are real decisions made while building this project.
        Not cleaned up for polish. The format is: problem &rarr; mistake &rarr; insight &rarr; fix.
      </motion.p>

      <div className="space-y-6 max-w-5xl mx-auto">
        {portfolioData.thoughts.map((thought, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
            className="group border border-[#1e1e1e] rounded-md bg-[rgba(255,255,255,0.01)] transition-all duration-300 md:hover:-translate-y-1 md:hover:bg-[#0c0c0c] md:hover:shadow-lg"
          >
            <ThoughtCard thought={thought} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ThoughtCard({ thought, index }: { thought: any; index: number }) {
  const parts = [
    { label: 'Mistake', text: thought.mistake, color: 'text-[#ff6b6b]' },
    { label: 'Insight', text: thought.insight, color: 'text-amber-400' },
    { label: 'Fix', text: thought.fix, color: 'text-[#4ade80]' },
  ]

  const excerpt = (s: string) => (s.length > 140 ? s.slice(0, 140).trimEnd() + '…' : s)

  return (
    <div>
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-amber-400 font-mono text-sm leading-none">{String(index + 1).padStart(2, '0')}</div>
          <div>
            <h3 className="font-display text-lg text-[#e8e4dc]">{thought.problem}</h3>
            <p className="mt-2 text-sm text-[#bfb8ab] max-w-2xl">{excerpt(thought.mistake + ' ' + thought.insight)}</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {parts.map((p) => (
            <div key={p.label} className="p-4 border border-[#1e1e1e] rounded-sm bg-[#070707]">
              <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${p.color}`}>{p.label}</span>
              <p className="mt-2 text-sm text-gray-300 font-body leading-relaxed whitespace-pre-wrap">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
