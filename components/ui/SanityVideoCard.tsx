'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SanityPortfolioProject } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

interface SanityVideoCardProps {
  project: SanityPortfolioProject
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
    'E-Commerce / Retail': '🛒',
    'Education': '🎓',
    'Real Estate': '🏠',
    'Finance & Legal': '⚖️',
    'Non-Profit / NGO': '🤝',
  }
  return map[industry] ?? '💼'
}

export default function SanityVideoCard({ project, priority = false }: SanityVideoCardProps) {
  const containerRef = useRef<HTMLAnchorElement>(null)
  const thumbnailUrl = urlFor(project.thumbnail).width(800).height(450).format('webp').url()
  const videoSrcInitial = priority ? project.demoVideo?.secure_url : undefined
  const [videoSrc, setVideoSrc] = useState<string | undefined>(videoSrcInitial)

  useEffect(() => {
    if (priority || !project.demoVideo?.secure_url) return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVideoSrc(project.demoVideo!.secure_url)
          observer.disconnect()
        }
      },
      { rootMargin: '200px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [project.demoVideo, priority])

  return (
    <Link
      ref={containerRef}
      href={`/portfolio/${project.slug.current}`}
      className="group relative block aspect-video rounded-3xl overflow-hidden bg-dark-base shadow-xl hover:shadow-2xl hover:shadow-purple-primary/10 transition-all duration-500 cursor-pointer"
    >
      {/* Thumbnail */}
      <Image
        src={thumbnailUrl}
        alt={project.thumbnail.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-110 z-0"
      />

      {/* Cloudinary autoplay video */}
      {project.demoVideo && (
        <video
          src={videoSrc}
          autoPlay
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
              {industryIcon(project.industry)}
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">{project.name}</h2>
              <p className="font-body text-xs text-purple-primary uppercase tracking-widest mt-1">{project.industry}</p>
            </div>
          </div>

          {/* Result */}
          <div className="bg-dark-card/60 border border-purple-primary/30 rounded-xl p-5 mb-6 backdrop-blur-md shadow-lg">
            <p className="text-[10px] font-body text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-primary animate-pulse" /> Key Result
            </p>
            <p className="font-heading text-xl md:text-2xl font-bold text-purple-primary leading-tight">{project.result}</p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.deliveryDays && (
              <span className="text-xs font-body bg-dark-card/70 border border-purple-primary/20 text-purple-primary px-2.5 py-1 rounded-full backdrop-blur-sm">
                ⚡ {project.deliveryDays} Day Delivery
              </span>
            )}
            {project.liveUrl && (
              <span className="text-xs font-body bg-dark-card/70 border border-purple-primary/20 text-purple-primary px-2.5 py-1 rounded-full backdrop-blur-sm">
                🌐 Live Site
              </span>
            )}
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
