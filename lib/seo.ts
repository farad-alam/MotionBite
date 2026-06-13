import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://motionbite.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Web Design & Development for Small Businesses | MotionBite',
    template: '%s | MotionBite',
  },
  description:
    'MotionBite builds fast, professional websites for small businesses and restaurants — design and development handled end to end. Delivered in 14 days. Get your free audit today.',
  keywords: [
    'web design and development for small businesses',
    'web design for small businesses',
    'web development for small businesses',
    'website design and development agency',
    'affordable web design and development',
    'restaurant website design and development',
    'custom web development for small business',
    'small business web design agency',
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
    title: 'Web Design & Development for Small Businesses | MotionBite',
    description:
      'MotionBite builds fast, professional websites for small businesses and restaurants — design and development end to end. Delivered in 14 days.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design & Development for Small Businesses | MotionBite',
    description:
      'MotionBite builds fast, professional websites for small businesses and restaurants — design and development end to end. Delivered in 14 days.',
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
