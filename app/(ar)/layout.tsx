import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import '@/styles/globals.css'
import { defaultMetadata } from '@/lib/seo'
import SiteProviders, { OrganizationJsonLd } from '@/components/layout/SiteProviders'
import NavbarAr from '@/components/layout/NavbarAr'
import FooterAr from '@/components/layout/FooterAr'
import { getArabicSiteSettings } from '@/lib/landing'

// WP3 5.1/5.2: root layout for everything under /ar. Loaded only here, so
// English pages gain no font weight.
const plexArabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '700'],
  subsets: ['arabic'],
  variable: '--font-ar',
  display: 'swap',
})

// Tailwind's font-heading / font-body / font-serif read these three variables.
// Pointing them at the Arabic font makes every existing utility render in Arabic.
const fontVars = {
  '--font-red-hat': 'var(--font-ar)',
  '--font-outfit': 'var(--font-ar)',
  '--font-playfair': 'var(--font-ar)',
} as CSSProperties

export const metadata: Metadata = {
  metadataBase: defaultMetadata.metadataBase,
  title: { default: 'MotionBite', template: '%s | MotionBite' },
  authors: defaultMetadata.authors,
  creator: defaultMetadata.creator,
  robots: defaultMetadata.robots,
  verification: defaultMetadata.verification,
  openGraph: {
    type: 'website',
    siteName: 'MotionBite',
    locale: 'ar_SA',
    alternateLocale: ['en_US'],
    images: [{ url: '/opengraph-image?v=3', width: 1200, height: 630, alt: 'MotionBite' }],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image?v=3'] },
}

export default async function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getArabicSiteSettings()
  return (
    <html lang="ar" dir="rtl" className={plexArabic.variable} style={fontVars}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body>
        <SiteProviders>
          <NavbarAr links={settings.nav} cta={settings.cta} />
          <main>{children}</main>
          <FooterAr links={settings.footer} />
        </SiteProviders>
      </body>
    </html>
  )
}
