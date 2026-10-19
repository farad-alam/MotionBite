import { cache } from 'react'
import { client } from '@/sanity/client'
import { LANDING_TAG, landingPath, type LandingSection } from '@/lib/landing'
import type { Locale } from '@/lib/i18n'

// WP3 5.4: reciprocal hreflang between an English page and its Arabic twin.
//
// The link lives on the Arabic document (translationOf -> English doc, or
// translationOfPath for the hard-coded pages "/" and "/pricing"). Every
// lookup, for either side, goes through the same published-only pair table,
// so the English page and the Arabic page always agree:
//  - both sides must be published (drafts are invisible to this token-less client),
//  - neither side may be noindex,
//  - if two Arabic documents claim the same English page, the first created wins,
//    and the second gets no alternates at all (never a one-way hreflang).

const BASE = 'https://www.motionbite.com'

// Hard-coded English pages that can be an Arabic page's twin via translationOfPath.
const HARD_CODED_PATHS = new Set(['/', '/pricing', '/services', '/portfolio', '/about', '/blog', '/contact'])

const HREFLANG_VALUES = new Set(['ar', 'ar-SA', 'ar-AE'])

export type TwinPair = {
  enPath: string
  arPath: string
  /** hreflang of the Arabic side: ar, ar-SA or ar-AE */
  hreflang: string
}

type Row = {
  _id: string
  _type: 'landingPage' | 'post'
  slug: string
  hreflang?: string | null
  translationOfPath?: string | null
  en?: {
    _type: 'landingPage' | 'post'
    section?: LandingSection | null
    slug?: string | null
    language: string
    noindex?: boolean | null
  } | null
}

const PAIRS_QUERY = `*[
  _type in ["landingPage", "post"]
  && language == "ar"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
  && coalesce(noindex, false) != true
  && (_type == "post" || section == "ar")
] | order(_createdAt asc) {
  _id,
  _type,
  "slug": slug.current,
  hreflang,
  translationOfPath,
  "en": translationOf->{
    _type,
    section,
    "slug": slug.current,
    "language": coalesce(language, "en"),
    noindex
  }
}`

function englishPathOf(row: Row): string | null {
  const en = row.en
  if (en) {
    if (en.language !== 'en' || en.noindex || !en.slug) return null
    if (en._type === 'post') return row._type === 'post' ? `/blog/${en.slug}` : null
    if (en._type === 'landingPage' && en.section && en.section !== 'ar') return landingPath(en.section, en.slug)
    return null
  }
  const p = row.translationOfPath?.trim()
  if (!p) return null
  const normalised = p.length > 1 ? p.replace(/\/+$/, '') : p
  return HARD_CODED_PATHS.has(normalised) ? normalised : null
}

function arabicPathOf(row: Row): string {
  return row._type === 'post' ? `/ar/blog/${row.slug}` : landingPath('ar', row.slug)
}

export type TwinTable = { byPath: Map<string, TwinPair>; pairs: TwinPair[] }

/** All live English/Arabic pairs. One cached request, purged by the webhook. */
export const getTwinTable = cache(async (): Promise<TwinTable> => {
  const byPath = new Map<string, TwinPair>()
  const pairs: TwinPair[] = []
  let rows: Row[] = []
  try {
    rows = await client.fetch<Row[]>(PAIRS_QUERY, {}, { cache: 'force-cache', next: { tags: [LANDING_TAG, 'posts'] } })
  } catch (e) {
    console.error('hreflang: failed to load translation pairs', e)
    return { byPath, pairs }
  }
  for (const row of rows) {
    const enPath = englishPathOf(row)
    if (!enPath) continue
    const arPath = arabicPathOf(row)
    if (byPath.has(enPath) || byPath.has(arPath)) continue // first created wins; keeps it reciprocal
    const hreflang = row.hreflang && HREFLANG_VALUES.has(row.hreflang) ? row.hreflang : 'ar'
    const pair = { enPath, arPath, hreflang }
    byPath.set(enPath, pair)
    byPath.set(arPath, pair)
    pairs.push(pair)
  }
  return { byPath, pairs }
})

export function absoluteUrl(path: string): string {
  return path === '/' ? BASE : `${BASE}${path}`
}

export function languagesFor(pair: TwinPair): Record<string, string> {
  return {
    en: absoluteUrl(pair.enPath),
    [pair.hreflang]: absoluteUrl(pair.arPath),
    'x-default': absoluteUrl(pair.enPath),
  }
}

/** The live twin of a page, or null. `path` is the page's own URL path. */
export async function getTwin(path: string, language: Locale): Promise<TwinPair | null> {
  const pair = (await getTwinTable()).byPath.get(path)
  if (!pair) return null
  // The path must be on the side that matches the page's language.
  if (language === 'en' ? pair.enPath !== path : pair.arPath !== path) return null
  return pair
}

/**
 * Next.js `alternates.languages` for a page: en, the Arabic hreflang and
 * x-default, all absolute, including the self-reference. Undefined unless
 * both sides are live.
 */
export async function getAlternates(path: string, language: Locale): Promise<Record<string, string> | undefined> {
  const pair = await getTwin(path, language)
  return pair ? languagesFor(pair) : undefined
}

/** Open Graph locale for an Arabic page from its hreflang value. */
export function arabicOgLocale(hreflang?: string | null): string {
  return hreflang === 'ar-AE' ? 'ar_AE' : 'ar_SA'
}
