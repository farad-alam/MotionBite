import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.motionbite.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Web Design & Development for Businesses | MotionBite',
    template: '%s | MotionBite',
  },
  description:
    'MotionBite builds fast, high-converting websites for businesses, startups, and agencies — design and development handled end to end. Delivered in 14 days. Get your free audit today.',
  keywords: [
    'web design and development for businesses',
    'custom web development agency',
    'website design for startups',
    'high-converting business websites',
    'affordable web design and development',
    'B2B web design agency',
    'custom web development for business',
    'professional website development',
    'fast website design and development',
    'digital agency web development',
  ],
  authors: [{ name: 'MotionBite' }],
  creator: 'MotionBite',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'MotionBite',
    title: 'Web Design & Development for Businesses | MotionBite',
    description:
      'MotionBite builds fast, high-converting websites for businesses, startups, and agencies — design and development end to end. Delivered in 14 days.',
    images: [
      {
        url: '/opengraph-image?v=3',
        width: 1200,
        height: 630,
        alt: 'MotionBite — Web Design & Development for Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design & Development for Businesses | MotionBite',
    description:
      'MotionBite builds fast, high-converting websites for businesses, startups, and agencies — design and development end to end. Delivered in 14 days.',
    images: ['/opengraph-image?v=3'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: 'OEUfSm3Lf_5Zzg6nD-r2q9ROuakMKJUnsbhU3-hnhYI',
  },
}
