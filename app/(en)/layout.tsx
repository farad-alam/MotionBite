import type { Metadata } from 'next'
import { Red_Hat_Display, Outfit, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { defaultMetadata } from '@/lib/seo'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import FooterWrapper from '@/components/layout/FooterWrapper'
import SiteProviders, { OrganizationJsonLd } from '@/components/layout/SiteProviders'

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
  
  const keywords = typeof settings?.seoKeywords === 'string' && settings.seoKeywords.trim().length > 0
    ? settings.seoKeywords.split(',').map((k: string) => k.trim())
    : defaultMetadata.keywords
  
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
        <OrganizationJsonLd />
      </head>
      <body>
        <SiteProviders>
          <NavbarWrapper />
          <main>{children}</main>
          <FooterWrapper />
        </SiteProviders>
      </body>
    </html>
  )
}
