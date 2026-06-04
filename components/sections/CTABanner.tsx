'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden py-40 bg-[#060608]">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow 1 */}
        <div 
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-primary/20 blur-[150px] rounded-full mix-blend-screen"
        />
        {/* Glow 2 */}
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#4d65ff]/20 blur-[150px] rounded-full mix-blend-screen"
        />
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-primary animate-pulse" />
            <span className="font-body text-white text-xs font-semibold uppercase tracking-wider">Available for new projects</span>
          </div>

          <h2 className="font-heading font-black text-6xl md:text-8xl text-white mb-6 leading-tight">
            Let's build something <br className="hidden md:block" />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-primary to-[#A87FFF]">extraordinary.</span>
          </h2>
          
          <p className="font-body text-text-muted text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">
            Ready to transform your digital presence? Book a free discovery call and let's map out your success.
          </p>

          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-4 bg-white text-dark-base font-body font-bold text-lg px-12 py-5 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 shadow-[0_0_40px_rgba(125,64,255,0.3)] hover:shadow-[0_0_60px_rgba(125,64,255,0.5)]"
          >
            {/* Hover fill effect */}
            <div className="absolute inset-0 bg-purple-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
            
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Your Project</span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
