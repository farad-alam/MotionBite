'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const agencyServices = [
  {
    id: '01',
    title: 'Web Design',
    desc: 'Crafting premium, high-converting digital experiences tailored to your brand identity.',
    img: '/service/web-design.jpg',
    overlayColor: 'from-[#f56787] via-[#f56787]/90',
    textColor: 'text-white'
  },
  {
    id: '02',
    title: 'Web Development',
    desc: 'Lightning-fast, scalable, and secure websites built with modern web technologies.',
    img: '/service/web-development.jpg',
    overlayColor: 'from-[#c1fb9c] via-[#c1fb9c]/90',
    textColor: 'text-gray-900'
  },
  {
    id: '03',
    title: 'Software Development',
    desc: 'Custom software solutions and scalable applications designed for complex business needs.',
    img: '/service/software-development.jpg',
    overlayColor: 'from-[#0546bd] via-[#0546bd]/90',
    textColor: 'text-white'
  }
]

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Interpolate background colors based on scroll progress
  // 0.0 - 0.2: Default #FAFAFA
  // 0.3 - 0.5: Light #f56787
  // 0.6 - 0.8: #c1fb9c
  // 0.9 - 1.0: Light #0546bd
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9],
    ['#FAFAFA', '#fae6ea', '#c1fb9c', '#e1e9f8']
  )

  return (
    <motion.section ref={containerRef} style={{ backgroundColor }} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left Sticky Header */}
          <div className="lg:w-1/3">
            <div className="sticky top-40">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-purple-primary" />
                  <span className="text-text-charcoal uppercase tracking-widest text-sm font-semibold font-body">Our Expertise</span>
                </div>
                <h2 className="font-heading font-black text-5xl md:text-6xl text-dark-base leading-tight mb-6">
                  What we <br/>
                  <span className="font-serif italic text-purple-primary">do best.</span>
                </h2>
                <p className="font-body text-text-charcoal/70 text-lg mb-8 max-w-sm">
                  We specialize in crafting bespoke digital solutions that elevate your brand and drive measurable results.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 border border-dark-border/20 text-dark-base hover:border-purple-primary hover:text-purple-primary font-body font-semibold text-sm px-7 py-4 rounded-full transition-all duration-300"
                >
                  View All Services
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Scrolling Cards */}
          <div className="lg:w-2/3 flex flex-col gap-12 pb-32">
            {agencyServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                style={{ top: `calc(10rem + ${index * 1.5}rem)` }}
                className="group sticky bg-white rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 h-[400px] md:h-[500px]"
              >
                {/* Full Area Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={service.img} 
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle top gradient for the number */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

                {/* Number */}
                <div className="absolute top-8 right-10 font-heading font-black text-6xl text-white/50 transition-colors group-hover:text-white/80 z-20 pointer-events-none">
                  {service.id}
                </div>
                
                {/* Respective Overlay strictly taking 30% of the card */}
                <div className={`absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t ${service.overlayColor} to-transparent z-10 pointer-events-none`} />
                
                {/* Bottom Text Content */}
                <div className="absolute bottom-0 left-0 right-0 pb-6 px-8 md:pb-8 md:px-10 z-20 flex flex-col justify-end pointer-events-none">
                  <h3 className={`font-heading font-bold text-2xl md:text-3xl ${service.textColor} mb-2`}>
                    {service.title}
                  </h3>
                  <p className={`font-body ${service.textColor === 'text-white' ? 'text-white/90' : 'text-gray-800'} text-base md:text-lg max-w-xl line-clamp-2`}>
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </motion.section>
  )
}
