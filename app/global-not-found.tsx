import type { Metadata } from 'next'
import { Red_Hat_Display, Outfit, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import FooterWrapper from '@/components/layout/FooterWrapper'
import SiteProviders from '@/components/layout/SiteProviders'
import NotFoundView from '@/components/layout/NotFoundView'
import { hasArabicHome } from '@/lib/landing'

// URLs that match no route at all. With two root layouts ((en) and (ar)) there is
// no single layout to compose a 404 from, so this page renders the English shell
// itself (same fonts, navbar and footer as app/(en)/layout.tsx). Next.js adds
// noindex and returns HTTP 404.
const redHatDisplay = Red_Hat_Display({ subsets: ['latin'], variable: '--font-red-hat', display: 'swap' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })

export const metadata: Metadata = {
  title: 'Page not found | MotionBite',
  robots: { index: false, follow: true },
}

export default async function GlobalNotFound() {
  let showArabic = false
  try {
    showArabic = await hasArabicHome()
  } catch {
    showArabic = false
  }
  return (
    <html lang="en" className={`${redHatDisplay.variable} ${outfit.variable} ${playfairDisplay.variable}`}>
      <body>
        <SiteProviders>
          <NavbarWrapper showArabic={showArabic} />
          <main>
            <NotFoundView locale="en" />
          </main>
          <FooterWrapper />
        </SiteProviders>
      </body>
    </html>
  )
}
