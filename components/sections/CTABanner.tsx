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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <Link
              href="/start-project"
              className="group relative inline-flex items-center justify-center gap-4 bg-white text-dark-base font-body font-bold text-lg px-8 sm:px-10 py-5 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 shadow-[0_0_40px_rgba(125,64,255,0.3)] hover:shadow-[0_0_60px_rgba(125,64,255,0.5)] w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-purple-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Your Project</span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1">→</span>
            </Link>

            <a
              href="https://wa.me/8801406466559"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#25D366] text-dark-base font-body font-bold text-lg px-8 sm:px-10 py-5 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 shadow-[0_0_40px_rgba(37,211,102,0.3)] hover:shadow-[0_0_60px_rgba(37,211,102,0.5)] w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-[#20b858] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              <span className="relative z-10">WhatsApp Us</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
