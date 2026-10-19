import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'

/** Shared 404 body, rendered inside the English or Arabic layout. The HTTP status stays 404. */
export default function NotFoundView({ locale = 'en', homeHref }: { locale?: Locale; homeHref?: string }) {
  const d = t(locale)
  const home = homeHref ?? (locale === 'ar' ? '/ar' : '/')
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 bg-dark-base">
      <div className="max-w-xl text-center">
        <p className="font-heading text-6xl md:text-7xl font-bold text-purple-primary/40 mb-4" aria-hidden="true">
          404
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">{d.notFoundTitle}</h1>
        <p className="font-body text-text-muted text-lg mb-8">{d.notFoundBody}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={home}
            className="inline-flex items-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-all duration-200"
          >
            {d.backHome}
          </Link>
          {locale === 'en' && (
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-dark-border text-text-primary hover:border-purple-primary/40 font-heading font-semibold px-6 py-3 rounded-md transition-all duration-200"
            >
              {d.blog}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
