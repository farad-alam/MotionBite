import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPortfolioProjects, getPortfolioProject } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getPortfolioProjects()
  return projects.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = await getPortfolioProject(slug)
  if (!item) return {}

  const title = item.seoTitle || `${item.name} Case Study | MotionBite Portfolio`
  const description = item.seoDescription || `How MotionBite helped ${item.name} — a ${item.industry} business — achieve: ${item.result}. Read the full web design case study.`
  const thumbnailUrl = urlFor(item.thumbnail).width(1200).height(630).format('webp').url()

  return {
    title,
    description,
    keywords: item.seoKeywords
      ? item.seoKeywords.split(',').map((k) => k.trim())
      : [`${item.industry.toLowerCase()} website design`, 'web design case study', 'MotionBite portfolio'],
    alternates: { canonical: `https://www.motionbite.com/portfolio/${item.slug.current}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `https://www.motionbite.com/portfolio/${item.slug.current}`,
      images: [{ url: thumbnailUrl, width: 1200, height: 630, alt: item.thumbnail.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [thumbnailUrl],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getPortfolioProject(slug)
  if (!item) notFound()

  const otherProjects = (await getPortfolioProjects()).filter((p) => p.slug.current !== slug).slice(0, 4)
  const thumbnailUrl = urlFor(item.thumbnail).width(1600).height(700).format('webp').url()

  // Structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.motionbite.com' },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://www.motionbite.com/portfolio' },
      { '@type': 'ListItem', position: 3, name: item.name, item: `https://www.motionbite.com/portfolio/${item.slug.current}` },
    ],
  }

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.name,
    description: `${item.challenge} ${item.solution}`,
    creator: { '@type': 'Organization', name: 'MotionBite', url: 'https://www.motionbite.com' },
    dateCreated: item.completedAt || undefined,
    url: `https://www.motionbite.com/portfolio/${item.slug.current}`,
    ...(item.liveUrl ? { sameAs: item.liveUrl } : {}),
  }

  // Determine which video to show on detail page
  const hasYouTube = Boolean(item.youtubeUrl)
  const hasCloudinaryVideo = Boolean(item.demoVideo?.secure_url)
  const showVideoSection = hasYouTube || hasCloudinaryVideo

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation row */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <Link href="/portfolio" className="text-purple-primary text-sm font-body hover:underline inline-flex items-center gap-1">
            ← Back to Portfolio
          </Link>
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-purple-primary border border-purple-primary/30 bg-purple-primary/5 hover:bg-purple-primary/10 px-4 py-1.5 rounded-full transition-all duration-200"
            >
              🌐 Visit Live Site →
            </a>
          )}
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {item.services?.map((s) => (
              <span key={s} className="bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-2.5 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
          <p className="font-body text-xs text-purple-primary uppercase tracking-widest mb-2">{item.industry}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">
            {item.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-purple-primary/10 border border-purple-primary/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-purple-primary animate-pulse" />
              <span className="font-heading text-sm font-bold text-purple-primary">{item.result}</span>
            </div>
            {item.deliveryDays && (
              <span className="inline-flex items-center gap-1.5 text-xs font-body text-text-muted border border-dark-border bg-dark-card rounded-full px-3 py-1.5">
                ⚡ Delivered in {item.deliveryDays} days
              </span>
            )}
            {item.completedAt && (
              <span className="text-xs font-body text-text-muted">
                Completed: {new Date(item.completedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>

        {/* Metrics Bar */}
        {item.metrics && item.metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {item.metrics.map((m) => (
              <div key={m.label} className="bg-dark-card rounded-xl p-4 glow-border text-center">
                <p className="font-heading text-2xl font-bold text-purple-primary">{m.value}</p>
                <p className="font-body text-xs text-text-muted mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Hero visual */}
        <div className="rounded-2xl glow-border aspect-[16/7] mb-12 overflow-hidden relative">
          <Image
            src={thumbnailUrl}
            alt={item.thumbnail.alt}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            className="object-cover"
          />
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
            {item.services && item.services.length > 0 && (
              <div className="bg-dark-card rounded-xl p-5 glow-border">
                <h3 className="font-heading text-sm font-bold text-text-primary mb-3 uppercase tracking-wider">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {item.services.map((s) => (
                    <span key={s} className="bg-purple-primary/5 border border-purple-primary/10 text-purple-primary text-xs font-body px-2.5 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-dark-card rounded-xl p-5 glow-border">
              <h3 className="font-heading text-sm font-bold text-text-primary mb-3 uppercase tracking-wider">Industry</h3>
              <p className="font-body text-text-muted text-sm">{item.industry}</p>
            </div>
            <div className="bg-dark-card rounded-xl p-5 glow-border">
              <h3 className="font-heading text-sm font-bold text-text-primary mb-2 uppercase tracking-wider">Key Result</h3>
              <p className="font-heading text-purple-primary font-bold">{item.result}</p>
            </div>
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-purple-primary/10 border border-purple-primary/20 hover:bg-purple-primary/20 text-purple-primary font-heading text-sm font-semibold px-4 py-3 rounded-xl transition-all duration-200"
              >
                🌐 Visit Live Site →
              </a>
            )}
          </div>
        </div>

        {/* Video Section */}
        {showVideoSection && (
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">Watch the Demo</h2>
            {hasYouTube ? (
              <YouTubeEmbed url={item.youtubeUrl!} thumbnail={thumbnailUrl} title={item.name} />
            ) : (
              <div className="rounded-2xl overflow-hidden glow-border aspect-video bg-dark-card">
                <video
                  src={item.demoVideo!.secure_url}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                  poster={thumbnailUrl}
                />
              </div>
            )}
          </div>
        )}

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
            href="/free-consultation"
            className="inline-flex items-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-all duration-200"
          >
            Get My Free Audit →
          </Link>
        </div>

        {/* More Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-6">More Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherProjects.map((p) => {
                const pThumb = urlFor(p.thumbnail).width(600).height(340).format('webp').url()
                return (
                  <Link
                    key={p.slug.current}
                    href={`/portfolio/${p.slug.current}`}
                    className="block bg-dark-card rounded-xl overflow-hidden glow-border hover:border-purple-primary/30 transition-all duration-200 group"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={pThumb}
                        alt={p.thumbnail.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-body text-xs text-purple-primary mb-1">{p.industry}</p>
                      <h4 className="font-heading text-base font-bold text-text-primary group-hover:text-purple-primary transition-colors mb-2">
                        {p.name}
                      </h4>
                      <p className="font-body text-xs text-text-muted">{p.result}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
