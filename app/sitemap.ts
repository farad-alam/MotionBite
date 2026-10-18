import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { getLandingSitemapEntries, landingPath } from '@/lib/landing'

const BASE = 'https://www.motionbite.com'

// Static pages — priority-weighted
const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE, lastModified: new Date('2026-10-18T00:00:00Z'), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE}/services`, lastModified: new Date('2026-09-07T00:00:00Z'), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/pricing`, lastModified: new Date('2026-09-07T00:00:00Z'), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/portfolio`, lastModified: new Date('2026-09-07T00:00:00Z'), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/blog`, lastModified: new Date('2026-09-07T00:00:00Z'), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/about`, lastModified: new Date('2026-09-07T00:00:00Z'), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/contact`, lastModified: new Date('2026-09-07T00:00:00Z'), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/free-consultation`, lastModified: new Date('2026-09-07T00:00:00Z'), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/start-project`, lastModified: new Date('2026-09-07T00:00:00Z'), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/privacy`, lastModified: new Date('2026-06-10T00:00:00Z'), changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE}/terms`, lastModified: new Date('2026-06-10T00:00:00Z'), changeFrequency: 'yearly', priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch blog posts from Sanity
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch<{ slug: string; updatedAt?: string; publishedAt: string }[]>(
      `*[_type == "post" && coalesce(language, "en") == "en"] | order(publishedAt desc) {
        "slug": slug.current,
        publishedAt,
        updatedAt
      }`,
      {},
      { next: { tags: ['posts'] } }
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

  // Fetch portfolio projects from Sanity
  let portfolioRoutes: MetadataRoute.Sitemap = []
  try {
    const items = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "portfolioProject" && status == "published"] | order(order asc) {
        "slug": slug.current,
        _updatedAt
      }`,
      {},
      { next: { tags: ['portfolio'] } }
    )
    portfolioRoutes = items.map((item) => ({
      url: `${BASE}/portfolio/${item.slug}`,
      lastModified: new Date(item._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch portfolio projects from Sanity', e)
  }

  // Landing pages (published only; the webhook purges the 'landingPages' tag)
  let landingRoutes: MetadataRoute.Sitemap = []
  try {
    const pages = await getLandingSitemapEntries()
    landingRoutes = pages.map((p) => ({
      url: `${BASE}${landingPath(p.section, p.slug)}`,
      lastModified: new Date(p.lastmod),
      changeFrequency: 'monthly' as const,
      priority: p.section === 'services' ? 0.8 : 0.7,
    }))

    // Section index URLs only when the section has at least one published page.
    // These routes arrive with WP2; until then no landing pages exist, so none is listed.
    const indexSections = ['services', 'uae', 'saudi', 'partners', 'resources', 'research'] as const
    for (const section of indexSections) {
      if (section === 'services') continue // /services is already a static route
      const inSection = pages.filter((p) => p.section === section)
      if (inSection.length === 0) continue
      const newest = inSection.map((p) => p.lastmod).sort().at(-1)!
      landingRoutes.push({
        url: `${BASE}/${section}`,
        lastModified: new Date(newest),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  } catch (e) {
    console.error('Sitemap: failed to fetch landing pages from Sanity', e)
  }

  return [...staticRoutes, ...blogRoutes, ...landingRoutes, ...portfolioRoutes]
}
