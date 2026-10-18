/**
 * Import content-plan rows as DRAFT Sanity documents (nothing goes live until an editor presses Publish).
 *
 * Usage:
 *   npx tsx scripts/import-content.ts [--dry-run] <file.json | directory> [...]
 *
 * One JSON file per plan row. Fields:
 *   planId (e.g. "R002"), type ("landingPage" | "post"), section, language, title, slug,
 *   metaDescription (landingPage) or excerpt (post), publishedAt, parentSlug, bodyMarkdown,
 *   faqItems [{question, answer}], relatedLinks [{label, href}], relatedCaseStudySlugs [],
 *   optional: heroSubtitle, seoTitle, hubGroup, schemaType, areaServed [], hreflang,
 *             translationOfSlug, categorySlug, authorSlug.
 *
 * Document id is `drafts.import-<planId>`, so a second run updates instead of duplicating.
 * Environment (read from the environment only, never logged):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */

import { createClient, type SanityClient } from '@sanity/client'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { randomBytes } from 'node:crypto'

// ─── Types ────────────────────────────────────────────────────────────────

export type PlanRow = {
  planId: string
  type: 'landingPage' | 'post'
  section?: string
  language?: 'en' | 'ar'
  title: string
  slug: string
  metaDescription?: string
  excerpt?: string
  publishedAt: string
  parentSlug?: string
  bodyMarkdown?: string
  faqItems?: { question: string; answer: string }[]
  relatedLinks?: { label: string; href: string }[]
  relatedCaseStudySlugs?: string[]
  heroSubtitle?: string
  seoTitle?: string
  hubGroup?: string
  schemaType?: string
  areaServed?: string[]
  hreflang?: string
  translationOfSlug?: string
  categorySlug?: string
  authorSlug?: string
}

type Span = { _type: 'span'; _key: string; text: string; marks: string[] }
type MarkDef = { _type: 'link'; _key: string; href: string; blank: boolean }

const SECTIONS = ['services', 'uae', 'saudi', 'partners', 'resources', 'research', 'ar']

const key = () => randomBytes(6).toString('hex')

// ─── Markdown → Portable Text ─────────────────────────────────────────────

/** Inline: **bold**, *italic* / _italic_, [text](url). */
function inline(text: string): { children: Span[]; markDefs: MarkDef[] } {
  const children: Span[] = []
  const markDefs: MarkDef[] = []
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|(?<![*\w])\*([^*]+)\*(?!\*)|(?<![\w])_([^_]+)_(?!\w)/g
  let last = 0
  const push = (t: string, marks: string[] = []) => {
    if (t) children.push({ _type: 'span', _key: key(), text: t, marks })
  }
  for (const m of text.matchAll(pattern)) {
    push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      const def: MarkDef = {
        _type: 'link',
        _key: key(),
        href: m[2],
        blank: /^https?:\/\//.test(m[2]),
      }
      markDefs.push(def)
      push(m[1], [def._key])
    } else if (m[3] !== undefined) push(m[3], ['strong'])
    else push(m[4] ?? m[5], ['em'])
    last = (m.index ?? 0) + m[0].length
  }
  push(text.slice(last))
  if (children.length === 0) push('')
  return { children, markDefs }
}

function textBlock(text: string, style: string, extra: Record<string, unknown> = {}) {
  const { children, markDefs } = inline(text)
  return { _type: 'block', _key: key(), style, children, markDefs, ...extra }
}

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim())

const isTableSep = (line: string) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line)

