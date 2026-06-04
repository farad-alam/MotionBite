'use client'

import { motion } from 'framer-motion'

const techItems = [
  { name: 'Next.js', icon: '▲' },
  { name: 'React', icon: '⚛' },
  { name: 'Tailwind CSS', icon: '🌊' },
  { name: 'Vercel', icon: '◆' },
  { name: 'Framer Motion', icon: '◉' },
  { name: 'GSAP', icon: '⚡' },
  { name: 'Figma', icon: '✦' },
]

// Duplicate items for seamless marquee loop on mobile
const marqueeItems = [...techItems, ...techItems]

export default function TechStack() {
  return (
    <section className="bg-dark-card border-y border-dark-border py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-muted text-xs font-body uppercase tracking-widest mb-8">
          Built with industry-standard tools
        </p>

        {/* Desktop: static flex row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex items-center justify-center gap-8 md:gap-12"
        >
          {techItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-2 text-text-muted/40 hover:text-text-muted transition-colors duration-300 group"
            >
              <span className="text-xl group-hover:text-purple-primary transition-colors duration-300">{item.icon}</span>
              <span className="font-heading text-sm font-semibold">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: infinite marquee */}
        <div className="md:hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-dark-card to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-dark-card to-transparent pointer-events-none" />

          <div className="flex animate-marquee">
            {marqueeItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-text-muted/50 shrink-0 px-6"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-heading text-sm font-semibold whitespace-nowrap">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-text-muted/50 text-xs font-body mt-8">
          The same stack used by Vercel, Linear, and Loom.
        </p>
      </div>
    </section>
  )
}
