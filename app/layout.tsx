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

import { getSiteSettings } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  let settings = null
  try {
    settings = await getSiteSettings()
  } catch (error) {
    console.error('Error fetching site settings for metadata:', error)
  }

  const title = settings?.seoTitle || 'Web Design & Development for Businesses | MotionBite'
  const description = settings?.seoDescription || defaultMetadata.description
  const keywords = settings?.seoKeywords?.length ? settings.seoKeywords : defaultMetadata.keywords
  
  let ogImage = defaultMetadata.openGraph?.images
  if (settings?.seoImage?.asset) {
    ogImage = [
      {
        url: urlFor(settings.seoImage).width(1200).height(630).format('webp').url(),
        width: 1200,
        height: 630,
        alt: settings.seoImage.alt || title,
      },
    ]
  }

  return {
    ...defaultMetadata,
    title: {
      default: title,
      template: '%s | MotionBite',
    },
    description,
    keywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description: description as string,
      images: ogImage as any,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description: description as string,
      images: ogImage as any,
    },
  }
}

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
