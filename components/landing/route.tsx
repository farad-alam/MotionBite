import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import LandingPageView from '@/components/landing/LandingPageView'
import { isDraftMode } from '@/lib/draft'
import { urlFor } from '@/sanity/image'
import { getSiteSettings } from '@/sanity/queries'
import {
  SECTION_META,
  getLandingIndex,
  getLandingPage,
  getPrimaryCta,
  getArabicSiteSettings,
  landingPath,
  type LandingSection,
} from '@/lib/landing'
import { arabicOgLocale, getTwin, languagesFor } from '@/lib/hreflang'

const BASE = 'https://www.motionbite.com'
const DEFAULT_OG = `${BASE}/opengraph-image.png`

export async function landingMetadata(section: LandingSection, slug: string): Promise<Metadata> {
  const page = await getLandingPage(section, slug)
  if (!page) return {}
  const path = landingPath(section, page.slug)
  const url = path === '/' ? BASE : `${BASE}${path}`
  const title = page.seoTitle || page.title
  const isArabic = page.language === 'ar'
  // Reciprocal hreflang (WP2 4.4 / WP3 5.4): only when both sides are live.
  const twin = await getTwin(path, isArabic ? 'ar' : 'en')

  let ogImage: string | undefined = page.mainImage?.asset
    ? urlFor(page.mainImage).width(1200).height(630).format('webp').url()
    : undefined
  if (!ogImage) {
    const settings = await getSiteSettings()
    ogImage = settings?.seoImage?.asset
      ? urlFor(settings.seoImage).width(1200).height(630).format('webp').url()
      : DEFAULT_OG
  }

  return {
    title,
    description: page.metaDescription,
    alternates: {
      canonical: page.canonicalUrl ?? url,
      ...(twin ? { languages: languagesFor(twin) } : {}),
    },
    ...(page.noindex || (await isDraftMode()) ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: 'website',
      title,
      description: page.metaDescription,
      url,
      ...(isArabic ? { locale: arabicOgLocale(page.hreflang), alternateLocale: ['en_US'] } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.title }],
    },
    twitter: { card: 'summary_large_image', title, description: page.metaDescription, images: [ogImage] },
  }
}

export async function LandingRoute({ section, slug }: { section: LandingSection; slug: string }) {
  const page = await getLandingPage(section, slug)
  if (!page) notFound()
  const isArabic = page.language === 'ar'
  const cta = isArabic ? (await getArabicSiteSettings()).cta : await getPrimaryCta()
  const path = landingPath(section, page.slug)
  const pair = await getTwin(path, isArabic ? 'ar' : 'en')
  const twin = pair
    ? isArabic
      ? { href: pair.enPath, hrefLang: 'en' }
      : { href: pair.arPath, hrefLang: pair.hreflang }
    : null
  return <LandingPageView page={page} cta={cta} twin={twin} />
}

type IndexSection = keyof typeof SECTION_META

export function sectionIndexMetadata(section: IndexSection): Metadata {
  const m = SECTION_META[section]
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `${BASE}/${section}` },
    openGraph: { type: 'website', title: m.title, description: m.description, url: `${BASE}/${section}`, images: [DEFAULT_OG] },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [DEFAULT_OG] },
  }
}

export async function SectionIndex({ section }: { section: IndexSection }) {
  const items = await getLandingIndex(section)
  if (items.length === 0) notFound()
  const m = SECTION_META[section]
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">{m.title}</h1>
        <p className="font-body text-text-muted text-lg mb-10">{m.intro}</p>
        <ul className="space-y-4">
          {items.map((p) => (
            <li key={p.slug}>
              <Link
                href={landingPath(section, p.slug)}
                className="block bg-dark-card rounded-xl p-5 glow-border hover:border-purple-primary/30 transition-all duration-200"
              >
                <p className="font-heading font-semibold text-text-primary mb-1">{p.title}</p>
                <p className="font-body text-text-muted text-sm">{p.metaDescription}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
