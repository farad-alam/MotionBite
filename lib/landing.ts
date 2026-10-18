import { client } from '@/sanity/client'

export const LANDING_TAG = 'landingPages'

export const LANDING_SECTIONS = ['services', 'uae', 'saudi', 'partners', 'resources', 'research', 'ar'] as const
export type LandingSection = (typeof LANDING_SECTIONS)[number]

// Minimal version (WP4). WP2 extends this file with getLandingPage / getLandingIndex.
// Published documents only (Sanity default); no date filter. Tagged for webhook purge.
export async function getLandingSlugs(section: LandingSection): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(
    `*[_type == "landingPage" && section == $section && defined(slug.current)]{ "slug": slug.current }`,
    { section },
    { next: { tags: [LANDING_TAG] } }
  )
  return rows.map((r) => r.slug)
}

export type LandingSitemapEntry = {
  section: LandingSection
  slug: string
  lastmod: string
  noindex?: boolean
  language?: string
}

export async function getLandingSitemapEntries(): Promise<LandingSitemapEntry[]> {
  return client.fetch(
    `*[_type == "landingPage" && defined(slug.current) && defined(section) && coalesce(noindex, false) != true]
      | order(section asc, slug.current asc) {
        section,
        "slug": slug.current,
        "lastmod": coalesce(updatedAt, _updatedAt),
        language
      }`,
    {},
    { next: { tags: [LANDING_TAG] } }
  )
}

// URL path for a landing page. Arabic home uses reserved slug "home" -> /ar.
export function landingPath(section: LandingSection, slug: string): string {
  if (section === 'ar') return slug === 'home' ? '/ar' : `/ar/${slug}`
  return `/${section}/${slug}`
}
