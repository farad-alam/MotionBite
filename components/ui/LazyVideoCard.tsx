'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { PortfolioItem } from '@/data/portfolio'

interface LazyVideoCardProps {
  item: PortfolioItem
  /** First two cards load their image eagerly (above the fold) */
  priority?: boolean
}

const industryIcon = (industry: string) => {
  const map: Record<string, string> = {
    'Restaurant & Hospitality': '🍽️',
    'Fashion Retail': '👗',
    'Travel & Pilgrimage': '✈️',
    'Automotive Tech': '🚗',
    'Automotive Services': '🚗',
    'Fitness & Wellness': '💪',
    'SaaS / Social Media': '📱',
    'Healthcare & Diagnostics': '🏥',
    'Digital Marketing Agency': '📈',
  }
  return map[industry] ?? '💼'
}

export default function LazyVideoCard({ item, priority = false }: LazyVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Video src is only set when the user hovers — never on page load
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined)

  const handleMouseEnter = () => {
    if (!videoSrc && item.video) {
      setVideoSrc(item.video)
    }
    // If the video element is already in DOM, try to play it
    videoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    videoRef.current?.pause()
  }

  return (
    <Link
      href={item.href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block aspect-video rounded-3xl overflow-hidden bg-dark-base shadow-xl hover:shadow-2xl hover:shadow-purple-primary/10 transition-all duration-500 cursor-pointer"
    >
      {/* ── Poster image — plain img tag is fastest for local images ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.name}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
      />

      {/* ── Video — src only set on first hover, plays on each hover ── */}
      {item.video && (
        <video
          ref={videoRef}
          src={videoSrc}      // undefined until first hover → zero network cost on load
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-[1]"
        />
      )}

      {/* Dark Overlay on Hover */}
      <div className="absolute inset-0 bg-dark-base/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2]" />

      {/* Overlay Content */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-[3]">
        <div className="transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">

          {/* Title & Industry */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-primary/20 text-2xl flex items-center justify-center shrink-0">
              {industryIcon(item.industry)}
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">{item.name}</h2>
              <p className="font-body text-xs text-purple-primary uppercase tracking-widest mt-1">{item.industry}</p>
            </div>
          </div>

          {/* Result */}
          <div className="bg-dark-card/60 border border-purple-primary/30 rounded-xl p-5 mb-8 backdrop-blur-md shadow-lg">
            <p className="text-[10px] font-body text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-primary animate-pulse" /> Massive Impact
            </p>
            <p className="font-heading text-xl md:text-2xl font-bold text-purple-primary leading-tight">{item.result}</p>
          </div>

          {/* CTA */}
          <div className="inline-flex items-center gap-3 text-white font-heading font-semibold tracking-wide hover:text-purple-primary transition-colors">
            Read Full Case Study
            <span className="text-purple-primary text-xl transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>

        </div>
      </div>
    </Link>
  )
}