export function markdownToPortableText(md: string): object[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const blocks: object[] = []
  let para: string[] = []
  let quote: string[] = []

  const flushPara = () => {
    if (para.length) blocks.push(textBlock(para.join(' '), 'normal'))
    para = []
  }
  const flushQuote = () => {
    if (quote.length) blocks.push(textBlock(quote.join(' '), 'blockquote'))
    quote = []
  }
  const flushAll = () => {
    flushPara()
    flushQuote()
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) {
      flushAll()
      continue
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(line)
    if (heading) {
      flushAll()
      // H1 is the page title; body headings start at H2.
      const level = Math.min(Math.max(heading[1].length, 2), 4)
      blocks.push(textBlock(heading[2].trim(), `h${level}`))
      continue
    }
    if (line.includes('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      flushAll()
      const rows = [splitRow(line)]
      i += 2
      while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
        rows.push(splitRow(lines[i]))
        i++
      }
      i--
      blocks.push({
        _type: 'table',
        _key: key(),
        hasHeader: true,
        rows: rows.map((cells) => ({ _type: 'tableRow', _key: key(), cells })),
      })
      continue
    }
    const bullet = /^\s*[-*+]\s+(.*)$/.exec(line)
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line)
    if (bullet || numbered) {
      flushAll()
      blocks.push(
        textBlock((bullet ?? numbered)![1], 'normal', {
          listItem: bullet ? 'bullet' : 'number',
          level: 1,
        })
      )
      continue
    }
    const bq = /^>\s?(.*)$/.exec(line)
    if (bq) {
      flushPara()
      quote.push(bq[1])
      continue
    }
    flushQuote()
    para.push(line.trim())
  }
  flushAll()
  return blocks
}

// ─── Document building ────────────────────────────────────────────────────

export function validateRow(row: PlanRow): string[] {
  const errs: string[] = []
  if (!row.planId) errs.push('planId is required')
  if (row.type !== 'landingPage' && row.type !== 'post') errs.push('type must be "landingPage" or "post"')
  if (!row.title) errs.push('title is required')
  if (!row.slug) errs.push('slug is required')
  if (!row.publishedAt || Number.isNaN(Date.parse(row.publishedAt))) errs.push('publishedAt must be a valid date')
  if (row.type === 'landingPage') {
    if (!row.section || !SECTIONS.includes(row.section)) errs.push(`section must be one of ${SECTIONS.join(', ')}`)
    if (row.title && row.title.length > 90) errs.push('title is longer than 90 characters')
    if (!row.metaDescription) errs.push('metaDescription is required')
    if (row.metaDescription && row.metaDescription.length > 160) errs.push('metaDescription is longer than 160 characters')
    if (row.section === 'ar' && row.slug === 'blog') errs.push('slug "blog" is reserved in section ar')
    const expected = row.section === 'ar' ? 'ar' : 'en'
    if (row.language && row.language !== expected) errs.push(`language must be "${expected}" for section ${row.section}`)
    if (row.relatedLinks?.some((l) => !l.href?.startsWith('/'))) errs.push('relatedLinks href must start with /')
    if ((row.relatedCaseStudySlugs?.length ?? 0) > 3) errs.push('at most 3 relatedCaseStudySlugs')
    if ((row.relatedLinks?.length ?? 0) > 8) errs.push('at most 8 relatedLinks')
  } else if (row.type === 'post') {
    if (!row.excerpt) errs.push('excerpt is required for posts')
    if (row.excerpt && row.excerpt.length > 160) errs.push('excerpt is longer than 160 characters')
    if (row.title && row.title.length > 70) errs.push('title is longer than 70 characters')
  }
  return errs
}

type Resolver = (type: string, slug: string | undefined) => Promise<{ _type: 'reference'; _ref: string; _key?: string } | undefined>

export async function buildDocument(row: PlanRow, resolveRef: Resolver) {
  const language = row.language ?? (row.type === 'landingPage' && row.section === 'ar' ? 'ar' : 'en')
  const base = {
    _id: `drafts.import-${row.planId}`,
    _type: row.type,
    title: row.title,
    slug: { _type: 'slug', current: row.slug },
    publishedAt: new Date(row.publishedAt).toISOString(),
    language,
    ...(row.bodyMarkdown ? { body: markdownToPortableText(row.bodyMarkdown) } : {}),
    ...(row.faqItems?.length
      ? { faqItems: row.faqItems.map((f) => ({ _type: 'object', _key: key(), ...f })) }
      : {}),
  }
  const translationOf = await resolveRef(row.type, row.translationOfSlug)

  if (row.type === 'post') {
    const category = await resolveRef('category', row.categorySlug)
    const author = await resolveRef('author', row.authorSlug)
    return {
      ...base,
      excerpt: row.excerpt,
      ...(category ? { category } : {}),
      ...(author ? { author } : {}),
      ...(language === 'ar' ? { hreflang: row.hreflang ?? 'ar' } : {}),
      ...(translationOf ? { translationOf } : {}),
    }
  }

  const parent = await resolveRef('landingPage', row.parentSlug)
  const caseStudies = []
  for (const slug of row.relatedCaseStudySlugs ?? []) {
    const ref = await resolveRef('portfolioProject', slug)
    if (ref) caseStudies.push({ ...ref, _key: key() })
  }
  return {
    ...base,
    section: row.section,
    metaDescription: row.metaDescription,
    schemaType: row.schemaType ?? 'WebPage',
    noindex: false,
    ...(row.seoTitle ? { seoTitle: row.seoTitle } : {}),
    ...(row.heroSubtitle ? { heroSubtitle: row.heroSubtitle } : {}),
    ...(row.hubGroup ? { hubGroup: row.hubGroup } : {}),
    ...(row.areaServed?.length ? { areaServed: row.areaServed } : {}),
    ...(parent ? { parent } : {}),
    ...(caseStudies.length ? { relatedCaseStudies: caseStudies } : {}),
    ...(row.relatedLinks?.length
      ? { relatedLinks: row.relatedLinks.map((l) => ({ _type: 'object', _key: key(), ...l })) }
      : {}),
    ...(language === 'ar' ? { hreflang: row.hreflang ?? 'ar' } : {}),
    ...(translationOf ? { translationOf } : {}),
  }
}

