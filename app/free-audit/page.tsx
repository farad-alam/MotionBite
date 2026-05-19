import type { Metadata } from 'next'
import AuditForm from './AuditForm'

export const metadata: Metadata = {
  title: 'Free Website Audit for Small Businesses | MotionBite',
  description:
    "Get a free 30-minute website audit. We'll review your site's speed, SEO, and conversion rate — and tell you exactly what's costing you customers. No pitch.",
  keywords: [
    'free website audit',
    'free website review',
    'website SEO audit free',
    'website conversion review',
    'free website analysis for small business',
    'website performance check',
    'free web design consultation',
  ],
  openGraph: {
    type: 'website',
    title: 'Free Website Audit for Small Businesses | MotionBite',
    description:
      "Get a free 30-minute website audit — speed, SEO, and conversion review. We'll tell you exactly what's costing you customers.",
    url: 'https://motionbite.com/free-audit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Website Audit for Small Businesses | MotionBite',
    description:
      "Get a free 30-minute website audit — speed, SEO, and conversion review. We'll tell you exactly what's costing you customers.",
  },
}

export default function FreeAuditPage() {
  return <AuditForm />
}
