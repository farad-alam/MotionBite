import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blog-posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-green-primary text-sm font-body hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-green-primary/10 border border-green-primary/20 text-green-primary text-xs font-body px-2.5 py-1 rounded-full">
            {post.tag}
          </span>
          <span className="text-text-muted text-xs font-body">{post.readTime}</span>
          <span className="text-text-muted text-xs font-body">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
          {post.title}
        </h1>
        <p className="font-body text-text-muted text-lg leading-relaxed mb-12 border-l-2 border-green-primary/40 pl-4">
          {post.excerpt}
        </p>
        <div className="bg-dark-card rounded-xl p-8 glow-border text-center">
          <p className="font-body text-text-muted mb-4">Full article coming soon.</p>
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-deep text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-colors duration-200"
          >
            Get Your Free Audit →
          </Link>
        </div>
      </div>
    </div>
  )
}
