import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import Testimonials from '@/components/sections/Testimonials'
import WhyUs from '@/components/sections/WhyUs'

import FAQ from '@/components/sections/FAQ'
import CTABanner from '@/components/sections/CTABanner'
import ExitIntentModal from '@/components/ui/ExitIntentModal'
import { faqItems } from '@/data/faq'
import { faqSchema } from '@/lib/schema'
import { getAlternates } from '@/lib/hreflang'

// generateMetadata (not a static export) so hreflang appears once the Arabic
// twin (/ar, R009) is published. The twin lookup is tagged landingPages.
export async function generateMetadata(): Promise<Metadata> {
  const languages = await getAlternates('/', 'en')
  return {
    title: { absolute: 'Web Design and Development Agency for Businesses Worldwide – Websites in 14 Days | MotionBite' },
    description:
      'Custom websites for businesses and restaurants, from $1,500. Design and development delivered in 14 days. Book a free consultation.',
    alternates: { canonical: '/', ...(languages ? { languages } : {}) },
  }
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />
      <Hero />
      <Portfolio />
      <Services />
      <Process />
      <Testimonials />
      <WhyUs />

      <FAQ />
      <CTABanner />
      <ExitIntentModal />
    </>
  )
}
