'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={sectionRef} className="px-4 py-20 md:px-16 md:py-32 lg:px-24 relative">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[10px] font-mono text-[#3d3b38] tracking-[0.4em] uppercase">04 / Skills & About</span>
        <div className="flex-1 h-px bg-[#1e1e1e]" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl">
        {/* Left: Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h2 className="font-display text-3xl md:text-4xl text-[#e8e4dc] leading-tight mb-8 tracking-tight">
            Technical Arsenal
          </h2>
          <div className="space-y-8">
            {portfolioData.skills.map((skillGroup, i) => (
              <div key={i}>
                <p className="text-[11px] font-mono text-[#737370] tracking-[0.2em] uppercase mb-4">
                  {skillGroup.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-[12px] font-mono text-[#e8e4dc] border border-[#1e1e1e] px-4 py-2 hover:border-[#4da6ff30] hover:bg-[#4da6ff08] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Contact / Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          id="contact"
        >
          <h2 className="font-display text-3xl md:text-4xl text-[#e8e4dc] leading-tight mb-8 tracking-tight">
            Let's Connect
          </h2>

          <div className="space-y-6">
            <p className="text-[15px] md:text-base leading-[1.9] text-gray-300 font-body max-w-md mb-10">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${portfolioData.personalInfo.contactEmail}`}
                className="group flex items-center justify-between border border-[#1e1e1e] p-6 hover:border-amber-400 transition-colors duration-300"
              >
                <span className="font-mono text-sm tracking-widest text-[#e8e4dc] uppercase">Email</span>
                <span className="font-mono text-sm text-gray-300 group-hover:text-amber-400 transition-colors">{portfolioData.personalInfo.contactEmail}</span>
              </a>

              {portfolioData.personalInfo.github && (
                <a
                  href={portfolioData.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-[#1e1e1e] p-6 hover:border-[#e8e4dc] transition-colors duration-300"
                >
                  <span className="font-mono text-sm tracking-widest text-[#e8e4dc] uppercase">GitHub</span>
                  <span className="font-mono text-sm text-gray-300 group-hover:text-[#e8e4dc] transition-colors">github.com</span>
                </a>
              )}

              {portfolioData.personalInfo.linkedin && (
                <a
                  href={portfolioData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-[#1e1e1e] p-6 hover:border-[#4da6ff] transition-colors duration-300"
                >
                  <span className="font-mono text-sm tracking-widest text-[#e8e4dc] uppercase">LinkedIn</span>
                  <span className="font-mono text-sm text-gray-300 group-hover:text-[#4da6ff] transition-colors">linkedin.com</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
