import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from './ContactForm'
import { siteData } from '@/data/site'

export const metadata: Metadata = {
  title: 'Contact MotionBite | Free Web Design & Development Consultation',
  description:
    'Contact MotionBite for a free web design and development consultation. We reply within 24 hours. Business websites from $1,500, delivered in 14 days.',
  keywords: [
    'contact web design and development agency',
    'get a website design and development quote',
    'free web design consultation',
    'hire web designer and developer for business',
    'web design and development enquiry',
    'MotionBite contact',
  ],
  openGraph: {
    type: 'website',
    title: 'Contact MotionBite | Free Web Design & Development Consultation',
    description:
      'Contact MotionBite for a free web design and development consultation. We reply within 24 hours. Websites from $1,500.',
    url: 'https://www.motionbite.com/contact',
    images: ['/opengraph-image?v=3'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact MotionBite | Free Web Design & Development Consultation',
    description:
      'Contact MotionBite for a free web design and development consultation. We reply within 24 hours. Websites from $1,500.',
    images: ['/opengraph-image?v=3'],
  },
}

const contactDetails = [
  {
    icon: '📧',
    label: 'Email',
    value: siteData.contact.email,
    href: `mailto:${siteData.contact.email}`,
  },
  {
    icon: '⚡',
    label: 'Response Time',
    value: siteData.contact.responseTime,
    href: null,
  },
  {
    icon: '🌍',
    label: 'Working Hours',
    value: siteData.contact.workingHours,
    href: null,
  },
]

const faqs = [
  {
    q: 'How quickly will you reply?',
    a: 'We reply to all enquiries within 24 hours, Monday to Friday. For urgent matters, mention it in your message.',
  },
  {
    q: "What should I include in my message?",
    a: 'Tell us your business type, what you currently have (or don\'t have), and what result you are looking for. The more context you give, the more useful our first reply will be.',
  },
  {
    q: 'Can I book directly without messaging first?',
    a: 'Yes — use the "Get Free Audit" link to fill in the audit form and we will schedule a call. No back-and-forth needed.',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-base">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.motionbite.com"},{"@type":"ListItem","position":2,"name":"Contact","item":"https://www.motionbite.com/contact"}]}` }} />
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-primary animate-pulse" />
              Currently accepting new projects
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-text-primary leading-tight mb-4">
              Let&apos;s Build Something{' '}
              <span className="text-purple-primary">Good</span>
            </h1>
            <p className="font-body text-text-muted text-lg leading-relaxed">
              Tell us about your business. We will reply within 24 hours with an honest assessment and a clear next step.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Right: Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact details */}
              <div className="bg-dark-card rounded-2xl p-6 glow-border">
                <h2 className="font-heading text-lg font-bold text-text-primary mb-5">Contact Details</h2>
                <div className="space-y-4">
                  {contactDetails.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-base shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-body text-xs text-text-muted mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="font-body text-sm text-text-primary hover:text-purple-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-body text-sm text-text-primary">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast-track CTA */}
              <div className="bg-dark-card rounded-2xl p-6 glow-border border border-purple-primary/10">
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  Want to skip straight to results?
                </h2>
                <p className="font-body text-text-muted text-sm leading-relaxed mb-4">
                  Book a free 30-minute website audit. We will review your current site (or your competitors&apos;) and tell you specifically what to fix.
                </p>
                <Link
                  href="/free-consultation"
                  className="block w-full text-center bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-semibold py-3 rounded-md transition-all duration-200 text-sm"
                >
                  Book My Free Audit →
                </Link>
                <p className="font-body text-text-muted text-xs text-center mt-2">Free. No commitment.</p>
              </div>

              {/* Social */}
              <div className="bg-dark-card rounded-2xl p-6 glow-border">
                <h2 className="font-heading text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">Follow Along</h2>
                <div className="flex gap-3">
                  <a
                    href={siteData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-dark-base border border-dark-border flex items-center justify-center text-text-muted hover:text-purple-primary hover:border-purple-primary/30 transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    in
                  </a>
                  <a
                    href={siteData.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-dark-base border border-dark-border flex items-center justify-center text-text-muted hover:text-purple-primary hover:border-purple-primary/30 transition-all duration-200 text-sm"
                    aria-label="Facebook"
                  >
                    FB
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding px-4 sm:px-6 lg:px-8 bg-dark-card">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary text-center mb-8">
            Before You Send
          </h2>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div key={i} className="bg-dark-base rounded-xl p-5 glow-border border-l-2 border-purple-primary/20">
                <h3 className="font-heading text-base font-bold text-text-primary mb-2">{item.q}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
