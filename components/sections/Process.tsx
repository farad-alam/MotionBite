'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    desc: 'We dive deep into your brand, understanding your goals, audience, and market to craft a tailored digital strategy that sets the foundation for success.',
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    desc: 'Our design monks create stunning, interactive prototypes. You see exactly how your premium site will look and feel before a single line of code is written.',
  },
  {
    number: '03',
    title: 'Development & Build',
    desc: 'We bring the designs to life using modern tech stacks. Fast, responsive, and pixel-perfect execution ensuring flawless performance across all devices.',
  },
  {
    number: '04',
    title: 'Launch & Scale',
    desc: 'Rigorous testing followed by a seamless launch. We ensure your site is optimized for search engines and ready to convert visitors into loyal customers.',
  },
]

export default function Process() {
  return (
    <section className="bg-[#060608] py-32 relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] pointer-events-none mix-blend-screen opacity-20"
        style={{ background: 'radial-gradient(circle at top right, #7D40FF 0%, transparent 70%)' }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 md:w-2/3"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-primary" />
            <span className="text-white uppercase tracking-widest text-sm font-semibold font-body">Our Process</span>
          </div>
          <h2 className="font-heading font-black text-5xl md:text-7xl text-white leading-[1.1]">
            How we make <br />
            <span className="font-serif italic text-purple-primary">magic happen.</span>
          </h2>
        </motion.div>

        {/* Steps List */}
        <div className="flex flex-col gap-16 md:gap-24">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`flex flex-col md:flex-row gap-6 md:gap-16 items-start ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Massive Number */}
              <div className="md:w-1/3 shrink-0">
                <span 
                  className="font-heading font-black text-8xl md:text-9xl text-transparent leading-none"
                  style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}
                >
                  {step.number}
                </span>
              </div>
              
              {/* Content */}
              <div className="md:w-2/3 pt-4">
                <h3 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
                  {step.title}
                </h3>
                <p className="font-body text-text-muted text-lg leading-relaxed max-w-xl">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
