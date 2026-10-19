// One heading-anchor slugify for the whole site (WP3 5.5).
// Replaces the two copies that kept only a-z0-9 and so gave every Arabic
// heading an empty id. English output is unchanged for plain ASCII headings;
// repeated headings now get -2, -3 suffixes via headingIds().

const ARABIC_MARKS = /[\u064B-\u065F\u0640]/g // harakat (diacritics) and tatweel
const NOT_ALLOWED = /[^\p{L}\p{N}\s-]/gu

export function slugify(text: unknown): string {
  if (text == null) return ''
  const str = Array.isArray(text)
    ? text.map((t) => (typeof t === 'string' ? t : (t as { text?: string } | null)?.text ?? '')).join('')
    : String(text)
  return str
    .normalize('NFKC')
    .toLowerCase()
    .replace(ARABIC_MARKS, '')
    .replace(NOT_ALLOWED, '')
    .trim()
    .replace(/\s+/g, '-')
}

type HeadingBlock = { _type?: string; _key?: string; style?: unknown; children?: unknown }

export const ANCHOR_STYLES = ['h2', 'h3'] as const

export function headingText(block: HeadingBlock): string {
  const children = (block.children as { text?: string }[] | undefined) ?? []
  return children.map((c) => c?.text ?? '').join('')
}

/**
 * Unique anchor id per h2/h3 block, keyed by block _key (falls back to index).
 * The first occurrence keeps the plain slug; repeats get -2, -3, ...
 * Used by both the Portable Text renderer and the table of contents so they agree.
 */
export function headingIds(blocks: HeadingBlock[] | undefined | null): Map<string, string> {
  const ids = new Map<string, string>()
  const used = new Set<string>()
  ;(blocks ?? []).forEach((b, i) => {
    if (b?._type !== 'block' || !ANCHOR_STYLES.includes(b.style as 'h2' | 'h3')) return
    const base = slugify(headingText(b)) || 'section'
    let id = base
    let n = 1
    while (used.has(id)) {
      n += 1
      id = `${base}-${n}`
    }
    used.add(id)
    ids.set(b._key ?? String(i), id)
  })
  return ids
}

export function headingKey(block: { _key?: string }, index: number): string {
  return block._key ?? String(index)
}
