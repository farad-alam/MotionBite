'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogPosts } from '@/data/blog-posts'

export default function BlogPreview() {
  return (
    <section className="bg-[#FAFAFA] py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-primary" />
              <span className="text-text-charcoal uppercase tracking-widest text-sm font-semibold font-body">Insights & Ideas</span>
            </div>
            <h2 className="font-heading font-black text-5xl md:text-7xl text-dark-base leading-[1.1]">
              Latest from <br/>
              <span className="font-serif italic text-purple-primary">the journal.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border border-dark-border/20 text-dark-base hover:border-purple-primary hover:text-purple-primary font-body font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
            >
              Read All Articles
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                {/* Image */}
                <div className="relative h-72 rounded-3xl overflow-hidden mb-6 bg-light-border/20">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      // Fallback if local image doesn't exist
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
                    }}
                  />
                  {/* Tag */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-white/90 backdrop-blur-sm text-dark-base text-xs font-body font-semibold px-4 py-2 rounded-full shadow-sm">
                      {post.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 text-text-charcoal/60 text-sm font-body mb-4 font-medium">
                    <span>{post.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-light-border" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-dark-base group-hover:text-purple-primary transition-colors duration-300 leading-snug mb-3">
                    {post.title}
                  </h3>
                  <p className="font-body text-text-charcoal/70 text-base leading-relaxed line-clamp-2">
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
