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
        className="text-gray-300 font-body text-[17px] md:text-lg max-w-2xl mb-20 leading-relaxed"
      >
        These are real decisions made while building this project.
        Not cleaned up for polish. The format is: problem &rarr; mistake &rarr; insight &rarr; fix.
      </motion.p>

      <div className="space-y-1 max-w-5xl mx-auto">
        {portfolioData.thoughts.map((thought, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            className="group border border-[#1e1e1e] transition-all duration-300 md:hover:-translate-y-1 md:hover:bg-[#111] md:hover:shadow-2xl md:hover:shadow-amber-400/5"
          >
            {/* Problem header */}
            <div className="px-6 py-5 border-b border-[#1e1e1e]">
              <div className="flex items-start gap-4">
                <span className="text-[10px] font-mono text-amber-400 mt-1 tracking-widest shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-[#e8e4dc] leading-tight">
                  {thought.problem}
                </h3>
              </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1e1e1e]">
              {[
                { label: 'Mistake', text: thought.mistake, color: 'text-[#ff3b3b]' },
                { label: 'Insight', text: thought.insight, color: 'text-amber' },
                { label: 'Fix', text: thought.fix, color: 'text-[#00ff88]' },
              ].map((item) => (
                <div key={item.label} className="px-6 py-5">
                  <span className={`text-[10px] font-mono tracking-[0.3em] uppercase mb-3 block ${item.color}`}>
                    {item.label}
                  </span>
                  <p className="text-[15px] md:text-base text-gray-300 font-body leading-relaxed whitespace-pre-wrap">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
