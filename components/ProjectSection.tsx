'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '@/data/portfolio'

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={sectionRef} className="px-4 py-20 md:px-16 md:py-32 lg:px-24 relative">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[11px] font-mono text-[#737370] tracking-[0.2em] uppercase">01 / Projects</span>
        <div className="flex-1 h-px bg-[#1e1e1e]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl">
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.7 }}
            className="border border-[#1e1e1e] p-8 transition-all duration-300 md:hover:-translate-y-1 md:hover:bg-[#111] md:hover:shadow-2xl md:hover:shadow-amber-400/5 flex flex-col"
          >
            <h3 className="font-display text-2xl md:text-3xl text-[#e8e4dc] leading-tight mb-4 tracking-tight">
              {project.title}
            </h3>
            
            <p className="text-[15px] md:text-base leading-[1.9] text-gray-300 font-body mb-8 flex-1 whitespace-pre-wrap">
              {project.description}
            </p>

            <div className="space-y-6 mt-auto">
              <div>
                <p className="text-[10px] font-mono text-[#737370] tracking-[0.2em] uppercase mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[11px] font-mono text-[#e8e4dc] bg-[#1e1e1e] px-2.5 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-widest"
                >
                  View Project
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}