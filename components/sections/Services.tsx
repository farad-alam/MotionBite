'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { services } from '@/data/services'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Services() {
  return (
    <section className="bg-dark-base section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            We Fix That.{' '}
            <span className="text-green-primary">Here&apos;s How.</span>
          </h2>
          <p className="font-body text-text-muted text-lg max-w-xl mx-auto">
            Three clear packages built around where your business actually is right now.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {services.map((s) => (
            <motion.div
              key={s.id}
              variants={cardVariants}
              className={`relative bg-dark-card rounded-xl p-8 glow-border flex flex-col transition-all duration-300 hover:glow-shadow hover:-translate-y-1 ${
                s.popular ? 'border-green-primary/40 ring-1 ring-green-primary/20' : ''
              }`}
            >
              {s.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-primary text-dark-base font-heading font-bold text-xs px-4 py-1 rounded-full animate-pulse">
                    ⭐ Most Popular
                  </span>
                </div>
              )}

              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-heading text-2xl font-bold text-text-primary mb-1">{s.name}</h3>
              <p className="font-body text-text-muted text-sm mb-4">{s.tagline}</p>

              <ul className="space-y-2 mb-6 flex-1">
                {s.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-text-muted text-sm font-body">
                    <span className="text-green-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="border-t border-dark-border pt-6">
                <p className="font-heading text-2xl font-bold text-green-primary mb-4">{s.price}</p>
                <Link
                  href={s.href}
                  className={`block text-center font-heading font-semibold text-sm py-3 rounded-md transition-all duration-200 ${
                    s.popular
                      ? 'bg-green-primary hover:bg-green-deep text-dark-base'
                      : 'border border-dark-border text-text-primary hover:border-green-primary/40'
                  }`}
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-body text-text-muted"
        >
          Not sure which fits?{' '}
          <Link href="/free-audit" className="text-green-primary hover:underline font-semibold">
            Get a free consultation →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
