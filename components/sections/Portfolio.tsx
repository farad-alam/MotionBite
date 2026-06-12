'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { portfolioItems } from '@/data/portfolio'

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Take top 3 items for the homepage
  const featuredProjects = portfolioItems.slice(0, 3)

  return (
    <section ref={containerRef} className="bg-[#060608] relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-primary" />
              <span className="text-white uppercase tracking-widest text-sm font-semibold font-body">Featured Work</span>
            </div>
            <h2 className="font-heading font-black text-5xl md:text-7xl text-white leading-[1.1] max-w-2xl">
              Projects that <span className="font-serif italic text-text-muted">deliver.</span>
            </h2>
          </motion.div>
        </div>

        {/* Stacked Cards Container */}
        <div className="flex flex-col relative w-full pb-[10vh]">
          {featuredProjects.map((project, index) => {
            // Calculate dynamic scale and opacity based on scroll position
            // Each card scales down slightly as the user scrolls past it to reveal the next
            const targetScale = 1 - ( (featuredProjects.length - index) * 0.05 );
            
            // Assign a background color based on index to keep the premium feel
            const bgColors = ['bg-[#0a0a0f]', 'bg-[#12121a]', 'bg-[#181824]']
            const bgColor = bgColors[index % bgColors.length]

            return (
              <Card 
                key={project.id} 
                project={{...project, bgColor}} 
                index={index} 
                total={featuredProjects.length}
                progress={scrollYProgress}
                targetScale={targetScale}
              />
            )
          })}
        </div>
        
        {/* Footer CTA */}
        <div className="mt-12 flex justify-center pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-4 bg-white text-black hover:bg-purple-primary hover:text-white font-body font-bold text-lg px-8 py-5 rounded-full transition-all duration-300"
            >
              View All Case Studies
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

// Individual Card Component to handle isolated scroll transforms
function Card({ project, index, total, progress, targetScale }: { 
  project: any, 
  index: number, 
  total: number, 
  progress: any,
  targetScale: number 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Create a localized progress specifically for THIS card's exit animation
  // It starts fading/scaling when it hits the top and the NEXT card starts covering it
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  })

  // Scale down and fade out slightly as it goes up
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"])

  return (
    <div 
      ref={cardRef} 
      className="sticky top-0 h-screen flex items-center justify-center w-full origin-top"
      style={{ paddingTop: `calc(5vh + ${index * 20}px)` }} // Slight offset so they stack visibly at the top
    >
      <motion.div 
        style={{ scale, opacity, filter }}
        className={`w-full h-[85vh] md:h-[80vh] ${project.bgColor} rounded-[40px] border border-white/5 overflow-hidden flex flex-col md:flex-row relative shadow-[0_-20px_50px_rgba(0,0,0,0.5)]`}
      >
        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between h-full relative z-20 bg-gradient-to-r from-black/60 to-transparent md:bg-none">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md">
                {project.industry}
              </span>
              <span className="text-text-muted font-medium text-sm">{project.name}</span>
            </div>
            
            <h3 className="font-heading font-black text-4xl md:text-6xl text-white leading-tight mb-8">
              {project.result}
            </h3>

            <div className="space-y-8 max-w-lg">
              <div>
                <h4 className="text-purple-primary font-bold text-sm uppercase tracking-wider mb-2">The Challenge</h4>
                <p className="text-text-muted text-base md:text-lg leading-relaxed line-clamp-3">
                  {project.challenge}
                </p>
              </div>
              
              <div>
                <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-white text-base md:text-lg leading-relaxed font-medium line-clamp-3">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link 
              href={project.href} 
              className="inline-flex items-center gap-3 text-white border-b border-white/30 hover:border-white pb-1 transition-colors group"
            >
              <span className="font-semibold text-lg">Read full case study</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Image Side */}
        <div className="absolute md:relative w-full md:w-1/2 h-full top-0 left-0 z-10 md:z-20 pointer-events-none md:pointer-events-auto">
          <div className="absolute inset-0 bg-black/40 md:bg-transparent md:bg-gradient-to-l from-transparent to-[#12121a]/80 z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
          />
        </div>
      </motion.div>
    </div>
  )
}
