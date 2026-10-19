import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { getLandingSitemapEntries, landingPath } from '@/lib/landing'
import { getTwinTable, languagesFor } from '@/lib/hreflang'
import { AUDIT_COPY_IS_PLACEHOLDER } from '@/data/audit'

const BASE = 'https://www.motionbite.com'

// Render per request so newly published Sanity content shows up without a redeploy.
// The Sanity queries below stay in the Data Cache (force-cache), tagged so the
// webhook's revalidateTag purges them, with an hourly fallback so the sitemap can
// never stay stale for long even if a webhook call is missed.
export const dynamic = 'force-dynamic'
const SITEMAP_REVALIDATE = 3600

// Static pages — priority-weighted
const staticRoutes: MetadataRoute.Sitemap = [
  // WP5.2: listed once data/audit.ts holds the final R026 copy (noindex until then).
  ...(AUDIT_COPY_IS_PLACEHOLDER
    ? []
    : [{ url: `${BASE}/free-website-audit`, lastModified: new Date('2026-12-02T00:00:00Z'), changeFrequency: 'monthly' as const, priority: 0.8 }]),
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
      { cache: 'force-cache', next: { tags: ['posts'], revalidate: SITEMAP_REVALIDATE } }
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
      { cache: 'force-cache', next: { tags: ['portfolio'], revalidate: SITEMAP_REVALIDATE } }
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
    const pages = await getLandingSitemapEntries(SITEMAP_REVALIDATE)
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

  // Arabic blog (WP3 5.5): /ar/blog only once at least one Arabic post is published.
  let arabicBlogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch<{ slug: string; updatedAt?: string; publishedAt: string }[]>(
      `*[_type == "post" && language == "ar" && defined(slug.current)] | order(publishedAt desc) {
        "slug": slug.current,
        publishedAt,
        updatedAt
      }`,
      {},
      { cache: 'force-cache', next: { tags: ['posts'], revalidate: SITEMAP_REVALIDATE } }
    )
    arabicBlogRoutes = posts.map((post) => ({
      url: `${BASE}/ar/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
    if (posts.length > 0) {
      arabicBlogRoutes.unshift({
        url: `${BASE}/ar/blog`,
        lastModified: new Date(posts[0].updatedAt ?? posts[0].publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  } catch (e) {
    console.error('Sitemap: failed to fetch Arabic posts from Sanity', e)
  }

  const all = [...staticRoutes, ...blogRoutes, ...landingRoutes, ...arabicBlogRoutes, ...portfolioRoutes]

  // hreflang alternates (WP4 6.5 / WP3 5.4): only on entries whose twin is live,
  // with the same reciprocal pair table the pages use, including the self-reference.
  try {
    const { byPath } = await getTwinTable()
    if (byPath.size > 0) {
      return all.map((entry) => {
        const path = entry.url === BASE ? '/' : entry.url.slice(BASE.length)
        const pair = byPath.get(path)
        return pair ? { ...entry, alternates: { languages: languagesFor(pair) } } : entry
      })
    }
  } catch (e) {
    console.error('Sitemap: failed to resolve hreflang pairs', e)
  }
  return all
}