// ─── CLI ──────────────────────────────────────────────────────────────────

function collectFiles(inputs: string[]): string[] {
  const files: string[] = []
  for (const input of inputs) {
    const p = resolve(input)
    if (statSync(p).isDirectory()) {
      for (const f of readdirSync(p).sort()) if (f.endsWith('.json')) files.push(join(p, f))
    } else files.push(p)
  }
  return files
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const inputs = args.filter((a) => !a.startsWith('--'))
  if (inputs.length === 0) {
    console.error('Usage: npx tsx scripts/import-content.ts [--dry-run] <file.json | directory> [...]')
    process.exit(1)
  }

  const required = ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_DATASET', 'SANITY_API_TOKEN']
  const missing = required.filter((n) => !process.env[n])
  if (missing.length && !dryRun) {
    console.error(`Missing environment variable(s): ${missing.join(', ')}. Set them in the environment and try again.`)
    process.exit(1)
  }

  let client: SanityClient | undefined
  if (!missing.length) {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: '2024-08-01',
      token: process.env.SANITY_API_TOKEN!,
      useCdn: false,
    })
  } else {
    console.log(`(dry run without Sanity credentials: references are shown unresolved)\n`)
  }

  const resolveRef: Resolver = async (type, slug) => {
    if (!slug) return undefined
    if (!client) return { _type: 'reference', _ref: `<unresolved ${type}:${slug}>` }
    const hits = await client.fetch<{ _id: string }[]>(
      `*[_type == $type && slug.current == $slug]{ _id }`,
      { type, slug }
    )
    if (hits.length === 0) {
      console.warn(`  ! no ${type} found with slug "${slug}", reference skipped`)
      return undefined
    }
    return { _type: 'reference', _ref: hits[0]._id.replace(/^drafts\./, '') }
  }

  let failed = 0
  for (const file of collectFiles(inputs)) {
    let row: PlanRow
    try {
      row = JSON.parse(readFileSync(file, 'utf8')) as PlanRow
    } catch {
      console.error(`✗ ${file}: not valid JSON`)
      failed++
      continue
    }
    const errs = validateRow(row)
    if (errs.length) {
      console.error(`✗ ${row.planId ?? file}: ${errs.join('; ')}`)
      failed++
      continue
    }
    const doc = await buildDocument(row, resolveRef)
    if (dryRun) {
      console.log(`--- ${row.planId} (${row.type}) → ${doc._id}`)
      console.log(JSON.stringify(doc, null, 2))
    } else {
      await client!.createOrReplace(doc as { _id: string; _type: string })
      console.log(`✓ ${row.planId}: draft ${doc._id} written (${row.type} /${row.slug})`)
    }
  }
  if (failed) {
    console.error(`\n${failed} row(s) failed.`)
    process.exit(1)
  }
}

if (process.argv[1] && /import-content\.ts$/.test(process.argv[1])) {
  main().catch((err) => {
    console.error('Import failed:', err instanceof Error ? err.message : 'unknown error')
    process.exit(1)
  })
}
