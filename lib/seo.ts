import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://motionbite.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Web Design for Small Businesses | MotionBite',
    template: '%s | MotionBite',
  },
  description:
    'MotionBite builds fast, professional websites for small businesses and restaurants. Delivered in 14 days. Get your free audit today.',
  keywords: [
    'web design for small businesses',
    'website builder for restaurants',
    'affordable web development agency',
    'professional website for local business',
    'small business website design',
    'custom website for small business',
    'web design agency for food businesses',
    'fast website design 14 days',
  ],
  authors: [{ name: 'MotionBite' }],
  creator: 'MotionBite',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'MotionBite',
    title: 'Web Design for Small Businesses | MotionBite',
    description:
      'MotionBite builds fast, professional websites for small businesses and restaurants. Delivered in 14 days. Get your free audit today.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MotionBite — We Build Websites That Mean Business' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design for Small Businesses | MotionBite',
    description: 'MotionBite builds fast, professional websites for small businesses and restaurants. Delivered in 14 days.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}
