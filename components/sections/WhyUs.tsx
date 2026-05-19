'use client'

import { motion } from 'framer-motion'

const reasons = [
  { icon: '⚡', title: 'Fast Delivery', desc: 'Live in 14 days, not 3 months.' },
  { icon: '🎯', title: 'Built to Convert', desc: 'Every design decision drives action.' },
  { icon: '📈', title: 'SEO Ready', desc: 'Google can find you from day one.' },
  { icon: '💬', title: 'Clear Communication', desc: "You're never left guessing." },
  { icon: '💰', title: 'Transparent Pricing', desc: 'What you see is what you pay.' },
  { icon: '🔒', title: 'Satisfaction Guaranteed', desc: "We don't stop until you love it." },
]

export default function WhyUs() {
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
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
            Why Small Businesses{' '}
            <span className="text-green-primary">Choose MotionBite</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 bg-dark-card rounded-xl p-6 glow-border hover:glow-shadow transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-md bg-green-primary/10 flex items-center justify-center text-xl shrink-0 group-hover:bg-green-primary/20 transition-colors duration-300">
                {r.icon}
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-1">{r.title}</h3>
                <p className="font-body text-text-muted text-sm">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
