import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Web Design & Development Services for Small Businesses | MotionBite',
  description:
    'Professional web design and development for small businesses and restaurants. Starter Site from $1,500, Growth Package from $3,500. Design and code delivered in 14 days.',
  keywords: [
    'web design and development services',
    'web design and development for small businesses',
    'small business web design and development',
    'restaurant website design and development',
    'professional website development agency',
    'affordable web design and development packages',
    'custom web development for small business',
    'web development 14 day delivery',
  ],
  openGraph: {
    type: 'website',
    title: 'Web Design & Development Services for Small Businesses | MotionBite',
    description:
      'Professional web design and development for small businesses. Starter Site from $1,500. Design and code, delivered in 14 days.',
    url: 'https://motionbite.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design & Development Services for Small Businesses | MotionBite',
    description:
      'Professional web design and development for small businesses. Starter Site from $1,500. Design and code, delivered in 14 days.',
  },
}

const services = [
  {
    id: 'starter',
    icon: '⚡',
    name: 'Starter Site',
    tagline: 'Your business, online in 10 days',
    price: 'From $1,500',
    description:
      'Everything a small business or restaurant needs to launch a credible, fast, mobile-ready website — without the complexity or the wait.',
    features: [
      'Up to 5 pages (Home, About, Services, Contact + 1 more)',
      'Mobile-first responsive design',
      'Basic on-page SEO (titles, meta, headings)',
      'Contact form with email notifications',
      'Google Maps integration',
      'Delivered in 10 days',
      '1 round of revisions',
      'Launch support and handover',
    ],
    suitable: ['New businesses launching online', 'Local shops and restaurants with no website', 'Businesses replacing an old, broken site'],
    cta: 'Get Started',
    ctaHref: '/free-audit',
    popular: false,
  },
  {
    id: 'growth',
    icon: '🚀',
    name: 'Growth Package',
    tagline: 'Built to rank, built to convert',
    price: 'From $3,500',
    description:
      'A full web presence engineered for Google visibility and lead generation — the package most established businesses choose when they want to grow online seriously.',
    features: [
      'Up to 10 pages',
      'Advanced on-page SEO strategy',
      'Blog setup (ready for content)',
      'Performance optimised — 90+ Lighthouse score',
      'Google Analytics 4 integration',
      'Schema.org structured data (rich snippets)',
      'Open Graph / social share images',
      'Delivered in 14 days',
      '2 rounds of revisions',
      '30-day post-launch support',
    ],
    suitable: ['Established businesses wanting more Google traffic', 'Restaurants and shops competing in a crowded market', 'Businesses whose current site has low conversion rate'],
    cta: 'Get Started',
    ctaHref: '/free-audit',
    popular: true,
  },
  {
    id: 'premium',
    icon: '🔥',
    name: 'Premium Build',
    tagline: 'Custom web app or advanced site',
    price: 'From $6,000',
    description:
      'For businesses that need something bespoke — custom functionality, e-commerce, interactive experiences, or a web application. Built to scale.',
    features: [
      'Unlimited pages',
      'Custom features and functionality',
      'E-commerce integration (if needed)',
      'Advanced animations (GSAP + Framer Motion)',
      'Full SEO strategy and implementation',
      'Custom dashboard or admin panel (if required)',
      'Priority delivery',
      'Unlimited revisions',
      '60-day post-launch support',
    ],
    suitable: ['Businesses needing e-commerce or booking systems', 'Brands wanting Awwwards-level design quality', 'Web applications and custom portals'],
    cta: "Let's Talk",
    ctaHref: '/free-audit',
    popular: false,
  },
]

const process = [
  { n: '01', title: 'Discovery Call', desc: 'We spend 30 minutes understanding your business, competitors, and goals. No forms to fill in first — just a conversation.' },
  { n: '02', title: 'Design Mockup', desc: 'Within 48 hours of your call, you receive a real design mockup in your brand — not wireframes, not mood boards.' },
  { n: '03', title: 'Build & Review', desc: 'We build with daily updates. You have access to the live preview at every stage. No surprises.' },
  { n: '04', title: 'Launch & Handover', desc: 'We deploy, connect your domain, verify everything works, and hand over full access. Done.' },
]

