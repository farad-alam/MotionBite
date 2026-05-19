import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import TechStack from '@/components/sections/TechStack'
import Numbers from '@/components/sections/Numbers'
import Testimonials from '@/components/sections/Testimonials'
import WhyUs from '@/components/sections/WhyUs'
import BlogPreview from '@/components/sections/BlogPreview'
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
      <Problem />
      <Services />
      <Process />
      <Portfolio />
      <TechStack />
      <Numbers />
      <Testimonials />
      <WhyUs />
      <BlogPreview />
      <FAQ />
      <CTABanner />
      <ExitIntentModal />
    </>
  )
}
