"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function HeroSection() {
  const { name, title, bio } = portfolioData.personalInfo;

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 py-16 md:px-12 md:py-24 lg:px-24 relative overflow-hidden">
      
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(#f5a623 1px, transparent 1px),
            linear-gradient(90deg, #f5a623 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Vertical line */}
      <div className="absolute left-8 md:left-16 lg:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />

      <div className="max-w-5xl relative">
        <div className="space-y-6">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-neutral-200 leading-[0.95] tracking-[-0.03em]"
          >
            Hi, I'm <span className="text-amber-400 font-semibold">{name}</span>
            <br />
            {title}
          </motion.h1>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[17px] md:text-lg leading-[1.8] text-gray-300 max-w-[620px] font-body space-y-4"
          >
            {bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 pt-6"
          >
            <a
              href="#projects"
              className="relative font-mono text-sm tracking-widest uppercase px-7 py-3.5 border border-neutral-700 text-neutral-200 hover:border-amber-400 hover:text-amber-400 transition-all duration-300 ease-out"
            >
              View Projects
            </a>
            
            <a
              href="#contact"
              className="font-mono text-sm tracking-widest text-neutral-500 hover:text-neutral-300 transition-all duration-300 uppercase flex items-center gap-2"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-neutral-500 tracking-[0.4em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-neutral-500 to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </section>
  );
}