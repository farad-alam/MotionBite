'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { portfolioItems, PortfolioItem } from '@/data/portfolio'

// Define the custom styles for the featured projects
const projectStyles: Record<string, { bg: string, accent: string }> = {
  'papa-roma':         { bg: 'bg-[#2A1110]', accent: '#E63946' }, // Warm dark red
  'reach-logic':       { bg: 'bg-[#0B211A]', accent: '#00B48A' }, // Deep teal/green
  'muscle-flex':       { bg: 'bg-[#2B0F12]', accent: '#D90429' }, // Dark red
  'saudi-garej':       { bg: 'bg-[#0A1A30]', accent: '#0066FF' }, // Dark blue
  'baitullah-musafir': { bg: 'bg-[#0B2416]', accent: '#00A878' },
  'bismillah-auto':    { bg: 'bg-[#0A1A30]', accent: '#0066FF' },
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Take top 4 items for the homepage
  const featuredProjects = portfolioItems.slice(0, 4)

  return (
    <section ref={containerRef} className="bg-[#060608] relative z-10 w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32">
        
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
            // Target scale is very subtle, just 0.98 per level of depth
            const targetScale = 1 - ( (featuredProjects.length - index) * 0.02 );
            const style = projectStyles[project.slug] || { bg: 'bg-[#0D0D11]', accent: '#6b46c1' }

            return (
              <Card 
                key={project.id} 
                project={project} 
                style={style}
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

// Individual Card Component
function Card({ project, style, index, total, progress, targetScale }: { 
  project: PortfolioItem, 
  style: { bg: string, accent: string },
  index: number, 
  total: number, 
  progress: any,
  targetScale: number 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  })

  // Subtle scale down for depth
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  // Top offset so the cards peek from under each other
  const peekAmount = 40
  const stickyTop = 30 + (index * peekAmount)
  
  // Calculate dynamic height based on the maximum possible top offset
  // This guarantees even the last card doesn't get pushed off the bottom of the screen.
  const maxStickyTop = 30 + ((total - 1) * peekAmount)
  const cardHeight = `calc(100vh - ${maxStickyTop + 40}px)`

  // Get first letter of client name for avatar
  const clientInitial = project.clientName ? project.clientName.charAt(0) : 'C'
  const clientNameParts = project.clientName ? project.clientName.split('—') : []
  const clientRole = clientNameParts[0] || 'Client'
  const clientCompany = clientNameParts[1] || project.name

  return (
    <div 
      ref={cardRef} 
      className="sticky flex items-start justify-center w-full origin-top mb-[10vh] md:mb-[15vh]"
      style={{ top: `${stickyTop}px`, height: cardHeight, minHeight: '550px', maxHeight: '750px' }}
    >
      <motion.div 
        style={{ scale }}
        className={`w-full h-full ${style.bg} rounded-[32px] md:rounded-[40px] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-[0_-10px_40px_rgba(0,0,0,0.8)]`}
      >
        {/* LEFT PANEL (45%) */}
        <div className="w-full md:w-[45%] p-6 md:p-10 flex flex-col h-full relative z-20">
          
          {/* Breadcrumb / Category */}
          <div className="mb-6">
            <span className="font-serif italic text-white/60 text-lg md:text-xl">
              {project.industry}
            </span>
          </div>
          
          {/* Headline */}
          <h3 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
            {project.result}
          </h3>

          {/* Short description */}
          <p className="text-text-muted text-base lg:text-lg leading-relaxed line-clamp-3 mb-10 max-w-lg">
            {project.challenge}
          </p>

          {/* Metrics Block */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex gap-8 md:gap-16 mb-auto">
              {project.metrics.map((metric, i) => (
                <div key={i}>
                  <p className="text-white/50 text-xs md:text-sm uppercase tracking-wider font-semibold mb-2">{metric.label}</p>
                  <p className="text-white font-heading font-bold text-2xl md:text-4xl">{metric.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Attribution Pill */}
          <Link 
            href={project.href}
            className="mt-8 group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-full p-2 pr-6 transition-colors duration-300"
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: style.accent }}
              >
                {clientInitial}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm">{clientRole.trim()}</span>
                <span className="text-white/50 text-xs">{clientCompany?.trim() || project.name}</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
          
        </div>

        {/* RIGHT PANEL (55%) - Integrated Mockup Image */}
        <div className="hidden md:flex w-full md:w-[55%] h-full relative z-10 overflow-hidden bg-black/40 border-l border-white/5 items-center justify-center p-6 lg:p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={project.image} 
            alt={project.name}
            className="max-w-full max-h-full object-contain transform transition-transform duration-1000 group-hover:scale-105 rounded-2xl md:rounded-[32px] shadow-2xl"
          />
        </div>
        
        {/* MOBILE IMAGE ONLY (hidden on md) */}
        <div className="md:hidden w-full h-[35vh] relative overflow-hidden order-first bg-black/40 flex items-center justify-center p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={project.image} 
            alt={project.name}
            className="max-w-full max-h-full object-contain rounded-xl shadow-xl"
          />
        </div>

      </motion.div>
    </div>
  )
}
