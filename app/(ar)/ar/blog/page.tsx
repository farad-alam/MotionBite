import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArabicPosts } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { t, formatDate, formatReadTime } from '@/lib/i18n'
import { breadcrumbSchema } from '@/lib/schema'
import Arrow from '@/components/ui/Arrow'

// /ar/blog (WP3 5.5): published posts with language == "ar", newest first.
// 404 until the first Arabic post is published, so nothing empty is indexed.
export const revalidate = false

const strings = t('ar')
const PAGE_URL = 'https://www.motionbite.com/ar/blog'

export const metadata: Metadata = {
  title: strings.blogTitle,
  description: strings.blogDescription,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    title: `${strings.blogTitle} | MotionBite`,
    description: strings.blogDescription,
    url: PAGE_URL,
    locale: 'ar_SA',
    alternateLocale: ['en_US'],
    images: ['https://www.motionbite.com/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${strings.blogTitle} | MotionBite`,
    description: strings.blogDescription,
    images: ['https://www.motionbite.com/opengraph-image.png'],
  },
}

export default async function ArabicBlogPage() {
  const posts = await getArabicPosts()
  if (posts.length === 0) notFound()

  const crumbs = [
    { name: strings.home, path: '/ar' },
    { name: strings.blog, path: '/ar/blog' },
  ]

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 text-start">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-4">
            {strings.blogTitle}
          </h1>
          <p className="font-body text-text-muted text-lg leading-relaxed">{strings.blogDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const readTime = formatReadTime(post.readMinutes, 'ar')
            return (
              <Link
                key={post.slug.current}
                href={`/ar/blog/${post.slug.current}`}
                className="group block bg-dark-card rounded-xl overflow-hidden glow-border hover:border-purple-primary/30 transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
              >
                <div className="relative aspect-video bg-gradient-to-br from-purple-primary/5 to-dark-base border-b border-dark-border overflow-hidden">
                  {post.mainImage?.asset ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(320).format('webp').url()}
                      alt={post.mainImage.alt ?? post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
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

                <div className="p-5 flex flex-col flex-1 text-start">
                  <div className="flex items-center gap-2 mb-3">
                    {post.category?.title && (
                      <span className="bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-2 py-0.5 rounded-full">
                        <bdi>{post.category.title}</bdi>
                      </span>
                    )}
                    {readTime && <span className="text-text-muted text-xs font-body">{readTime}</span>}
                  </div>
                  <h2 className="font-heading text-lg font-bold text-text-primary group-hover:text-purple-primary transition-colors duration-200 mb-2 leading-snug flex-1">
                    {post.title}
                  </h2>
                  <p className="font-body text-text-muted text-xs leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-dark-border/40 text-xs font-body text-text-muted">
                    {post.author ? (
                      <bdi className="text-text-primary font-medium">
                        {`${post.author.firstName} ${post.author.lastName}`.trim()}
                      </bdi>
                    ) : (
                      <span />
                    )}
                    <span>{formatDate(post.publishedAt, 'ar', 'short')}</span>
                  </div>
                  <span className="text-purple-primary text-sm mt-3">
                    {strings.readArticle} <Arrow />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
