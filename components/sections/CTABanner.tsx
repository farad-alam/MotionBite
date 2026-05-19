'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-dark-card section-padding">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-green-primary/5 via-transparent to-green-primary/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-primary/30 to-transparent" />
        {/* Animated particles */}
        <div className="absolute top-1/3 left-1/6 w-2 h-2 rounded-full bg-green-primary/20 animate-pulse" />
        <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 rounded-full bg-green-primary/15 animate-pulse [animation-delay:0.7s]" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-green-primary/20 animate-pulse [animation-delay:1.3s]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            Ready to Get{' '}
            <span className="text-green-primary">Found Online?</span>
          </h2>
          <p className="font-body text-text-muted text-lg mb-8 max-w-xl mx-auto">
            Join 50+ small businesses that chose MotionBite to build their online presence.
          </p>

          <Link
            href="/free-audit"
            className="inline-flex items-center gap-3 bg-green-primary hover:bg-green-deep text-dark-base font-heading font-bold text-lg px-10 py-4 rounded-md transition-all duration-200 hover:scale-[1.02] hover:glow-shadow mb-5"
          >
            Get My Free Website Audit
            <span>→</span>
          </Link>

          <p className="font-body text-text-muted text-sm">
            Free. No commitment. 30-minute call.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
