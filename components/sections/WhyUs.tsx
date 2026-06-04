'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function WhyUs() {
  return (
    <section className="bg-[#FAFAFA] py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-primary" />
            <span className="text-text-charcoal uppercase tracking-widest text-sm font-semibold font-body">Why MotionBite</span>
          </div>
          <h2 className="font-heading font-black text-5xl md:text-6xl text-dark-base leading-tight">
            Design that looks good, <br />
            <span className="font-serif italic text-purple-primary">performs better.</span>
          </h2>
        </motion.div>

        {/* Dense 4-Col Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          
          {/* Card 1: Logo (1x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 lg:row-span-1 bg-purple-primary rounded-[32px] flex items-center justify-center p-8 shadow-sm hover:shadow-xl transition-shadow"
          >
            <h3 className="font-heading font-black text-5xl text-white tracking-tighter">
              mo<span className="text-white/50">°</span>
            </h3>
          </motion.div>

          {/* Card 2: App Icon / Wide Feature (2x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 lg:row-span-1 bg-[#F3F1F9] rounded-[32px] p-8 flex items-center justify-between overflow-hidden shadow-sm hover:shadow-xl transition-shadow relative"
          >
            <div className="relative z-10">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-xl text-dark-base">🍎</div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-xl text-dark-base">🤖</div>
              </div>
              <h3 className="font-heading font-bold text-3xl text-dark-base">Built to <br/> Convert</h3>
            </div>
            {/* Phone Mockup Placeholder */}
            <div className="absolute right-[-20px] bottom-[-40px] w-64 h-80 bg-dark-base rounded-[40px] border-[8px] border-dark-border/20 shadow-2xl rotate-12 overflow-hidden flex justify-center">
              <div className="w-32 h-6 bg-dark-border/20 absolute top-0 rounded-b-xl" /> {/* Notch */}
              <div className="mt-16 w-full px-6 grid grid-cols-2 gap-4">
                 <div className="w-full aspect-square bg-purple-primary rounded-xl" />
                 <div className="w-full aspect-square bg-white rounded-xl" />
                 <div className="w-full aspect-square bg-white rounded-xl" />
                 <div className="w-full aspect-square bg-purple-primary/50 rounded-xl" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Dedicated Team / Tech (1x2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1 lg:row-span-2 bg-[#F3F1F9] rounded-[32px] relative overflow-hidden flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all group"
          >
             {/* Purple Blob */}
             <div className="absolute top-1/4 w-64 h-64 bg-purple-primary/80 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
             
             {/* Floating Tech Icon */}
             <div className="relative z-10 w-full h-[60%] flex items-center justify-center mb-10">
               <div className="w-40 h-40 bg-white rounded-[40px] shadow-2xl flex items-center justify-center text-7xl -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 border border-purple-primary/10">
                 💻
               </div>
             </div>

             <div className="absolute bottom-10 right-[-20px] bg-white px-6 py-3 rounded-full shadow-xl z-20">
               <span className="font-heading font-black text-xl text-purple-primary tracking-tight">Dedicated Team</span>
             </div>
          </motion.div>

          {/* Card 4: New Users (1x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1 lg:row-span-1 bg-[#F3F1F9] rounded-[32px] p-8 flex flex-col justify-center shadow-sm hover:shadow-xl transition-shadow"
          >
            <p className="font-body text-text-charcoal font-medium mb-2">Delivery Time</p>
            <h3 className="font-heading font-black text-6xl text-dark-base mb-1 tracking-tighter">14</h3>
            <p className="font-body font-bold text-green-500 text-lg">Days avg</p>
          </motion.div>

          {/* Card 5: Rating (1x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-1 lg:row-span-1 bg-[#F3F1F9] rounded-[32px] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow relative"
          >
            <div className="flex justify-between items-start">
               <h3 className="font-heading font-black text-6xl text-dark-base tracking-tighter">100%</h3>
               <div className="w-10 h-10 rounded-full bg-purple-primary/10 flex items-center justify-center text-purple-primary font-bold">★</div>
            </div>
            
            <div className="text-sm font-semibold text-text-charcoal/50 uppercase tracking-widest mt-2 mb-2 w-full text-left">Client Satisfaction</div>
            <div className="flex -space-x-3 mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-12 h-12 rounded-full border-2 border-[#F3F1F9]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-12 h-12 rounded-full border-2 border-[#F3F1F9]" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-12 h-12 rounded-full border-2 border-[#F3F1F9]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="" />
            </div>
          </motion.div>

          {/* Card 6: Lifecycle / 3D (1x2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-1 lg:row-span-2 bg-[#F3F1F9] rounded-[32px] p-8 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden"
          >
            <h3 className="font-heading font-bold text-3xl text-dark-base leading-tight mt-4 text-left w-full">
              SEO <br/> Optimized <br/> for <br/> Google
            </h3>
            {/* 3D Object Placeholder - abstract shape */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
               src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" 
               alt="3D Shape" 
               className="w-48 h-48 object-cover rounded-full mix-blend-multiply"
            />
          </motion.div>

          {/* Card 7: MRR Wave Chart (2x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="lg:col-span-2 lg:row-span-1 bg-purple-primary rounded-[32px] p-8 relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
          >
            <div className="flex gap-6 z-20">
               <span className="flex items-center gap-2 text-white/80 font-body text-sm"><div className="w-2 h-2 rounded-full bg-cyan-400"/> Web Apps</span>
               <span className="flex items-center gap-2 text-white/80 font-body text-sm"><div className="w-2 h-2 rounded-full bg-white"/> Sites</span>
            </div>
            
            {/* Wave SVG */}
            <div className="absolute inset-0 top-1/3 opacity-50 flex items-end">
               <svg viewBox="0 0 1000 300" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0,150 C200,50 300,250 500,150 C700,50 800,250 1000,150 L1000,300 L0,300 Z" fill="rgba(255,255,255,0.1)" />
                  <path d="M0,200 C200,100 300,300 500,200 C700,100 800,300 1000,200 L1000,300 L0,300 Z" fill="rgba(255,255,255,0.15)" />
                  <path d="M0,250 C200,150 300,350 500,250 C700,150 800,350 1000,250 L1000,300 L0,300 Z" fill="rgba(255,255,255,0.2)" />
               </svg>
            </div>

            <div className="relative z-20 self-end text-right">
               <p className="text-white/80 font-body uppercase tracking-wider text-sm mb-1">Projects Delivered</p>
               <h3 className="font-heading font-black text-5xl text-white tracking-tight">150+</h3>
            </div>
          </motion.div>

          {/* Card 8: Revenue Pie Chart (1x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="lg:col-span-1 lg:row-span-1 bg-purple-primary rounded-[32px] p-8 relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-end"
          >
            {/* Abstract Pie Shape */}
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full flex items-center justify-center">
               <div className="w-48 h-48 bg-white/20 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)' }} />
               <div className="absolute bottom-12 left-8 bg-white px-3 py-1 rounded-full shadow-lg">
                  <span className="font-bold text-purple-primary text-sm">+40%</span>
               </div>
            </div>

            <div className="relative z-20">
               <p className="text-white/80 font-body mb-1">Conversion Rate</p>
               <h3 className="font-heading font-black text-4xl text-white tracking-tight">Avg</h3>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
