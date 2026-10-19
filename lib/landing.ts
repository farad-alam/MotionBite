import { cache } from 'react'
import { client } from '@/sanity/client'
import { fetchContent } from '@/lib/draft'
import type { SanityBlock, SanityAuthor } from '@/sanity/queries'
import { dict } from '@/lib/i18n'

export const LANDING_TAG = 'landingPages'

export const LANDING_SECTIONS = ['services', 'uae', 'saudi', 'partners', 'resources', 'research', 'ar'] as const
export type LandingSection = (typeof LANDING_SECTIONS)[number]

// Published documents only (Sanity default); no date filter. Tagged for webhook purge.
export async function getLandingSlugs(section: LandingSection): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(
    `*[_type == "landingPage" && !(_id in path("drafts.**")) && section == $section && defined(slug.current)]{ "slug": slug.current }`,
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

export async function getLandingSitemapEntries(revalidate: number | false = false): Promise<LandingSitemapEntry[]> {
  return client.fetch(
    `*[_type == "landingPage" && defined(slug.current) && defined(section) && coalesce(noindex, false) != true]
      | order(section asc, slug.current asc) {
        section,
        "slug": slug.current,
        "lastmod": coalesce(updatedAt, _updatedAt),
        language
      }`,
    {},
    { cache: 'force-cache', next: { tags: [LANDING_TAG], revalidate } }
  )
}

// URL path for a landing page. Arabic home uses reserved slug "home" -> /ar.
export function landingPath(section: LandingSection, slug: string): string {
  if (section === 'ar') return slug === 'home' ? '/ar' : `/ar/${slug}`
  return `/${section}/${slug}`
}

// ─────────────────────────────────────────────
// WP2: single page, section index
// ─────────────────────────────────────────────

export type LandingSchemaType = 'Service' | 'WebPage' | 'CollectionPage' | 'Report'

export type LandingRef = { title: string; section: LandingSection; slug: string }

export type LandingCaseStudy = {
  _id: string
  name: string
  slug: string
  industry?: string
  result?: string
  thumbnail?: { asset: { _ref: string }; alt?: string }
}

export type LandingPage = {
  _id: string
  title: string
  seoTitle?: string
  metaDescription: string
  section: LandingSection
  slug: string
  language: 'en' | 'ar'
  publishedAt: string
  updatedAt?: string
  heroSubtitle?: string
  body?: SanityBlock[]
  faqItems?: { question: string; answer: string }[]
  relatedLinks?: { label: string; href: string }[]
  mainImage?: { asset: { _ref: string }; alt?: string }
  schemaType?: LandingSchemaType
  areaServed?: string[]
  canonicalUrl?: string
  noindex?: boolean
  hreflang?: string
  parent?: (LandingRef & { parent?: LandingRef }) | null
  author?: SanityAuthor | null
  relatedCaseStudies?: LandingCaseStudy[]
}

const REF = `title, "section": section, "slug": slug.current`

// Published documents only: the client has no token, so drafts are never returned;
// the path() filter is a second guard. Wrapped in cache() so generateMetadata and
// the page share one request. A slug in the wrong section yields null (-> notFound).
export const getLandingPage = cache(
  async (section: LandingSection, slug: string): Promise<LandingPage | null> => {
    return fetchContent<LandingPage | null>(
      `*[_type == "landingPage" && !(_id in path("drafts.**")) && section == $section && slug.current == $slug][0] {
        _id,
        title,
        seoTitle,
        metaDescription,
        section,
        "slug": slug.current,
        language,
        publishedAt,
        updatedAt,
        heroSubtitle,
        body,
        faqItems,
        relatedLinks,
        mainImage { asset, alt },
        schemaType,
        areaServed,
        canonicalUrl,
        noindex,
        hreflang,
        "parent": parent->{ ${REF}, "parent": parent->{ ${REF} } },
        "author": author->{ firstName, lastName, slug, avatar { asset, alt }, jobTitle, shortBio, expertiseAreas, yearsExperience, linkedin, twitter, facebook, website },
        "relatedCaseStudies": relatedCaseStudies[]->{ _id, name, "slug": slug.current, industry, result, thumbnail { asset, alt } }[defined(slug)][0..2]
      }`,
      { section, slug },
      [LANDING_TAG]
    )
  }
)

// WP6.2: groups shown on the /services hub, in display order. Titles match the
// hubGroup dropdown in sanity/schemas/landingPage.ts.
export const SERVICES_HUB_GROUPS = [
  { value: 'industry', title: 'Industry' },
  { value: 'development', title: 'Development' },
  { value: 'seo-marketing', title: 'SEO & marketing' },
] as const

export type ServicesHubItem = { title: string; slug: string; metaDescription: string; hubGroup?: string | null }

// Every published services landing page, for the /services hub. Tagged so the
// webhook's landingPages purge adds or removes pages with no manual hub edits.
export async function getServicesHubPages(): Promise<ServicesHubItem[]> {
  return client.fetch(
    `*[_type == "landingPage" && !(_id in path("drafts.**")) && section == "services" && defined(slug.current)]
      | order(title asc) { title, "slug": slug.current, metaDescription, hubGroup }`,
    {},
    { cache: 'force-cache', next: { tags: [LANDING_TAG] } }
  )
}

export type LandingIndexItem = { title: string; slug: string; metaDescription: string }

export async function getLandingIndex(section: LandingSection): Promise<LandingIndexItem[]> {
  return client.fetch(
    `*[_type == "landingPage" && !(_id in path("drafts.**")) && section == $section && defined(slug.current)]
      | order(publishedAt desc) { title, "slug": slug.current, metaDescription }`,
    { section },
    { next: { tags: [LANDING_TAG] } }
  )
}

export type SiteCta = { label: string; href: string }

export const DEFAULT_CTA: SiteCta = { label: 'Get a free consultation', href: '/free-consultation' }

// Primary CTA from siteSettings with code fallback. Same tag as other settings reads.
export const getPrimaryCta = cache(async (): Promise<SiteCta> => {
  try {
    const row = await client.fetch<{ label?: string; href?: string } | null>(
      `*[_type == "siteSettings"][0]{ "label": primaryCtaLabel, "href": primaryCtaHref }`,
      {},
      { next: { tags: ['siteSettings'] } }
    )
    return { label: row?.label?.trim() || DEFAULT_CTA.label, href: row?.href?.trim() || DEFAULT_CTA.href }
  } catch {
    return DEFAULT_CTA
  }
})

export const DEFAULT_CTA_AR: SiteCta = { label: dict.ar.freeConsultation, href: '/free-consultation' }

// Arabic CTA and navigation from siteSettings (WP3 5.2). Links must be internal paths.
export type ArabicSiteSettings = {
  cta: SiteCta
  nav: { label: string; href: string }[]
  footer: { label: string; href: string }[]
}

function internalLinks(rows: { label?: string; href?: string }[] | null | undefined) {
  return (rows ?? [])
    .filter((r) => r?.label?.trim() && typeof r.href === 'string' && r.href.startsWith('/') && !r.href.startsWith('//'))
    .map((r) => ({ label: r.label!.trim(), href: r.href!.trim() }))
}

export const getArabicSiteSettings = cache(async (): Promise<ArabicSiteSettings> => {
  try {
    const row = await client.fetch<{
      label?: string
      href?: string
      nav?: { label?: string; href?: string }[]
      footer?: { label?: string; href?: string }[]
    } | null>(
      `*[_type == "siteSettings"][0]{ "label": primaryCtaLabelAr, "href": primaryCtaHrefAr, "nav": navAr[]{ label, href }, "footer": footerAr[]{ label, href } }`,
      {},
      { next: { tags: ['siteSettings'] } }
    )
    return {
      cta: { label: row?.label?.trim() || DEFAULT_CTA_AR.label, href: row?.href?.trim() || DEFAULT_CTA_AR.href },
      nav: internalLinks(row?.nav),
      footer: internalLinks(row?.footer),
    }
  } catch {
    return { cta: DEFAULT_CTA_AR, nav: [], footer: [] }
  }
})

// True once the Arabic home page (section "ar", reserved slug "home") is published.
// Tagged landingPages so publishing or unpublishing it refreshes the English navbar.
export const hasArabicHome = cache(async (): Promise<boolean> => {
  try {
    return await client.fetch<boolean>(
      `defined(*[_type == "landingPage" && !(_id in path("drafts.**")) && section == "ar" && slug.current == "home"][0]._id)`,
      {},
      { next: { tags: [LANDING_TAG] } }
    )
  } catch {
    return false
  }
})

export const SECTION_META: Record<Exclude<LandingSection, 'services' | 'ar'>, { title: string; intro: string; description: string }> = {
  uae: {
    title: 'Web Design in the UAE',
    intro: 'Websites for businesses in Dubai, Abu Dhabi and across the United Arab Emirates.',
    description: 'MotionBite web design and development pages for businesses in the United Arab Emirates.',
  },
  saudi: {
    title: 'Web Design in Saudi Arabia',
    intro: 'Websites for businesses in Riyadh, Jeddah and across Saudi Arabia.',
    description: 'MotionBite web design and development pages for businesses in Saudi Arabia.',
  },
  partners: {
    title: 'Partner With MotionBite',
    intro: 'How agencies and freelancers can work with MotionBite.',
    description: 'Partnership options for agencies and freelancers who want to work with MotionBite.',
  },
  resources: {
    title: 'Resources',
    intro: 'Guides and tools for business owners planning a website.',
    description: 'Practical MotionBite guides and resources for business owners planning a website.',
  },
  research: {
    title: 'Research',
    intro: 'Original MotionBite research on business websites.',
    description: 'Original research and reports from MotionBite on business websites.',
  },
}
