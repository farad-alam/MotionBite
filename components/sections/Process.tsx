'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: '📞',
    title: 'Discovery Call',
    desc: 'We learn your business, goals, and audience in 30 minutes. No jargon, just clarity.',
  },
  {
    number: '02',
    icon: '🎨',
    title: 'Design Sprint',
    desc: 'First mockup in your inbox within 48 hours. You see it before a single line of code.',
  },
  {
    number: '03',
    icon: '🔨',
    title: 'Build & Review',
    desc: 'You see everything and approve every step. Daily check-ins keep you in the loop.',
  },
  {
    number: '04',
    icon: '🚀',
    title: 'Go Live',
    desc: 'Launch day. Your business is online, indexed by Google, and ready to convert.',
  },
]

export default function Process() {
  return (
    <section className="bg-dark-card section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            From First Call to{' '}
            <span className="text-green-primary">Live Site in 14 Days</span>
          </h2>
          <p className="font-body text-text-muted text-lg">
            No surprises. No disappearing acts. Just results.
          </p>
        </motion.div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-dark-border" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
            className="hidden md:block absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-green-primary origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div className="w-16 h-16 rounded-full bg-dark-base border-2 border-green-primary flex items-center justify-center text-2xl mb-6 relative z-10">
                  {step.icon}
                </div>

                <span className="font-heading text-green-primary/40 text-xs tracking-widest mb-1">{step.number}</span>
                <h3 className="font-heading text-xl font-bold text-text-primary mb-2">{step.title}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
