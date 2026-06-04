'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    client: 'Stripe Partners',
    category: 'Fintech / Web Design',
    title: 'Redefining Digital Payments',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 2,
    client: 'Aura Health',
    category: 'Healthcare / SaaS',
    title: 'Mindfulness Meets AI',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 3,
    client: 'Nexus Architecture',
    category: 'Architecture / Branding',
    title: 'Building the Future',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000'
  }
]

export default function Portfolio() {
  return (
    <section className="bg-[#060608] py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
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
            <h2 className="font-heading font-black text-5xl md:text-7xl text-white leading-[1.1]">
              Recent <span className="font-serif italic text-text-muted">projects.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:border-purple-primary hover:text-purple-primary font-body font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Explore All Work
            </Link>
          </motion.div>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group cursor-pointer block"
            >
              {/* Massive Image Container */}
              <div className="relative w-full h-[50vh] md:h-[70vh] rounded-[32px] overflow-hidden mb-8">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                />
                
                {/* View Project Pill (Appears on Hover) */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-body font-semibold px-8 py-4 rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    View Case Study
                  </div>
                </div>
              </div>

              {/* Title & Category */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4">
                <div>
                  <h3 className="font-heading font-black text-4xl md:text-5xl text-white mb-2 group-hover:text-purple-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body text-text-muted text-lg">
                    {project.client}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="font-body text-text-muted text-sm tracking-wide">
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
