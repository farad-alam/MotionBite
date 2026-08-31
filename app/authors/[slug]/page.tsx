import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllAuthorSlugs, getAuthor } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { PortableText } from '@/sanity/portableText'
import { personSchema } from '@/lib/schema'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)
  if (!author) return {}

  const fullName = `${author.firstName} ${author.lastName}`.trim()
  const avatarUrl = author.avatar?.asset
    ? urlFor(author.avatar).width(400).height(400).format('webp').url()
    : undefined
  const description =
    author.shortBio ??
    `Read all articles by ${fullName}, ${author.jobTitle ?? 'author'} at MotionBite.`

  return {
    title: `${fullName} — ${author.jobTitle ?? 'Author'} | MotionBite Blog`,
    description,
    openGraph: {
      type: 'profile',
      title: `${fullName} | MotionBite Blog`,
      description,
      url: `https://www.motionbite.com/authors/${slug}`,
      ...(avatarUrl ? { images: [{ url: avatarUrl, width: 400, height: 400 }] } : {}),
    },
    twitter: {
      card: 'summary',
      title: `${fullName} | MotionBite Blog`,
      description,
      ...(avatarUrl ? { images: [avatarUrl] } : {}),
    },
    alternates: {
      canonical: `https://www.motionbite.com/authors/${slug}`,
    },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthor(slug)
  if (!author) notFound()

  const fullName = `${author.firstName} ${author.lastName}`.trim()
  const avatarUrl = author.avatar?.asset
    ? urlFor(author.avatar).width(200).height(200).format('webp').url()
    : null

  const authorJsonLd = personSchema(
    author,
    avatarUrl ?? undefined,
  )

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.motionbite.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.motionbite.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: fullName,
        item: `https://www.motionbite.com/authors/${slug}`,
      },
    ],
  }

  const socials = [
    { label: 'LinkedIn', href: author.linkedin },
    { label: 'X / Twitter', href: author.twitter },
    { label: 'Website', href: author.website },
    { label: 'Facebook', href: author.facebook },
  ].filter((s) => s.href)

  const initials = `${author.firstName?.[0] ?? ''}${author.lastName?.[0] ?? ''}`.toUpperCase()

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-purple-primary text-sm font-body hover:underline mb-10 inline-block"
        >
          ← Back to Blog
        </Link>

        {/* Author header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-12 bg-dark-card border border-dark-border rounded-2xl p-8">
          {/* Avatar */}
          <div className="shrink-0">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={author.avatar?.alt ?? fullName}
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover border-2 border-purple-primary/30"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-purple-primary/10 border-2 border-purple-primary/20 flex items-center justify-center text-3xl font-heading font-bold text-purple-primary select-none">
                {initials || 'MB'}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-1">
              {fullName}
            </h1>

            <div className="flex items-center gap-3 flex-wrap mb-4">
              {author.jobTitle && (
                <span className="font-body text-purple-primary text-sm">{author.jobTitle}</span>
              )}
              {author.yearsExperience && (
                <>
                  <span className="text-dark-border">·</span>
                  <span className="font-body text-text-muted text-sm">
                    {author.yearsExperience}+ years experience
                  </span>
                </>
              )}
            </div>

            {author.shortBio && (
              <p className="font-body text-text-muted text-sm leading-relaxed mb-4">
                {author.shortBio}
              </p>
            )}

            {/* Expertise tags */}
            {author.expertiseAreas && author.expertiseAreas.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {author.expertiseAreas.map((area) => (
                  <span
                    key={area}
                    className="font-body text-xs px-2.5 py-1 rounded-full bg-purple-primary/10 border border-purple-primary/20 text-purple-primary"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}

            {/* Social links */}
            {socials.length > 0 && (
              <div className="flex items-center flex-wrap gap-3">
                {socials.map((s, i) => (
                  <span key={s.label} className="flex items-center gap-3">
                    {i > 0 && <span className="text-dark-border">·</span>}
                    <a
                      href={s.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-purple-primary hover:underline transition-colors"
                    >
                      {s.label}
                    </a>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Full bio */}
        {author.fullBio && author.fullBio.length > 0 && (
          <div className="mb-12 bg-dark-card border border-dark-border rounded-xl p-8">
            <h2 className="font-heading text-xl font-bold text-text-primary mb-4">About</h2>
            <PortableText value={author.fullBio} />
          </div>
        )}

        {/* Posts by this author */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
            Articles by {author.firstName}
            <span className="ml-2 font-body text-sm font-normal text-text-muted">
              ({author.posts?.length ?? 0} published)
            </span>
          </h2>

          {!author.posts || author.posts.length === 0 ? (
            <p className="font-body text-text-muted text-sm">No published articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {author.posts.map((post) => (
                <Link
                  key={post.slug.current}
                  href={`/blog/${post.slug.current}`}
                  className="group block bg-dark-card border border-dark-border rounded-xl p-5 hover:border-purple-primary/30 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {post.category && (
                      <span className="font-body text-xs text-purple-primary bg-purple-primary/10 border border-purple-primary/20 px-2 py-0.5 rounded-full">
                        {post.category.title}
                      </span>
                    )}
                    {post.readTime && (
                      <span className="font-body text-xs text-text-muted">{post.readTime}</span>
                    )}
                  </div>
                  <h3 className="font-heading text-base font-semibold text-text-primary group-hover:text-purple-primary transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-text-muted text-xs leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-text-muted">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="text-purple-primary text-sm group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
