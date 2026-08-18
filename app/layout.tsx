import type { Metadata } from 'next'
import Script from 'next/script'
import { Red_Hat_Display, Outfit, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'
import { defaultMetadata } from '@/lib/seo'
import { organizationSchema } from '@/lib/schema'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import FooterWrapper from '@/components/layout/FooterWrapper'
import CrispProvider from '@/components/providers/CrispProvider'
import LenisProvider from '@/components/providers/LenisProvider'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-red-hat',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${redHatDisplay.variable} ${outfit.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <LenisProvider>
          <NavbarWrapper />
          <main>{children}</main>
          <FooterWrapper />
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-4MZ7PGKCX1" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-4MZ7PGKCX1');
            `}
          </Script>
          <Analytics />
          <CrispProvider />
        </LenisProvider>
      </body>
    </html>
  )
}
