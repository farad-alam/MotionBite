import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'

const BASE = 'https://www.motionbite.com'

// Static pages — priority-weighted
const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/free-consultation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/start-project`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch blog posts from Sanity
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch<{ slug: string; updatedAt?: string; publishedAt: string }[]>(
      `*[_type == "post"] | order(publishedAt desc) {
        "slug": slug.current,
        publishedAt,
        updatedAt
      }`,
      {},
      { next: { revalidate: 3600 } }
    )
    blogRoutes = posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch blog posts from Sanity', e)
  }

  // Fetch portfolio items from Sanity
  let portfolioRoutes: MetadataRoute.Sitemap = []
  try {
    const items = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "portfolioItem"] | order(_createdAt desc) {
        "slug": slug.current,
        _updatedAt
      }`,
      {},
      { next: { revalidate: 3600 } }
    )
    portfolioRoutes = items.map((item) => ({
      url: `${BASE}/portfolio/${item.slug}`,
      lastModified: new Date(item._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch portfolio items from Sanity', e)
  }

  return [...staticRoutes, ...blogRoutes, ...portfolioRoutes]
}
