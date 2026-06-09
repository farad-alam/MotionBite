import type { Metadata } from 'next'
import { portfolioItems } from '@/data/portfolio'
import Link from 'next/link'
import LazyVideoCard from '@/components/ui/LazyVideoCard'

export const metadata: Metadata = {
  title: 'Portfolio — Websites That Worked | MotionBite',
  description:
    'Real websites built for small businesses and restaurants. Reservations up 3x, inquiries doubled, bounce rate down 40%. View the full case studies.',
  keywords: [
    'web design and development portfolio',
    'small business website examples',
    'restaurant web design and development portfolio',
    'website design and development case studies',
    'web design and development results',
    'before and after website redesign',
    'small business web development examples',
  ],
  openGraph: {
    type: 'website',
    title: 'Portfolio — Websites That Worked | MotionBite',
    description:
      'Real websites designed and developed for small businesses and restaurants. Reservations up 3x, inquiries doubled. View the full case studies.',
    url: 'https://motionbite.com/portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — Websites That Worked | MotionBite',
    description:
      'Real websites designed and developed for small businesses and restaurants. Reservations up 3x, inquiries doubled. View the full case studies.',
  },
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-primary animate-pulse" />
              Not Just Pretty Design. Real ROI.
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-text-primary leading-tight mb-6">
              Stop Losing Customers to <span className="text-purple-primary block mt-2">Outdated Design</span>
            </h1>
            <p className="font-body text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
              These businesses were leaking revenue because their websites didn't build trust. See how we turned their online presence into their strongest sales asset.
            </p>
          </div>
        </div>
      </section>

      {/* Case studies - Hover Reveal Layout */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolioItems.map((item, index) => (
            <LazyVideoCard key={item.id} item={item} priority={index < 2} />
          ))}
        </div>
      </section>

      {/* Final Exit CTA */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-dark-card to-dark-base border border-purple-primary/20 rounded-3xl p-10 md:p-16 glow-border relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-purple-primary/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-3xl mx-auto mb-8 shadow-inner">
              🚀
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Stop Waiting For Growth.<br/>
              <span className="text-purple-primary">Make It Happen.</span>
            </h2>
            <p className="font-body text-text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              We are currently accepting new projects. Start with a free audit — we will show you exactly what your current site is missing, no strings attached.
            </p>
            <Link
              href="/free-audit"
              className="inline-flex items-center justify-center gap-3 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading text-lg font-bold px-8 py-4 md:py-5 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_-10px_rgba(0,200,150,0.5)]"
            >
              Get My Free Audit <span className="text-xl">→</span>
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 text-text-muted text-sm font-body">
              <span className="flex items-center gap-2"><span className="text-purple-primary">✓</span> Free</span>
              <span className="flex items-center gap-2"><span className="text-purple-primary">✓</span> No commitment</span>
              <span className="flex items-center gap-2"><span className="text-purple-primary">✓</span> Reply within 24h</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
