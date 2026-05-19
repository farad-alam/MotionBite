'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { portfolioItems } from '@/data/portfolio'

export default function Portfolio() {
  return (
    <section className="bg-dark-base section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
            Websites That{' '}
            <span className="text-green-primary">Worked</span>
          </h2>
          <Link
            href="/portfolio"
            className="text-green-primary hover:text-green-deep font-heading font-semibold text-sm transition-colors shrink-0"
          >
            See All Projects →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={item.href} className="group block bg-dark-card rounded-xl overflow-hidden glow-border hover:glow-shadow transition-all duration-300">
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-dark-base">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-primary/10 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-text-muted/30 text-4xl">{item.industry}</span>
                  </div>
                  {/* Green overlay on hover */}
                  <div className="absolute inset-0 bg-green-primary/0 group-hover:bg-green-primary/10 transition-all duration-300 flex items-center justify-center">
                    <span className="font-body text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Case Study →
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-muted text-xs font-body uppercase tracking-wider">{item.industry}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text-primary mb-2 group-hover:text-green-primary transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="text-green-primary text-sm font-body font-semibold mb-4">{item.result}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="bg-dark-base text-text-muted text-xs font-body px-2.5 py-1 rounded-full border border-dark-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
