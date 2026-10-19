import Link from 'next/link'
import { getTwin } from '@/lib/hreflang'
import { otherLanguageLabel, type Locale } from '@/lib/i18n'

// In-page "Read in Arabic" / "Read in English" link for hard-coded pages (WP3 5.2).
// Renders nothing until the twin is live. Uses the same lookup as hreflang.
export default async function TwinLanguageLink({
  path,
  language = 'en',
  className = '',
}: {
  path: string
  language?: Locale
  className?: string
}) {
  const pair = await getTwin(path, language)
  if (!pair) return null
  const toArabic = language === 'en'
  return (
    <Link
      href={toArabic ? pair.arPath : pair.enPath}
      hrefLang={toArabic ? pair.hreflang : 'en'}
      lang={toArabic ? 'ar' : 'en'}
      className={`inline-block text-sm font-body text-purple-primary hover:underline ${className}`.trim()}
    >
      {otherLanguageLabel(language)}
    </Link>
  )
}
