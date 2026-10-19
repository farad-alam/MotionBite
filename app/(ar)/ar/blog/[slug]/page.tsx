import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArabicPostSlugs, getPost } from '@/sanity/queries'
import { isDraftMode } from '@/lib/draft'
import { urlFor } from '@/sanity/image'
import { PortableText } from '@/sanity/portableText'
import ReadingProgress from '@/components/ui/ReadingProgress'
import TableOfContents from '@/components/blog/TableOfContents'
import Arrow from '@/components/ui/Arrow'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema'
import { arabicOgLocale, getTwin, languagesFor } from '@/lib/hreflang'
import { getArabicSiteSettings } from '@/lib/landing'
import { t, formatDate, formatReadTime, otherLanguageLabel } from '@/lib/i18n'

// /ar/blog/[slug] (WP3 5.5): the post template with the RTL rules from 5.3.
export const revalidate = false

const BASE = 'https://www.motionbite.com'
const DEFAULT_OG = `${BASE}/opengraph-image.png`
const strings = t('ar')

export async function generateStaticParams() {
  const slugs = await getArabicPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug, 'ar')
  if (!post) return {}
  const path = `/ar/blog/${post.slug.current}`
  const url = `${BASE}${path}`
  const twin = await getTwin(path, 'ar')
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).format('webp').url()
    : DEFAULT_OG
  const authorName = post.author ? `${post.author.firstName} ${post.author.lastName}`.trim() : 'MotionBite'

  return {
    ...((await isDraftMode()) ? { robots: { index: false, follow: false } } : {}),
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords ?? [],
    authors: [{ name: authorName }],
    alternates: {
      canonical: post.canonicalUrl ?? url,
      ...(twin ? { languages: languagesFor(twin) } : {}),
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      locale: arabicOgLocale(twin?.hreflang),
      alternateLocale: ['en_US'],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [authorName],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [ogImage] },
  }
}

export default async function ArabicPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug, 'ar')
  if (!post) notFound()

  const path = `/ar/blog/${post.slug.current}`
  const [twin, settings] = await Promise.all([getTwin(path, 'ar'), getArabicSiteSettings()])
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).format('webp').url()
    : undefined
  const authorAvatarUrl = post.author?.avatar?.asset
    ? urlFor(post.author.avatar).width(200).height(200).format('webp').url()
    : undefined
  const readTime = formatReadTime(post.readMinutes, 'ar')
  const hasBody = !!post.body && post.body.length > 0
  const faq = post.faqItems?.filter((f) => f.question && f.answer) ?? []

  const articleJsonLd = articleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug.current,
    path,
    inLanguage: 'ar',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.keywords,
    image: ogImage,
    wordCount: post.wordCount,
    author: post.author,
    authorAvatarUrl,
  })
  const crumbs = [
    { name: strings.home, path: '/ar' },
    { name: strings.blog, path: '/ar/blog' },
    { name: post.title, path },
  ]

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }} />
      {faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faq)) }} />
      )}

      <ReadingProgress />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12 justify-center">
          {hasBody && <TableOfContents body={post.body!} variant="desktop" locale="ar" />}

          <article className="w-full max-w-3xl min-w-0 text-start">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <Link href="/ar/blog" className="text-purple-primary text-sm font-body hover:underline inline-flex items-center gap-1">
                <Arrow back /> {strings.backToBlog}
              </Link>
              {twin && (
                <Link href={twin.enPath} hrefLang="en" lang="en" className="text-purple-primary text-sm font-body hover:underline">
                  {otherLanguageLabel('ar')}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {post.category && (
                <span className="bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-2.5 py-1 rounded-full">
                  <bdi>{post.category.title}</bdi>
                </span>
              )}
              {readTime && <span className="text-text-muted text-xs font-body">{readTime}</span>}
              <span className="text-text-muted text-xs font-body">{formatDate(post.publishedAt, 'ar')}</span>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <span className="text-text-muted text-xs font-body">
                  {strings.updated} {formatDate(post.updatedAt, 'ar')}
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
              {post.title}
            </h1>

            <p className="font-body text-text-muted text-lg leading-relaxed mb-8 border-s-2 border-purple-primary/40 ps-4">
              {post.excerpt}
            </p>

            {post.mainImage?.asset && (
              <div className="relative w-full aspect-video max-h-[280px] sm:max-h-none rounded-xl overflow-hidden border border-dark-border mb-8">
                <Image
                  src={urlFor(post.mainImage).width(900).height(506).format('webp').url()}
                  alt={post.mainImage.alt ?? post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {hasBody && (
              <div className="xl:hidden">
                <TableOfContents body={post.body!} variant="mobile" locale="ar" />
              </div>
            )}

            {hasBody && (
              <div className="mb-12">
                <PortableText value={post.body!} />
              </div>
            )}

            {post.author && (
              <p className="font-body text-text-muted text-sm mb-12 py-6 border-y border-dark-border">
                {strings.writtenBy}{' '}
                <bdi className="text-text-primary font-semibold">{`${post.author.firstName} ${post.author.lastName}`.trim()}</bdi>
                {post.author.jobTitle && (
                  <>
                    {' · '}
                    <bdi>{post.author.jobTitle}</bdi>
                  </>
                )}
              </p>
            )}

            {faq.length > 0 && (
              <section className="mb-12">
                <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">{strings.faq}</h2>
                <div className="space-y-4">
                  {faq.map((item, i) => (
                    <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-6">
                      <h3 className="font-heading font-semibold text-text-primary mb-2">{item.question}</h3>
                      <p className="font-body text-text-muted text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-12 bg-dark-card rounded-xl p-6 sm:p-8 glow-border text-center">
              <p className="font-heading text-xl font-bold text-text-primary mb-6">{strings.closingCta}</p>
              <Link
                href={settings.cta.href}
                className="inline-flex items-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-colors duration-200"
              >
                {settings.cta.label} <Arrow />
              </Link>
            </div>

            {post.related && post.related.length > 0 && (
              <section className="mt-16">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-6">{strings.relatedArticles}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.related.map((r) => (
                    <Link
                      key={r.slug.current}
                      href={`/ar/blog/${r.slug.current}`}
                      className="block bg-dark-card rounded-xl p-5 glow-border hover:border-purple-primary/30 transition-all duration-200 group"
                    >
                      {r.category?.title && (
                        <span className="text-xs font-body text-purple-primary mb-2 block">
                          <bdi>{r.category.title}</bdi>
                        </span>
                      )}
                      <h3 className="font-heading text-sm font-semibold text-text-primary group-hover:text-purple-primary transition-colors leading-snug mb-2">
                        {r.title}
                      </h3>
                      <span className="text-xs font-body text-text-muted">{formatReadTime(r.readMinutes, 'ar')}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  )
}
