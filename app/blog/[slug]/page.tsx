import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPost } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { PortableText } from '@/sanity/portableText'
import ReadingProgress from '@/components/ui/ReadingProgress'
import { articleSchema, faqSchema } from '@/lib/schema'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).format('webp').url()
    : undefined

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords ?? [],
    authors: [{ name: 'MotionBite', url: 'https://motionbite.com' }],
    alternates: {
      canonical: post.canonicalUrl ?? `https://motionbite.com/blog/${post.slug.current}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://motionbite.com/blog/${post.slug.current}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ['MotionBite'],
      tags: post.keywords ?? [],
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).format('webp').url()
    : undefined

  // JSON-LD schemas
  const articleJsonLd = articleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug.current,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.keywords,
    image: ogImage,
  })

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://motionbite.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://motionbite.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://motionbite.com/blog/${post.slug.current}` },
    ],
  }

  const faqJsonLd = post.faqItems && post.faqItems.length > 0
    ? faqSchema(post.faqItems)
    : null

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <ReadingProgress />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href="/blog" className="text-purple-primary text-sm font-body hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {post.category && (
            <span className="bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-2.5 py-1 rounded-full">
              {post.category.title}
            </span>
          )}
          {post.readTime && (
            <span className="text-text-muted text-xs font-body">{post.readTime}</span>
          )}
          <span className="text-text-muted text-xs font-body">
            {formatDate(post.publishedAt)}
          </span>
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <span className="text-text-muted text-xs font-body italic">
              Updated {formatDate(post.updatedAt)}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="font-body text-text-muted text-lg leading-relaxed mb-8 border-l-2 border-purple-primary/40 pl-4">
          {post.excerpt}
        </p>

        {/* Cover Image */}
        {post.mainImage?.asset && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-dark-border mb-12">
            <Image
              src={urlFor(post.mainImage).width(900).height(506).format('webp').url()}
              alt={post.mainImage.alt ?? post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body (Portable Text) */}
        {post.body && post.body.length > 0 && (
          <div className="mb-12">
            <PortableText value={post.body} />
          </div>
        )}

        {/* FAQ Section */}
        {post.faqItems && post.faqItems.length > 0 && (
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faqItems.map((item, i) => (
                <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-text-primary mb-2">{item.question}</h3>
                  <p className="font-body text-text-muted text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA box */}
        <div className="mt-12 bg-dark-card rounded-xl p-8 glow-border text-center">
          <p className="font-heading text-xl font-bold text-text-primary mb-2">
            Ready to grow your business online?
          </p>
          <p className="font-body text-text-muted text-sm mb-6">
            Get a free 30-minute consultation — we will tell you exactly what to improve.
          </p>
          <Link
            href="/free-consultation"
            className="inline-flex items-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-colors duration-200"
          >
            Book My Free Consultation →
          </Link>
        </div>

        {/* Related posts */}
        {post.related && post.related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-heading text-xl font-bold text-text-primary mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {post.related.map((r) => (
                <Link
                  key={r.slug.current}
                  href={`/blog/${r.slug.current}`}
                  className="block bg-dark-card rounded-xl p-5 glow-border hover:border-purple-primary/30 transition-all duration-200 group"
                >
                  <span className="text-xs font-body text-purple-primary mb-2 block">
                    {r.category?.title}
                  </span>
                  <h4 className="font-heading text-sm font-semibold text-text-primary group-hover:text-purple-primary transition-colors leading-snug mb-2">
                    {r.title}
                  </h4>
                  <span className="text-xs font-body text-text-muted">{r.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
