'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden py-24 md:py-40 bg-[#060608] px-4 sm:px-6 lg:px-8">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-primary/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#4d65ff]/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Decorative stacked card effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[85%] h-8 bg-[#0a0a0d] border border-white/[0.03] rounded-t-3xl -mt-8 -z-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[94%] h-4 bg-[#0e0e12] border border-white/[0.05] rounded-t-3xl -mt-4 -z-10" />

          {/* Main Card */}
          <div className="relative rounded-[2rem] bg-[#111116] border border-white/[0.06] overflow-hidden shadow-2xl">
            
            {/* Dot Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{ 
                backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', 
                backgroundSize: '24px 24px' 
              }} 
            />
            
            {/* Bottom Glow inside the card */}
            <div className="absolute -bottom-[150px] left-1/2 -translate-x-1/2 w-[80%] h-[250px] bg-gradient-to-r from-purple-primary via-[#A87FFF] to-[#4d65ff] opacity-40 blur-[80px] pointer-events-none rounded-full" />
            <div className="absolute -bottom-[20px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-primary/80 to-transparent shadow-[0_0_15px_rgba(125,64,255,0.8)]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 p-8 md:p-14 lg:p-16 items-center">
              
              {/* Left Column: Text & Buttons */}
              <div className="text-left">
                <h2 className="font-heading font-medium text-4xl md:text-5xl lg:text-5xl text-white mb-6 leading-tight tracking-tight">
                  Let's build something <br className="hidden lg:block" /> extraordinary.
                </h2>
                
                <p className="font-body text-text-muted text-base md:text-lg mb-10 max-w-md leading-relaxed font-light">
                  Ready to transform your digital presence? Book a free discovery call and let's map out your success.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Outline Button: WhatsApp */}
                  <a
                    href="https://wa.me/8801406466559"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white font-body text-sm font-medium px-8 py-3.5 rounded-xl transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#25D366] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>

                  {/* Solid Button: Start Project */}
                  <Link
                    href="/start-project"
                    className="flex items-center justify-center bg-white hover:bg-gray-100 text-dark-base font-body text-sm font-semibold px-8 py-3.5 rounded-xl transition-colors w-full sm:w-auto"
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>

              {/* Right Column: Testimonial Box */}
              <div className="w-full lg:ml-auto max-w-md">
                <div className="bg-[#18181c]/60 backdrop-blur-md border border-white/[0.08] rounded-2xl p-8 relative overflow-hidden group">
                  {/* Subtle inner hover glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-purple-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex items-center gap-1.5 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-[#E68A42]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="font-body text-[#9a9a9f] text-[13px] sm:text-sm leading-relaxed mb-8 pr-4">
                      "MotionBite delivered an incredible website that transformed our online presence. The attention to detail and communication throughout the process was phenomenal. Highly recommended."
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-primary/20 to-purple-primary/10 border border-purple-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-lg">👨🏻‍💻</span>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-white text-[13px] tracking-wide">James Cooper</h4>
                        <p className="font-body text-[#7a7a7f] text-xs">Chief Marketing Officer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
