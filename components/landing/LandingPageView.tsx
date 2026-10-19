import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@/sanity/portableText'
import { urlFor } from '@/sanity/image'
import TableOfContents from '@/components/blog/TableOfContents'
import AuthorBox from '@/components/blog/AuthorBox'
import { services } from '@/data/services'
import { siteData } from '@/data/site'
import { breadcrumbSchema, faqSchema, landingPageSchema } from '@/lib/schema'
import { landingPath, type LandingPage, type SiteCta } from '@/lib/landing'
import { t, otherLanguageLabel, type Locale } from '@/lib/i18n'
import Arrow from '@/components/ui/Arrow'

const PACKAGE_SECTIONS = ['services', 'uae', 'saudi', 'partners']
const WHATSAPP = `https://wa.me/${siteData.contact.phone.replace(/\D/g, '')}`

function jsonLd(data: unknown) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

function buildCrumbs(page: LandingPage, locale: Locale) {
  const home = locale === 'ar' ? '/ar' : '/'
  const crumbs: { name: string; path: string }[] = [{ name: t(locale).home, path: home }]
  // The Arabic home page (/ar) is itself "Home": no second crumb.
  if (landingPath(page.section, page.slug) === home) return crumbs
  if (page.parent) {
    // max two levels of parent, grandparent first
    if (page.parent.parent) {
      crumbs.push({ name: page.parent.parent.title, path: landingPath(page.parent.parent.section, page.parent.parent.slug) })
    }
    crumbs.push({ name: page.parent.title, path: landingPath(page.parent.section, page.parent.slug) })
  } else if (page.section === 'services') {
    crumbs.push({ name: 'Services', path: '/services' })
  }
  crumbs.push({ name: page.title, path: landingPath(page.section, page.slug) })
  return crumbs
}

function countH2(body: LandingPage['body']) {
  return (body ?? []).filter((b) => b._type === 'block' && b.style === 'h2').length
}

export type TwinLink = { href: string; hrefLang: string }

