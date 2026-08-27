import Link from 'next/link'
import { services } from '@/data/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Design & Development Pricing — From $1,500 | MotionBite',
  description:
    'Transparent web design and development pricing with no hidden fees. Starter Site from $1,500, Growth Package from $3,500, Premium Build from $6,000.',
  keywords: [
    'web design and development cost',
    'website design and development pricing',
    'how much does web design and development cost',
    'business website packages',
    'affordable web design and development pricing',
    'web design and development packages and prices',
    'website development cost for business',
    'web design developer pricing',
  ],
  openGraph: {
    type: 'website',
    title: 'Web Design & Development Pricing — From $1,500 | MotionBite',
    description:
      'Transparent web design and development pricing. Starter Site from $1,500, Growth Package from $3,500, Premium Build from $6,000. No hidden fees.',
    url: 'https://motionbite.com/pricing',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design & Development Pricing — From $1,500 | MotionBite',
    description:
      'Transparent web design and development pricing. Starter Site from $1,500, Growth Package from $3,500. No hidden fees.',
    images: ['/opengraph-image'],
  },
}

const pricingDetails = [
  {
    ...services[0],
    fullFeatures: [
      'Up to 5 pages',
      'Mobile responsive design',
      'Basic on-page SEO',
      'Contact form integration',
      'Google Analytics setup',
      '1 round of revisions',
      '10-day delivery',
    ],
    cta: 'Get Started',
    ctaHref: '/free-consultation',
  },
  {
    ...services[1],
    fullFeatures: [
      'Up to 10 pages',
      'Advanced SEO + blog setup',
      '90+ Lighthouse score',
      'Analytics + conversion tracking',
      'Performance optimised (WebP, lazy load)',
      'Open Graph / social meta',
      '2 rounds of revisions',
      '14-day delivery',
    ],
    cta: 'Get Started',
    ctaHref: '/free-consultation',
  },
  {
    ...services[2],
    fullFeatures: [
      'Unlimited pages',
      'Custom features & integrations',
      'E-commerce ready',
      'Full SEO strategy',
      'Advanced animations (GSAP / Framer)',
      'Priority 24h support',
      'Unlimited revisions',
      'Priority delivery',
    ],
    cta: "Let's Talk",
    ctaHref: '/free-consultation',
  },
]

const pricingFaq = [
  { q: 'Are these one-time fees or monthly?', a: 'One-time project fees. Optional monthly care plans (hosting support, updates, small content changes) are available separately.' },
  { q: "What's included in the care plan?", a: 'Hosting support, security updates, uptime monitoring, and small content changes (text, images). Quoted based on scope.' },
  { q: 'Can I upgrade my package later?', a: 'Yes — you can always upgrade. We credit what you already paid toward the higher tier.' },
  { q: 'Do you offer payment plans?', a: 'Yes. 50% upfront, 50% on launch. We can discuss other arrangements for larger projects.' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-dark-base pt-20">
      {/* Header */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-4">
            Simple, Transparent{' '}
            <span className="text-purple-primary">Pricing</span>
          </h1>
          <p className="font-body text-text-muted text-xl max-w-xl mx-auto">
            No hourly rates. No surprise invoices. Pick your package.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingDetails.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-dark-card rounded-2xl p-8 flex flex-col glow-border ${pkg.popular ? 'ring-1 ring-purple-primary/30' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-primary text-dark-base font-heading font-bold text-xs px-4 py-1 rounded-full">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <div className="text-3xl mb-4">{pkg.icon}</div>
                <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">{pkg.name}</h2>
                <p className="font-body text-text-muted text-sm mb-4">{pkg.tagline}</p>
                <p className="font-heading text-3xl font-bold text-purple-primary mb-6">{pkg.price}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.fullFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-text-muted text-sm font-body">
                      <span className="text-purple-primary mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={pkg.ctaHref}
                  className={`block text-center font-heading font-bold py-3.5 rounded-md transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-purple-primary hover:bg-purple-dark text-dark-base'
                      : 'border border-dark-border text-text-primary hover:border-purple-primary/40'
                  }`}
                >
                  {pkg.cta} →
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-text-muted text-sm font-body mt-8">
            Not sure which fits?{' '}
            <Link href="/free-consultation" className="text-purple-primary hover:underline">
              Get a free consultation →
            </Link>
          </p>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="bg-dark-card section-padding">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary text-center mb-10">
            Pricing Questions
          </h2>
          <div className="space-y-4">
            {pricingFaq.map((item, i) => (
              <div key={i} className="bg-dark-base rounded-xl p-6 glow-border">
                <h3 className="font-heading text-base font-semibold text-text-primary mb-1.5">{item.q}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark-base section-padding">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-body text-text-muted mb-8">Free consultation. No commitment.</p>
          <Link
            href="/free-consultation"
            className="inline-flex items-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-bold px-8 py-4 rounded-md transition-all duration-200"
          >
            Book My Free Audit →
          </Link>
        </div>
      </section>
    </div>
  )
}
