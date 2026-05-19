import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blog-posts'
import { notFound } from 'next/navigation'
import ReadingProgress from '@/components/ui/ReadingProgress'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | MotionBite Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  // Related posts (same tag, excluding current)
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.tag === post.tag).slice(0, 2)

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <ReadingProgress />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href="/blog" className="text-green-primary text-sm font-body hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-green-primary/10 border border-green-primary/20 text-green-primary text-xs font-body px-2.5 py-1 rounded-full">
            {post.tag}
          </span>
          <span className="text-text-muted text-xs font-body">{post.readTime}</span>
          <span className="text-text-muted text-xs font-body">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="font-body text-text-muted text-lg leading-relaxed mb-12 border-l-2 border-green-primary/40 pl-4">
          {post.excerpt}
        </p>

        {/* Article content */}
        <div className="space-y-8">
          {post.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">
                  {section.heading}
                </h2>
              )}
              <p className="font-body text-text-muted leading-relaxed text-base">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA box */}
        <div className="mt-16 bg-dark-card rounded-xl p-8 glow-border text-center">
          <p className="font-heading text-xl font-bold text-text-primary mb-2">
            Ready to fix your website?
          </p>
          <p className="font-body text-text-muted text-sm mb-6">
            Get a free 30-minute audit — we will tell you exactly what to improve.
          </p>
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-deep text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-colors duration-200"
          >
            Get Your Free Audit →
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-heading text-xl font-bold text-text-primary mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="block bg-dark-card rounded-xl p-5 glow-border hover:border-green-primary/30 transition-all duration-200 group"
                >
                  <span className="text-xs font-body text-green-primary mb-2 block">{r.tag}</span>
                  <h4 className="font-heading text-sm font-semibold text-text-primary group-hover:text-green-primary transition-colors leading-snug mb-2">
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
