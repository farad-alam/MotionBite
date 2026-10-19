/**
 * WP3 5.5 check: the shared lib/slugify.ts must give the same anchor as the old
 * a-z0-9 slugify for every English heading in the repo's post data, and give
 * Arabic headings non-empty, unique anchors.
 *
 *   npx tsx scripts/test-slugify.ts
 */
import * as fs from 'fs'
import * as path from 'path'
import { slugify, headingIds } from '../lib/slugify'

function oldSlugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

const sources = ['data/blog-posts.ts', 'scripts/migrate-posts.ts']
const headings: string[] = []
for (const rel of sources) {
  const file = path.join(process.cwd(), rel)
  if (!fs.existsSync(file)) continue
  const src = fs.readFileSync(file, 'utf8')
  for (const m of src.matchAll(/heading:\s*(['"`])((?:\\.|(?!\1).)*)\1/g)) headings.push(m[2].replace(/\\(.)/g, '$1'))
}

let failures = 0
for (const h of headings) {
  const before = oldSlugify(h)
  const after = slugify(h)
  if (before !== after) {
    failures++
    console.error(`CHANGED ${JSON.stringify(h)}: ${before} -> ${after}`)
  }
}
console.log(`English: ${headings.length} headings compared, ${failures} changed`)

const arabic = ['كم تكلفة تصميم موقع إلكتروني؟', 'تَصْمِيمُ المـــواقع في الرياض', 'الأسئلة الشائعة']
for (const h of arabic) {
  const id = slugify(h)
  if (!id) {
    failures++
    console.error(`EMPTY anchor for ${h}`)
  }
}
if (slugify('تَصْمِيمُ المـــواقع') !== 'تصميم-المواقع') {
  failures++
  console.error('Diacritics/tatweel not removed')
}

const blocks = ['Intro', 'Intro', 'الأسئلة الشائعة', 'الأسئلة الشائعة', 'Intro'].map((text, i) => ({
  _type: 'block',
  _key: `k${i}`,
  style: 'h2',
  children: [{ text }],
}))
const ids = [...headingIds(blocks).values()]
const expected = ['intro', 'intro-2', 'الأسئلة-الشائعة', 'الأسئلة-الشائعة-2', 'intro-3']
if (JSON.stringify(ids) !== JSON.stringify(expected)) {
  failures++
  console.error(`Duplicate suffixes wrong: ${JSON.stringify(ids)}`)
}

if (failures > 0) {
  console.error(`${failures} failure(s)`)
  process.exit(1)
}
console.log('OK')
