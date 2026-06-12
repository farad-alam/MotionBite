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
