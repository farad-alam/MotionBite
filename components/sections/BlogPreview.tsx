'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogPosts } from '@/data/blog-posts'

export default function BlogPreview() {
  return (
    <section className="bg-dark-card section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary">
            Web Tips for{' '}
            <span className="text-green-primary">Small Business Owners</span>
          </h2>
          <Link href="/blog" className="text-green-primary hover:text-green-deep font-heading font-semibold text-sm transition-colors shrink-0">
            Read All Articles →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block bg-dark-base rounded-xl overflow-hidden glow-border hover:glow-shadow transition-all duration-300">
                {/* Image placeholder */}
                <div className="relative h-44 bg-dark-base overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-primary/10 to-dark-card" />
                  <div className="absolute inset-0 group-hover:bg-green-primary/5 transition-all duration-300" />
                  <span className="absolute top-4 left-4 bg-dark-base/80 text-green-primary text-xs font-body px-2.5 py-1 rounded-full border border-green-primary/20">
                    {post.tag}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-text-muted text-xs font-body mb-3">
                    <span>{post.readTime}</span>
                    <span>·</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-green-primary transition-colors duration-200 leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-body text-text-muted text-sm mt-2 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
