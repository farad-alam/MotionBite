'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero-section" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#060608] pt-24">

      {/* ── BACKGROUND WAVES ── */}

      {/* Top Left Glow & Waves */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Base glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 50% 90% at top left, rgba(125,64,255,0.3) 0%, transparent 100%)',
          }}
        />
        {/* Repeating vertical waves */}
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(to right, rgba(125,64,255,0) 0px, rgba(125,64,255,0.5) 25px, rgba(125,64,255,0) 50px)',
            maskImage: 'radial-gradient(ellipse 55% 90% at top left, black 10%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 90% at top left, black 10%, transparent 80%)',
          }}
        />
      </div>

      {/* Bottom Right Glow & Waves */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Base glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 50% 90% at bottom right, rgba(125,64,255,0.3) 0%, transparent 100%)',
          }}
        />
        {/* Repeating vertical waves */}
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(to right, rgba(125,64,255,0) 0px, rgba(125,64,255,0.5) 25px, rgba(125,64,255,0) 50px)',
            maskImage: 'radial-gradient(ellipse 55% 90% at bottom right, black 10%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 90% at bottom right, black 10%, transparent 80%)',
          }}
        />
      </div>

      {/* Subtle center vignette to keep text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 50% 50%, transparent 30%, rgba(6,6,8,0.5) 100%)',
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">



        {/* Headline — two-line split */}
        <div className="mb-6 overflow-hidden">
          {/* Line 1: Bold sans-serif in purple */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1] tracking-tight text-purple-primary">
              We Design &amp; Develop
            </h1>
          </motion.div>

          {/* Line 2: Italic serif in white */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-serif italic font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-text-primary">
              websites that drive results.
            </span>
          </motion.div>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="font-body text-text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          We build websites that feel <strong className="text-text-primary font-semibold">crafted</strong>, not rushed — for businesses who{' '}
          <strong className="text-text-primary font-semibold">care about results.</strong>
        </motion.p>

        {/* CTA Buttons — pill style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/free-consultation"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0A] font-body font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-purple-light hover:scale-[1.03] shadow-lg"
          >
            Book a Free Call
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm text-text-primary font-body font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-white/15 hover:scale-[1.03]"
          >
            See Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
