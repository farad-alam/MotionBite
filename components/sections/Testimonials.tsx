'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  return (
    <section className="bg-dark-card section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
            What Our{' '}
            <span className="text-green-primary">Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-dark-base rounded-xl p-8 glow-border flex flex-col"
            >
              {/* Stars */}
              <div className="text-green-primary text-sm mb-4">{'★'.repeat(t.rating)}</div>

              {/* Quote mark */}
              <div className="font-heading text-5xl text-green-primary/20 leading-none mb-2">&ldquo;</div>

              <p className="font-body text-text-muted text-sm leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>

              {/* Client */}
              <div className="flex items-center gap-3 border-t border-dark-border pt-5">
                <div className="w-10 h-10 rounded-full bg-green-primary/10 border border-green-primary/20 flex items-center justify-center">
                  <span className="font-heading text-green-primary text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="font-heading text-text-primary text-sm font-semibold">{t.name}</p>
                  <p className="font-body text-text-muted text-xs">{t.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
