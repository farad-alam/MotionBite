import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, type SanityPostCard } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Web Design & Development Blog for Businesses | MotionBite',
  description:
    'Practical guides on web design, web development, SEO, and digital strategy for businesses and restaurants. Free expert advice from the MotionBite team.',
  keywords: [
    'web design and development tips for businesses',
    'business web development guide',
    'website design and development advice',
    'restaurant website tips',
    'how to improve website conversions',
    'web design and development blog',
    'business website development tips',
  ],
  openGraph: {
    type: 'website',
    title: 'Web Design & Development Blog for Businesses | MotionBite',
    description:
      'Practical guides on web design, web development, and SEO for businesses. Free expert advice from the MotionBite team.',
    url: 'https://motionbite.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design & Development Blog for Businesses | MotionBite',
    description:
      'Practical guides on web design, web development, and SEO for businesses. Free expert advice from the MotionBite team.',
  },
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function PostImage({ post, className }: { post: SanityPostCard; className?: string }) {
  if (post.mainImage?.asset) {
    return (
      <Image
        src={urlFor(post.mainImage).width(900).height(500).format('webp').url()}
        alt={post.mainImage.alt ?? post.title}
        fill
        className={`object-cover ${className ?? ''}`}
      />
    )
  }
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center px-8">
        <div className="w-16 h-16 rounded-xl bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-2xl mx-auto mb-3">
          📝
        </div>
        <span className="font-body text-text-muted text-sm">Featured Article</span>
      </div>
    </div>
  )
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  const allTags = ['All', ...Array.from(new Set(posts.map((p) => p.category?.title).filter(Boolean)))]

  if (!featured) {
    return (
      <div className="min-h-screen bg-dark-base pt-32 pb-20 flex items-center justify-center">
        <p className="font-body text-text-muted">No posts yet. Add your first post in the Studio!</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-flex items-center gap-2 bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-primary" />
            Free Resources
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-4">
            Web Tips for{' '}
            <span className="text-purple-primary">Businesses</span>
          </h1>
          <p className="font-body text-text-muted text-lg leading-relaxed">
            Practical guides on web design, SEO, and conversion — written for business owners, not developers.
          </p>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {allTags.map((tag) => (
            <span
              key={tag}
              className={`font-body text-xs px-3 py-1.5 rounded-full border cursor-default transition-colors ${
                tag === 'All'
                  ? 'bg-purple-primary/10 border-purple-primary/30 text-purple-primary'
                  : 'border-dark-border text-text-muted hover:border-purple-primary/30 hover:text-purple-primary'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug.current}`}
          className="group block bg-dark-card rounded-2xl overflow-hidden glow-border hover:border-purple-primary/30 transition-all duration-300 mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-56 lg:h-auto bg-gradient-to-br from-purple-primary/10 to-dark-base">
              <PostImage post={featured} className="saturate-[0.85] group-hover:saturate-100 transition-all duration-500" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-2.5 py-1 rounded-full">
                  {featured.category?.title}
                </span>
                {featured.readTime && (
                  <span className="text-text-muted text-xs font-body">{featured.readTime}</span>
                )}
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary group-hover:text-purple-primary transition-colors duration-200 mb-3 leading-snug">
                {featured.title}
              </h2>
              <p className="font-body text-text-muted text-sm leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-purple-primary font-body text-sm font-semibold">Read article</span>
                <span className="text-purple-primary text-sm group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug.current}
              href={`/blog/${post.slug.current}`}
              className="group block bg-dark-card rounded-xl overflow-hidden glow-border hover:border-purple-primary/30 transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
            >
              <div className="relative h-40 bg-gradient-to-br from-purple-primary/5 to-dark-base border-b border-dark-border overflow-hidden">
                {post.mainImage?.asset ? (
                  <Image
                    src={urlFor(post.mainImage).width(600).height(320).format('webp').url()}
                    alt={post.mainImage.alt ?? post.title}
                    fill
                    className="object-cover saturate-[0.85] group-hover:saturate-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-12 h-12 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-xl">
                      📝
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-2 py-0.5 rounded-full">
                    {post.category?.title}
                  </span>
                  {post.readTime && (
                    <span className="text-text-muted text-xs font-body">{post.readTime}</span>
                  )}
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-purple-primary transition-colors duration-200 mb-2 leading-snug flex-1">
                  {post.title}
                </h3>
                <p className="font-body text-text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-body text-xs text-text-muted">
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="text-purple-primary text-sm group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-dark-card rounded-2xl p-10 glow-border">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
            Want a free website consultation?
          </h2>
          <p className="font-body text-text-muted text-sm mb-6 max-w-md mx-auto">
            We will review your site and tell you exactly what is holding it back — for free.
          </p>
          <Link
            href="/free-consultation"
            className="inline-flex items-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-colors duration-200"
          >
            Book a Free Consultation →
          </Link>
        </div>

      </div>
    </div>
  )
}
