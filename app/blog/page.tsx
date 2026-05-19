import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Web Design & Development Blog for Small Businesses | MotionBite',
  description:
    'Practical guides on web design, web development, SEO, and digital strategy for small businesses and restaurants. Free expert advice from the MotionBite team.',
  keywords: [
    'web design and development tips for small businesses',
    'small business web development guide',
    'website design and development advice',
    'restaurant website tips',
    'how to improve website conversions',
    'web design and development blog',
    'small business website development tips',
  ],
  openGraph: {
    type: 'website',
    title: 'Web Design & Development Blog for Small Businesses | MotionBite',
    description:
      'Practical guides on web design, web development, and SEO for small businesses. Free expert advice from the MotionBite team.',
    url: 'https://motionbite.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design & Development Blog for Small Businesses | MotionBite',
    description:
      'Practical guides on web design, web development, and SEO for small businesses. Free expert advice from the MotionBite team.',
  },
}

const allTags = ['All', ...Array.from(new Set(blogPosts.map((p) => p.tag)))]

export default function BlogPage() {
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-flex items-center gap-2 bg-green-primary/10 border border-green-primary/20 text-green-primary text-xs font-body px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
            Free Resources
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-4">
            Web Tips for{' '}
            <span className="text-green-primary">Small Businesses</span>
          </h1>
          <p className="font-body text-text-muted text-lg leading-relaxed">
            Practical guides on web design, SEO, and conversion — written for business owners, not developers.
          </p>
        </div>

        {/* Tag filter — visual only, links scroll to relevant posts */}
        <div className="flex flex-wrap gap-2 mb-12">
          {allTags.map((tag) => (
            <span
              key={tag}
              className={`font-body text-xs px-3 py-1.5 rounded-full border cursor-default transition-colors ${
                tag === 'All'
                  ? 'bg-green-primary/10 border-green-primary/30 text-green-primary'
                  : 'border-dark-border text-text-muted hover:border-green-primary/30 hover:text-green-primary'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-dark-card rounded-2xl overflow-hidden glow-border hover:border-green-primary/30 transition-all duration-300 mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image placeholder */}
            <div className="relative h-56 lg:h-auto bg-gradient-to-br from-green-primary/10 to-dark-base flex items-center justify-center">
              <div className="text-center px-8">
                <div className="w-16 h-16 rounded-xl bg-green-primary/10 border border-green-primary/20 flex items-center justify-center text-2xl mx-auto mb-3">
                  📝
                </div>
                <span className="font-body text-text-muted text-sm">Featured Article</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-primary/10 border border-green-primary/20 text-green-primary text-xs font-body px-2.5 py-1 rounded-full">
                  {featured.tag}
                </span>
                <span className="text-text-muted text-xs font-body">{featured.readTime}</span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary group-hover:text-green-primary transition-colors duration-200 mb-3 leading-snug">
                {featured.title}
              </h2>
              <p className="font-body text-text-muted text-sm leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-green-primary font-body text-sm font-semibold">Read article</span>
                <span className="text-green-primary text-sm group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Rest of posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-dark-card rounded-xl overflow-hidden glow-border hover:border-green-primary/30 transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
            >
              {/* Image area */}
              <div className="h-40 bg-gradient-to-br from-green-primary/5 to-dark-base flex items-center justify-center border-b border-dark-border">
                <div className="w-12 h-12 rounded-lg bg-green-primary/10 border border-green-primary/20 flex items-center justify-center text-xl">
                  {post.tag === 'SEO' ? '🔍' :
                   post.tag === 'Restaurant' ? '🍽️' :
                   post.tag === 'Pricing' ? '💰' :
                   post.tag === 'Strategy' ? '🎯' :
                   post.tag === 'Process' ? '⚡' :
                   post.tag === 'Case Study' ? '📊' :
                   post.tag === 'Copywriting' ? '✍️' : '📝'}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-primary/10 border border-green-primary/20 text-green-primary text-xs font-body px-2 py-0.5 rounded-full">
                    {post.tag}
                  </span>
                  <span className="text-text-muted text-xs font-body">{post.readTime}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-green-primary transition-colors duration-200 mb-2 leading-snug flex-1">
                  {post.title}
                </h3>
                <p className="font-body text-text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-body text-xs text-text-muted">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-green-primary text-sm group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-dark-card rounded-2xl p-10 glow-border">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
            Want a free website audit?
          </h2>
          <p className="font-body text-text-muted text-sm mb-6 max-w-md mx-auto">
            We will review your site and tell you exactly what is holding it back — for free.
          </p>
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-deep text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-colors duration-200"
          >
            Get My Free Audit →
          </Link>
        </div>
      </div>
    </div>
  )
}
