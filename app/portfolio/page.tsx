import type { Metadata } from 'next'
import Link from 'next/link'
import { portfolioItems } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Portfolio — Websites That Worked | MotionBite',
  description:
    'Real websites built for small businesses and restaurants. Reservations up 3x, inquiries doubled, bounce rate down 40%. View the full case studies.',
  keywords: [
    'web design portfolio',
    'small business website examples',
    'restaurant website portfolio',
    'website case studies',
    'web design results',
    'before and after website redesign',
    'small business web design examples',
  ],
  openGraph: {
    type: 'website',
    title: 'Portfolio — Websites That Worked | MotionBite',
    description:
      'Real websites built for small businesses and restaurants. Reservations up 3x, inquiries doubled. View the full case studies.',
    url: 'https://motionbite.com/portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — Websites That Worked | MotionBite',
    description:
      'Real websites built for small businesses and restaurants. Reservations up 3x, inquiries doubled. View the full case studies.',
  },
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-green-primary/10 border border-green-primary/20 text-green-primary text-xs font-body px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
              Real Work. Real Results.
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-6">
              Websites That{' '}
              <span className="text-green-primary">Worked</span>
            </h1>
            <p className="font-body text-text-muted text-lg md:text-xl leading-relaxed">
              Every project here came with a clear goal — more reservations, more inquiries, more revenue. Here is what happened.
            </p>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {portfolioItems.map((item, i) => (
            <div
              key={item.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image / Visual */}
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative bg-dark-card rounded-2xl overflow-hidden glow-border aspect-[4/3] flex items-center justify-center">
                  <div className="text-center px-10">
                    <div className="w-20 h-20 rounded-2xl bg-green-primary/10 border border-green-primary/20 flex items-center justify-center text-3xl mx-auto mb-4">
                      {item.industry === 'Restaurant' ? '🍽️' :
                       item.industry === 'Fashion Retail' ? '👗' : '💼'}
                    </div>
                    <p className="font-heading text-lg font-bold text-text-primary">{item.name}</p>
                    <p className="font-body text-text-muted text-sm">{item.industry}</p>
                  </div>
                  {/* Result badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-green-primary/10 border border-green-primary/20 rounded-lg px-4 py-2.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-primary animate-pulse shrink-0" />
                      <span className="font-heading text-sm font-bold text-green-primary">{item.result}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-dark-card border border-dark-border text-text-muted text-xs font-body px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="font-body text-xs text-green-primary uppercase tracking-widest mb-2">{item.industry}</p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">{item.name}</h2>

                <div className="mb-4">
                  <h3 className="font-heading text-xs uppercase tracking-wider text-text-muted mb-2">The Challenge</h3>
                  <p className="font-body text-text-muted text-sm leading-relaxed">{item.challenge}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-heading text-xs uppercase tracking-wider text-text-muted mb-2">What We Built</h3>
                  <p className="font-body text-text-muted text-sm leading-relaxed">{item.solution}</p>
                </div>

                {/* Key results */}
                <ul className="space-y-2 mb-6">
                  {item.results.map((r, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-body text-text-muted">
                      <span className="text-green-primary shrink-0 mt-0.5">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>

                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 border border-green-primary/40 text-green-primary hover:bg-green-primary/5 font-heading font-semibold text-sm px-5 py-2.5 rounded-md transition-all duration-200"
                >
                  View Full Case Study →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More coming */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-dark-card rounded-2xl p-10 glow-border">
          <div className="w-14 h-14 rounded-xl bg-green-primary/10 border border-green-primary/20 flex items-center justify-center text-2xl mx-auto mb-5">
            🚀
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
            Your Website Could Be Next
          </h2>
          <p className="font-body text-text-muted text-sm mb-6 max-w-md mx-auto">
            We are currently accepting new projects. Start with a free audit — we will show you exactly what your site needs.
          </p>
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-deep text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:scale-[1.02]"
          >
            Get My Free Audit →
          </Link>
          <p className="font-body text-text-muted text-xs mt-3">Free. No commitment. Reply within 24 hours.</p>
        </div>
      </section>
    </div>
  )
}
