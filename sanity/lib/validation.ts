import type { DateRule, SlugIsUniqueValidator } from 'sanity'

export const HREFLANG_OPTIONS = [
  { title: 'ar (Arabic)', value: 'ar' },
  { title: 'ar-SA (Saudi Arabia)', value: 'ar-SA' },
  { title: 'ar-AE (United Arab Emirates)', value: 'ar-AE' },
]

export const LANDING_SECTIONS = [
  { title: 'Services (/services/...)', value: 'services' },
  { title: 'UAE (/uae/...)', value: 'uae' },
  { title: 'Saudi (/saudi/...)', value: 'saudi' },
  { title: 'Partners (/partners/...)', value: 'partners' },
  { title: 'Resources (/resources/...)', value: 'resources' },
  { title: 'Research (/research/...)', value: 'research' },
  { title: 'Arabic (/ar/...)', value: 'ar' },
]

const API_VERSION = '2024-08-01'

function ids(docId: string | undefined) {
  const published = (docId ?? '').replace(/^drafts\./, '')
  return { published, draft: `drafts.${published}` }
}

/** post.slug: unique per language (a missing language counts as English). */
export const isUniquePerLanguage: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context
  const client = getClient({ apiVersion: API_VERSION })
  const { published, draft } = ids(document?._id)
  const language = (document?.language as string | undefined) ?? 'en'
  const count = await client.fetch<number>(
    `count(*[_type == "post" && slug.current == $slug && coalesce(language, "en") == $language && !(_id in [$draft, $published])])`,
    { slug, language, draft, published }
  )
  return count === 0
}

/** landingPage.slug: unique within its section (and therefore its language). */
export const isUniqueInSection: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context
  const client = getClient({ apiVersion: API_VERSION })
  const { published, draft } = ids(document?._id)
  const section = document?.section as string | undefined
  const count = await client.fetch<number>(
    `count(*[_type == "landingPage" && slug.current == $slug && section == $section && !(_id in [$draft, $published])])`,
    { slug, section, draft, published }
  )
  return count === 0
}

/** Warning (not an error) when publishedAt is in the future. */
export const warnIfFuture = (rule: DateRule) =>
  rule
    .custom((value) => {
      if (value && new Date(value).getTime() > Date.now()) {
        return 'This page goes live when you press Publish, not on this date.'
      }
      return true
    })
    .warning()
