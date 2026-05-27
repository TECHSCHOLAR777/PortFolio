'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function AchievementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="achievements" ref={sectionRef} className="px-4 py-20 md:px-16 md:py-32 lg:px-24 relative bg-[#0a0a0a]">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[10px] font-mono text-[#3d3b38] tracking-[0.4em] uppercase">03 / Achievements</span>
        <div className="flex-1 h-px bg-[#1e1e1e]" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <ol className="relative border-l-2 border-amber-400">
          {portfolioData.achievements.map((achievement, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="mb-8 ml-6 relative"
            >

              <div className="group border border-[#1e1e1e] transition-all duration-300 md:hover:-translate-y-1 md:hover:bg-[#111] md:hover:shadow-2xl md:hover:shadow-amber-400/5">
                <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e1e1e]">
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] font-mono text-amber-400 mt-1 tracking-widest shrink-0">
                      {achievement.year}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl text-[#e8e4dc] leading-tight">
                      {achievement.title}
                    </h3>
                  </div>
                </div>

                <div className="px-6 py-5 md:pl-20">
                  <p className="text-[15px] md:text-base text-gray-300 font-body leading-relaxed max-w-2xl whitespace-pre-wrap">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
