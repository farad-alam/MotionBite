import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://motionbite.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Web Design & Development for Businesses | MotionBite',
    template: '%s | MotionBite',
  },
  description:
    'MotionBite builds fast, professional websites for businesses and restaurants — design and development handled end to end. Delivered in 14 days. Get your free audit today.',
  keywords: [
    'web design and development for businesses',
    'web design for businesses',
    'web development for businesses',
    'website design and development agency',
    'affordable web design and development',
    'restaurant website design and development',
    'custom web development for business',
    'business web design agency',
    'professional website development',
    'fast website design and development',
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
      'MotionBite builds fast, professional websites for businesses and restaurants — design and development end to end. Delivered in 14 days.',
    images: [
      {
        url: '/opengraph-image',
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
      'MotionBite builds fast, professional websites for businesses and restaurants — design and development end to end. Delivered in 14 days.',
    images: ['/opengraph-image'],
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
