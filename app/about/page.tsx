import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About MotionBite | Web Design & Development Agency',
  description:
    'MotionBite is a web design and development agency for small businesses and restaurants. We handle design and code end to end — fast delivery, transparent pricing.',
  keywords: [
    'web design and development agency',
    'small business web design and development agency',
    'about MotionBite',
    'affordable web design and development team',
    'website design and development company for small businesses',
    'professional web design developer agency',
  ],
  openGraph: {
    type: 'website',
    title: 'About MotionBite | Web Design & Development Agency',
    description:
      'MotionBite is a web design and development agency for small businesses and restaurants. Design and code end to end — fast delivery, transparent pricing.',
    url: 'https://motionbite.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About MotionBite | Web Design & Development Agency',
    description:
      'MotionBite is a web design and development agency for small businesses and restaurants. Design and code end to end — fast delivery, transparent pricing.',
  },
}

const values = [
  {
    icon: '⚡',
    title: 'Speed Without Shortcuts',
    desc: '14 days is the promise. It works because we build with focus — not by cutting corners. Every shortcut shows up later, so we do not take them.',
  },
  {
    icon: '🎯',
    title: 'Conversion First',
    desc: 'Beautiful is necessary but not sufficient. Every design decision has to earn its place by driving the visitor toward an action. If it looks great but does not convert, it gets changed.',
  },
  {
    icon: '💬',
    title: 'No Guessing Games',
    desc: 'Clients should never have to chase us for updates. We communicate proactively — daily during builds, same-day on revisions. You always know exactly what is happening.',
  },
  {
    icon: '📈',
    title: 'Built for Business Results',
    desc: 'We are not a design studio. We are a business results studio that uses design as the tool. The measure of success is enquiries, reservations, and revenue — not awards.',
  },
  {
    icon: '🔒',
    title: 'Satisfaction Guaranteed',
    desc: "We do not close a project until you are genuinely happy with it. That is not a policy — it is how we work. No business owner should pay for something they don't love.",
  },
  {
    icon: '🌍',
    title: 'Built for Small Businesses',
    desc: 'We chose to specialise in small businesses because that is where a great website makes the biggest difference. A $1,500 investment can change the trajectory of a small business. That matters to us.',
  },
]

const stats = [
  { value: '50+', label: 'Websites Launched' },
  { value: '14', label: 'Days Average Delivery' },
  { value: '100%', label: 'Satisfaction Rate' },
  { value: '$0', label: 'Hidden Fees' },
]

const techItems = [
  { name: 'Next.js', desc: 'SSG framework for fast, SEO-ready sites' },
  { name: 'Tailwind CSS', desc: 'Zero unused CSS, precise design system' },
  { name: 'Framer Motion', desc: 'Scroll-triggered animations' },
  { name: 'GSAP', desc: 'Complex timeline animations' },
  { name: 'Vercel', desc: 'Global CDN, zero-config deployment' },
  { name: 'Figma', desc: 'Design and prototyping' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-primary animate-pulse" />
                About MotionBite
              </span>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-text-primary leading-tight mb-6">
                We Build for the{' '}
                <span className="text-purple-primary">Underdogs</span>
              </h1>
              <p className="font-body text-text-muted text-lg leading-relaxed mb-6">
                Small businesses and restaurants compete online against brands with huge marketing budgets. MotionBite exists to level that playing field — by building websites that perform at the same level as those big budgets, for a fraction of the price.
              </p>
              <p className="font-body text-text-muted text-base leading-relaxed">
                We are a lean team of designers and developers who chose to specialise in one thing: websites that win business for small companies. No bloated processes, no junior-team handoffs, no disappearing after launch.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-dark-card rounded-xl p-6 glow-border text-center">
                  <p className="font-heading text-4xl font-bold text-purple-primary mb-1">{s.value}</p>
                  <p className="font-body text-text-muted text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-dark-card">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-8">
            Why MotionBite Exists
          </h2>
          <div className="space-y-5 font-body text-text-muted leading-relaxed">
            <p>
              We have seen the same problem too many times: a great local restaurant, a brilliant boutique, a skilled tradesperson — with a website so bad it is actively costing them customers. Not because the business owner does not care. Because nobody told them what a website should actually do, or built one that did it.
            </p>
            <p>
              At the same time, the agencies that could fix it charged $15,000 and took 3 months. The cheap freelancers delivered something that looked worse than the problem. And the DIY tools created sites that were slow, unranked, and invisible to Google.
            </p>
            <p>
              MotionBite was built to fill that gap. Professional quality. Transparent pricing. Delivered in 14 days. No hidden fees, no scope creep, no surprises.
            </p>
            <p className="text-text-primary font-semibold">
              We are currently accepting new projects and offer a free 30-minute website audit with no obligation. If you are reading this, that offer is open to you.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              How We Work
            </h2>
            <p className="font-body text-text-muted max-w-xl mx-auto">
              The principles behind every project we take on.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-dark-card rounded-xl p-6 glow-border">
                <span className="text-3xl block mb-4">{v.icon}</span>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2">{v.title}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-dark-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3">
              Our Tech Stack
            </h2>
            <p className="font-body text-text-muted text-sm max-w-lg mx-auto">
              The same tools used by Vercel, Linear, and Loom — applied to small business websites for performance that large agencies rarely deliver.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techItems.map((t, i) => (
              <div key={i} className="bg-dark-base rounded-xl p-5 glow-border">
                <p className="font-heading text-base font-bold text-text-primary mb-1">{t.name}</p>
                <p className="font-body text-text-muted text-xs">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Ready to Work Together?
          </h2>
          <p className="font-body text-text-muted text-sm mb-8 max-w-md mx-auto">
            Start with a free 30-minute website audit. No commitment, no pitch — just an honest assessment of what your site needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-audit"
              className="inline-flex items-center justify-center gap-2 bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold px-8 py-4 rounded-md transition-all duration-200 hover:scale-[1.02]"
            >
              Get My Free Audit →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-dark-border text-text-primary hover:border-purple-primary/40 font-heading font-semibold px-8 py-4 rounded-md transition-all duration-200"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
