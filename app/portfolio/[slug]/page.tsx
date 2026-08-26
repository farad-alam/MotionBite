import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { portfolioItems } from '@/data/portfolio'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = portfolioItems.find((p) => p.slug === slug)
  if (!item) return {}
  return {
    title: `${item.name} Case Study | MotionBite Portfolio`,
    description: `How MotionBite helped ${item.name} — a ${item.industry} business — achieve: ${item.result}. Read the full web design case study.`,
    keywords: [
      `${item.industry.toLowerCase()} website design and development`,
      'web design and development case study',
      'business website design and development results',
      'website redesign and development results',
      'MotionBite portfolio',
    ],
    openGraph: {
      type: 'website',
      title: `${item.name} Case Study | MotionBite Portfolio`,
      description: `How MotionBite helped ${item.name} achieve: ${item.result}. Full case study.`,
      url: `https://motionbite.com/portfolio/${item.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.name} Case Study | MotionBite Portfolio`,
      description: `How MotionBite helped ${item.name} achieve: ${item.result}.`,
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = portfolioItems.find((p) => p.slug === slug)
  if (!item) notFound()

  const otherProjects = portfolioItems.filter((p) => p.slug !== slug)

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link href="/portfolio" className="text-purple-primary text-sm font-body hover:underline mb-8 inline-block">
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <span key={tag} className="bg-dark-card border border-dark-border text-text-muted text-xs font-body px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <p className="font-body text-xs text-purple-primary uppercase tracking-widest mb-2">{item.industry}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">
            {item.name}
          </h1>
          <div className="inline-flex items-center gap-2 bg-purple-primary/10 border border-purple-primary/20 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-purple-primary animate-pulse" />
            <span className="font-heading text-sm font-bold text-purple-primary">{item.result}</span>
          </div>
        </div>

        {/* Hero visual */}
        <div className="rounded-2xl glow-border aspect-[16/7] mb-12 overflow-hidden relative">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              priority
              className="object-cover"
            />
          ) : (
            <div className="bg-dark-card w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-2xl bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-4xl mx-auto mb-4">💼</div>
                <p className="font-heading text-2xl font-bold text-text-primary">{item.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Case study content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">The Challenge</h2>
              <p className="font-body text-text-muted leading-relaxed">{item.challenge}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">What We Built</h2>
              <p className="font-body text-text-muted leading-relaxed">{item.solution}</p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">The Results</h2>
              <ul className="space-y-3">
                {item.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-text-muted">
                    <span className="w-5 h-5 rounded-full bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-purple-primary text-xs shrink-0 mt-0.5">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-dark-card rounded-xl p-5 glow-border">
              <h3 className="font-heading text-sm font-bold text-text-primary mb-3 uppercase tracking-wider">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="bg-purple-primary/5 border border-purple-primary/10 text-purple-primary text-xs font-body px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-dark-card rounded-xl p-5 glow-border">
              <h3 className="font-heading text-sm font-bold text-text-primary mb-3 uppercase tracking-wider">Industry</h3>
              <p className="font-body text-text-muted text-sm">{item.industry}</p>
            </div>

            <div className="bg-dark-card rounded-xl p-5 glow-border">
              <h3 className="font-heading text-sm font-bold text-text-primary mb-2 uppercase tracking-wider">Key Result</h3>
              <p className="font-heading text-purple-primary font-bold">{item.result}</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        {item.testimonial && (
          <div className="bg-dark-card rounded-2xl p-8 glow-border mb-12 border-l-4 border-purple-primary/40">
            <p className="font-body text-text-primary text-lg leading-relaxed mb-4 italic">
              &ldquo;{item.testimonial}&rdquo;
            </p>
            <p className="font-heading text-sm font-semibold text-purple-primary">{item.clientName}</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center bg-dark-card rounded-2xl p-8 glow-border mb-12">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">
            Want results like these?
          </h2>
          <p className="font-body text-text-muted text-sm mb-6 max-w-md mx-auto">
            Start with a free 30-minute audit — we will show you exactly what your website needs.
          </p>
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-all duration-200"
          >
            Get My Free Audit →
          </Link>
        </div>

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-6">More Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherProjects.slice(0, 4).map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="block bg-dark-card rounded-xl overflow-hidden glow-border hover:border-purple-primary/30 transition-all duration-200 group"
                >
                  {/* Thumbnail */}
                  {p.image && (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="font-body text-xs text-purple-primary mb-1">{p.industry}</p>
                    <h4 className="font-heading text-base font-bold text-text-primary group-hover:text-purple-primary transition-colors mb-2">
                      {p.name}
                    </h4>
                    <p className="font-body text-xs text-text-muted">{p.result}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
