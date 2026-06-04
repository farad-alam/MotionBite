'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // The track will be quite wide. We shift it left as the user scrolls down.
  // Using -65% usually works well for ~4 full-width items. 
  // You can adjust the ending percentage if the last item cuts off or scrolls too far.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"])

  return (
    <section ref={targetRef} className="bg-[#060608] relative h-[400vh]">
      <div className="sticky top-0 flex items-center h-screen overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-primary/5 rounded-full blur-[120px] pointer-events-none" />

        {/* The Horizontal Track */}
        <motion.div 
          style={{ x }} 
          className="flex flex-nowrap items-center h-full gap-24 px-[10vw]"
        >
          {/* Header Card (First item in the scroll) */}
          <div className="w-[85vw] md:w-[45vw] flex-shrink-0 flex flex-col justify-center text-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-primary" />
              <span className="text-white uppercase tracking-widest text-sm font-semibold font-body">Testimonials</span>
            </div>
            <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl text-white leading-tight">
              Client <br />
              <span className="font-serif italic text-purple-primary">love.</span>
            </h2>
          </div>

          {/* Testimonial Cards */}
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="w-[85vw] md:w-[65vw] flex-shrink-0 flex flex-col justify-center text-left"
            >
              {/* Massive Quote Icon */}
              <div className="font-serif italic text-7xl md:text-9xl text-white/5 leading-none mb-[-2rem] md:mb-[-4rem]">
                &ldquo;
              </div>
              
              {/* Massive Quote Text */}
              <h3 className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-12 max-w-4xl">
                {t.quote}
              </h3>

              {/* Author Details */}
              <div className="flex items-center gap-5 mt-4">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <span className="font-heading font-black text-xl text-white">{t.initials}</span>
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-xl text-white mb-1">{t.name}</p>
                  <p className="font-body text-purple-primary text-sm uppercase tracking-wider font-semibold">{t.business}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
