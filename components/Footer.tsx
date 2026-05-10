'use client'

import { portfolioData } from '@/data/portfolio'

export default function Footer() {
  return (
    <footer className="px-8 md:px-16 lg:px-24 py-12 border-t border-[#1e1e1e]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-[#3d3b38] tracking-widest uppercase mb-1">
            {portfolioData.personalInfo.name}
          </p>
          <p className="text-xs text-[#3d3b38]">
            Built with Next.js and Tailwind CSS.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-[#3d3b38] tracking-[0.4em] uppercase">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}
