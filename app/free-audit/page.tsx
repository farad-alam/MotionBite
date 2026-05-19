import type { Metadata } from 'next'
import AuditForm from './AuditForm'

export const metadata: Metadata = {
  title: 'Free Website Audit for Small Businesses | MotionBite',
  description:
    "Get a free 30-minute web design and development audit. We'll review your site's speed, SEO, and conversions — and tell you exactly what to fix. No pitch.",
  keywords: [
    'free website audit',
    'free web design and development audit',
    'free website review',
    'website SEO and development audit',
    'website conversion review',
    'free website analysis for small business',
    'free web design and development consultation',
  ],
  openGraph: {
    type: 'website',
    title: 'Free Website Audit for Small Businesses | MotionBite',
    description:
      "Get a free 30-minute web design and development audit — speed, SEO, and conversion review. We'll tell you exactly what to fix.",
    url: 'https://motionbite.com/free-audit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Website Audit for Small Businesses | MotionBite',
    description:
      "Get a free 30-minute web design and development audit — speed, SEO, and conversion review. We'll tell you exactly what to fix.",
  },
}

export default function FreeAuditPage() {
  return <AuditForm />
}
