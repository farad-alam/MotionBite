'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const trustItems = [
  { icon: '★★★★★', text: '50+ Websites Launched' },
  { icon: '⚡', text: '14-Day Delivery' },
  { icon: '✓', text: '100% Satisfaction' },
]

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return

    const words = el.querySelectorAll('.word')
    // Set initial state via GSAP so words are always visible if GSAP fails to run
    gsap.set(words, { y: 60, opacity: 0 })
    gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.3,
    })
  }, [])

  const headline = 'We Build Websites That Mean Business'
  const words = headline.split(' ')

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark-base pt-20">
      {/* Animated mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-green-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-green-primary/5 blur-3xl animate-pulse [animation-delay:1s]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #00C896 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-green-primary/10 border border-green-primary/20 text-green-primary text-xs font-body px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
            Web Design & Development Agency
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-text-muted text-xs font-body">
            <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
            Currently accepting clients
          </span>
        </motion.div>

        {/* Headline — GSAP stagger on words */}
        <h1
          ref={headlineRef}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 overflow-hidden"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word === 'Business' ? (
                <span className="text-green-primary">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-body text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Small businesses and restaurants that need to win online — we build the site that makes it happen.{' '}
          <span className="text-text-primary">Fast, sharp, and built to convert.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link
            href="/free-audit"
            className="inline-flex items-center justify-center gap-2 bg-green-primary hover:bg-green-deep text-dark-base font-heading font-semibold text-base px-7 py-4 rounded-md transition-all duration-200 hover:scale-[1.02]"
          >
            Get Your Free Website Audit
            <span>→</span>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 border border-dark-border text-text-primary hover:border-green-primary/40 font-heading font-semibold text-base px-7 py-4 rounded-md transition-all duration-200"
          >
            See Our Work
            <span>↓</span>
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap gap-6"
        >
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-green-primary text-sm">{item.icon}</span>
              <span className="text-text-muted text-sm font-body">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
