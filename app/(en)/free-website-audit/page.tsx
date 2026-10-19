import type { Metadata } from 'next'
import AuditForm from './AuditForm'
import { auditCopy, AUDIT_COPY_IS_PLACEHOLDER, AUDIT_SAMPLE_REPORT, AUDIT_TURNAROUND } from '@/data/audit'

const URL = 'https://www.motionbite.com/free-website-audit'
const OG = 'https://www.motionbite.com/opengraph-image.png'

// WP5.2 (R026). While the copy in data/audit.ts is still placeholder text the page
// is noindex and stays out of the sitemap, so nothing unfinished gets indexed.
export const metadata: Metadata = {
  title: auditCopy.title,
  description: auditCopy.description,
  alternates: { canonical: '/free-website-audit' },
  ...(AUDIT_COPY_IS_PLACEHOLDER ? { robots: { index: false, follow: true } } : {}),
  openGraph: {
    type: 'website',
    title: `${auditCopy.title} | MotionBite`,
    description: auditCopy.description,
    url: URL,
    images: [OG],
  },
  twitter: { card: 'summary_large_image', title: `${auditCopy.title} | MotionBite`, description: auditCopy.description, images: [OG] },
}

export default function FreeWebsiteAuditPage() {
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: auditCopy.title,
    description: auditCopy.description,
    url: URL,
    publisher: { '@id': 'https://www.motionbite.com/#organization' },
  }
  const faqPage = auditCopy.faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: auditCopy.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }
    : null

  return (
    <div className="min-h-screen bg-dark-base pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      {faqPage && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />}

      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="inline-flex items-center gap-2 bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-3 py-1.5 rounded-full mb-6">
                {auditCopy.badge}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                {auditCopy.headline}
              </h1>
              <p className="font-body text-text-muted text-lg leading-relaxed mb-6">{auditCopy.intro}</p>
              {AUDIT_TURNAROUND && <p className="font-body text-text-primary text-sm mb-6">{AUDIT_TURNAROUND}</p>}
              {AUDIT_SAMPLE_REPORT && (
                <a href={AUDIT_SAMPLE_REPORT.href} className="text-purple-primary text-sm font-body hover:underline">
                  {AUDIT_SAMPLE_REPORT.label}
                </a>
              )}
            </div>
            <AuditForm />
          </div>
        </div>
      </section>

      {auditCopy.covers.length > 0 && (
        <section className="bg-dark-card section-padding">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {auditCopy.covers.map((c) => (
                <div key={c.title} className="bg-dark-base rounded-xl p-6 glow-border">
                  <h2 className="font-heading text-lg font-bold text-text-primary mb-2">{c.title}</h2>
                  <p className="font-body text-text-muted text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {auditCopy.faq.length > 0 && (
        <section className="section-padding">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {auditCopy.faq.map((f) => (
              <div key={f.q} className="bg-dark-card rounded-xl p-5 glow-border">
                <h2 className="font-heading text-base font-semibold text-text-primary mb-1">{f.q}</h2>
                <p className="font-body text-text-muted text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
