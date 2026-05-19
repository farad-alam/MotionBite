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

export default function TechStack() {
  return (
    <section className="bg-dark-card border-y border-dark-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-muted text-xs font-body uppercase tracking-widest mb-8">
          Built with industry-standard tools
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
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
              <span className="text-xl group-hover:text-green-primary transition-colors duration-300">{item.icon}</span>
              <span className="font-heading text-sm font-semibold">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-text-muted/50 text-xs font-body mt-8">
          The same stack used by Vercel, Linear, and Loom.
        </p>
      </div>
    </section>
  )
}