export default function LandingPageView({
  page,
  cta,
  twin,
}: {
  page: LandingPage
  cta: SiteCta
  /** Live page in the other language, when one exists (WP3 5.2). */
  twin?: TwinLink | null
}) {
  const locale: Locale = page.language === 'ar' ? 'ar' : 'en'
  const strings = t(locale)
  const path = landingPath(page.section, page.slug)
  const crumbs = buildCrumbs(page, locale)
  const hasBody = !!page.body && page.body.length > 0
  const showToc = hasBody && countH2(page.body) >= 3
  const showPackages = PACKAGE_SECTIONS.includes(page.section) && page.language === 'en'
  const faq = page.faqItems?.filter((f) => f.question && f.answer) ?? []
  const related = page.relatedLinks?.filter((l) => l.href?.startsWith('/')) ?? []
  const cases = (page.relatedCaseStudies ?? []).filter((c): c is NonNullable<typeof c> => !!c?.slug)
  const ogImage = page.mainImage?.asset
    ? urlFor(page.mainImage).width(1200).height(630).format('webp').url()
    : undefined
  const authorAvatarUrl = page.author?.avatar?.asset
    ? urlFor(page.author.avatar).width(200).height(200).format('webp').url()
    : undefined

  const pageSchema = landingPageSchema({
    schemaType: page.schemaType ?? 'WebPage',
    name: page.title,
    description: page.metaDescription,
    path,
    areaServed: page.areaServed,
    datePublished: page.publishedAt,
    dateModified: page.updatedAt ?? page.publishedAt,
    image: ogImage,
    author: page.author,
    authorAvatarUrl,
    inLanguage: locale === 'ar' ? 'ar' : undefined,
  })

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      {jsonLd(pageSchema)}
      {jsonLd(breadcrumbSchema(crumbs))}
      {faq.length > 0 && jsonLd(faqSchema(faq))}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Breadcrumb */}
        <nav aria-label={strings.breadcrumb} className="mb-8">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-body text-text-muted">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={c.path} className="hover:text-purple-primary transition-colors">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-text-primary">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {twin && (
          <p className="mb-6">
            <Link
              href={twin.href}
              hrefLang={twin.hrefLang}
              lang={locale === 'en' ? 'ar' : 'en'}
              className="inline-flex items-center gap-2 text-sm font-body text-purple-primary hover:underline"
            >
              {otherLanguageLabel(locale)}
            </Link>
          </p>
        )}

        {/* 2. Hero */}
        <header className="mb-12">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-5">
            {page.title}
          </h1>
          {page.heroSubtitle && (
            <p className="font-body text-text-muted text-lg leading-relaxed mb-8 max-w-3xl">{page.heroSubtitle}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-colors duration-200"
            >
              {cta.label} <Arrow />
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-dark-border hover:border-purple-primary/40 text-text-primary font-heading font-semibold px-6 py-3 rounded-md transition-colors duration-200"
            >
              {strings.chatOnWhatsapp}
            </a>
          </div>
        </header>

        {/* 3. Body */}
        {hasBody && (
          <div className="mb-14">
            {showToc && (
              <div className="mb-8">
                <TableOfContents body={page.body!} variant="mobile" locale={locale} />
              </div>
            )}
            <PortableText value={page.body!} />
          </div>
        )}

        {/* 4. Proof (hidden when empty; never invented) */}
        {cases.length > 0 && (
          <section className="mb-14" aria-labelledby="proof-heading">
            <h2 id="proof-heading" className="font-heading text-2xl font-bold text-text-primary mb-6">
              {strings.proofHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cases.map((c) => (
                <Link
                  key={c._id}
                  href={`/portfolio/${c.slug}`}
                  className="block bg-dark-card rounded-xl overflow-hidden glow-border hover:border-purple-primary/30 transition-all duration-200"
                >
                  {c.thumbnail?.asset && (
                    <div className="relative aspect-video">
                      <Image
                        src={urlFor(c.thumbnail).width(480).height(270).format('webp').url()}
                        alt={c.thumbnail.alt ?? c.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    {c.industry && <p className="text-xs font-body text-purple-primary mb-1">{c.industry}</p>}
                    <p className="font-heading font-semibold text-text-primary">{c.name}</p>
                    {c.result && <p className="font-body text-text-muted text-sm mt-1">{c.result}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 5. Packages strip (names/prices come from data/services.ts, not Sanity) */}
        {showPackages && (
          <section className="mb-14" aria-labelledby="packages-heading">
            <h2 id="packages-heading" className="font-heading text-2xl font-bold text-text-primary mb-6">
              Packages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={s.href}
                  className="block bg-dark-card rounded-xl p-5 glow-border hover:border-purple-primary/30 transition-all duration-200"
                >
                  <p className="font-heading font-semibold text-text-primary">{s.name}</p>
                  <p className="font-heading text-xl font-bold text-purple-primary my-1">{s.price}</p>
                  <p className="font-body text-text-muted text-sm">{s.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 6. FAQ */}
        {faq.length > 0 && (
          <section className="mb-14">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">{strings.faq}</h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-text-primary mb-2">{item.question}</h3>
                  <p className="font-body text-text-muted text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Related links */}
        {related.length > 0 && (
          <section className="mb-14">
            <h2 className="font-heading text-xl font-bold text-text-primary mb-4">{strings.relatedPages}</h2>
            <ul className="space-y-2">
              {related.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-purple-primary hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 8. Author */}
        {page.author &&
          (locale === 'ar' ? (
            <p className="font-body text-text-muted text-sm">
              {strings.writtenBy}{' '}
              <bdi className="text-text-primary">
                {`${page.author.firstName} ${page.author.lastName}`.trim()}
              </bdi>
            </p>
          ) : (
            <AuthorBox author={page.author} />
          ))}

        {/* 9. Closing CTA */}
        <div className="mt-12 bg-dark-card rounded-xl p-6 sm:p-8 glow-border text-center">
          <p className="font-heading text-xl font-bold text-text-primary mb-6">{strings.closingCta}</p>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-colors duration-200"
          >
            {cta.label} <Arrow />
          </Link>
        </div>
      </div>
    </div>
  )
}
