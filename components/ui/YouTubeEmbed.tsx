'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface YouTubeEmbedProps {
  url: string
  thumbnail: string
  title: string
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&\s]+)/,
    /youtube\.com\/watch\?v=([^?&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/,
    /youtube\.com\/shorts\/([^?&\s]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function YouTubeEmbed({ url, thumbnail, title }: YouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const videoId = getYouTubeId(url)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px', threshold: 0 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  if (!videoId) return null

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-2xl overflow-hidden glow-border bg-dark-card cursor-pointer group"
      onClick={() => setIsLoaded(true)}
    >
      {/* Show iframe only when clicked or we load it */}
      {isInView && isLoaded ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <>
          {/* Thumbnail facade — no network request to YouTube until clicked */}
          <Image
            src={thumbnail}
            alt={`${title} demo video`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 896px"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-dark-base/40 transition-opacity group-hover:bg-dark-base/30" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center font-body text-xs text-white/70">
            Click to watch demo
          </p>
        </>
      )}
    </div>
  )
}