const faqs = [
  {
    q: 'What do I need to provide?',
    a: 'Your logo (or we design one), any brand colours you have, and your content (text and photos). If you need help with copy or photography, we can guide you through what works best.',
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: 'Yes — optional monthly care plans cover hosting support, security updates, and small content changes. Ask about this when you book your audit.',
  },
  {
    q: 'Can I upgrade my package later?',
    a: 'Always. Many clients start with a Starter Site and move to the Growth Package once they see the results.',
  },
  {
    q: 'What platform do you build on?',
    a: 'We build primarily on Next.js hosted on Vercel — the fastest, most SEO-friendly stack available. For clients who need a CMS, we integrate Contentful or Sanity.',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-green-primary/10 border border-green-primary/20 text-green-primary text-xs font-body px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
              Web Design & Development
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-6">
              Websites That{' '}
              <span className="text-green-primary">Win Online</span>
            </h1>
            <p className="font-body text-text-muted text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Three clear packages built around where your business is right now — from your first online presence to a full growth engine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/free-audit"
                className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-deep text-dark-base font-heading font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:scale-[1.02]"
              >
                Get Your Free Audit →
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border border-dark-border text-text-primary hover:border-green-primary/40 font-heading font-semibold px-6 py-3 rounded-md transition-all duration-200"
              >
                See Full Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div
                key={s.id}
                className={`relative bg-dark-card rounded-2xl p-8 glow-border flex flex-col ${
                  s.popular ? 'ring-1 ring-green-primary/30' : ''
                }`}
              >
                {s.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-green-primary text-dark-base font-heading font-bold text-xs px-4 py-1 rounded-full">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                <div className="text-4xl mb-4">{s.icon}</div>
                <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">{s.name}</h2>
                <p className="font-body text-text-muted text-sm mb-4">{s.tagline}</p>
                <p className="font-body text-text-muted text-sm leading-relaxed mb-6 border-l-2 border-green-primary/20 pl-3">
                  {s.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-muted text-sm font-body">
                      <span className="text-green-primary mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Suitable for */}
                <div className="mb-6 bg-dark-base rounded-lg p-4">
                  <p className="font-body text-xs text-text-muted mb-2 font-semibold uppercase tracking-wider">
                    Suitable for
                  </p>
                  <ul className="space-y-1">
                    {s.suitable.map((item, i) => (
                      <li key={i} className="font-body text-xs text-text-muted flex items-start gap-1.5">
                        <span className="text-green-primary/60 mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-dark-border pt-6">
                  <p className="font-heading text-2xl font-bold text-green-primary mb-4">{s.price}</p>
                  <Link
                    href={s.ctaHref}
                    className={`block text-center font-heading font-semibold py-3 rounded-md transition-all duration-200 ${
                      s.popular
                        ? 'bg-green-primary hover:bg-green-deep text-dark-base'
                        : 'border border-dark-border text-text-primary hover:border-green-primary/40'
                    }`}
                  >
                    {s.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center font-body text-text-muted text-sm mt-8">
            Not sure which fits?{' '}
            <Link href="/free-audit" className="text-green-primary hover:underline">
              Book a free 30-minute consultation →
            </Link>
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-dark-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              How Every Project Works
            </h2>
            <p className="font-body text-text-muted max-w-xl mx-auto">
              Four steps. No surprises. Live in 14 days.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div key={i} className="bg-dark-base rounded-xl p-6 glow-border">
                <span className="font-heading text-4xl font-bold text-green-primary/30 block mb-4">{step.n}</span>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary text-center mb-10">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div key={i} className="bg-dark-card rounded-xl p-6 glow-border border-l-2 border-green-primary/30">
                <h3 className="font-heading text-base font-bold text-text-primary mb-2">{item.q}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-dark-card rounded-2xl p-10 glow-border">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Not sure where to start?
          </h2>
          <p className="font-body text-text-muted text-sm mb-6 max-w-md mx-auto">
            Get a free 30-minute website audit. We will tell you what to fix, which package fits, and what results to expect.
          </p>
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-deep text-dark-base font-heading font-semibold px-8 py-4 rounded-md transition-all duration-200 hover:scale-[1.02]"
          >
            Book My Free Audit →
          </Link>
          <p className="font-body text-text-muted text-xs mt-4">Free. No commitment. Reply within 24 hours.</p>
        </div>
      </section>
    </div>
  )
}
