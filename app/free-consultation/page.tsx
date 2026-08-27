import type { Metadata } from 'next'
import ConsultationForm from './ConsultationForm'

export const metadata: Metadata = {
  title: 'Free 30-Min Website Consultation for Businesses | MotionBite',
  description:
    "Book a free 30-minute consultation. We'll review your website, identify what's costing you customers, and give you a clear action plan — no pitch, no strings.",
  keywords: [
    'free website consultation',
    'free web design consultation',
    'free website review',
    'website strategy consultation',
    'free website analysis for business',
    'free web design and development consultation',
    'book free consultation',
  ],
  openGraph: {
    type: 'website',
    title: 'Free 30-Min Website Consultation | MotionBite',
    description:
      "Book a free 30-minute consultation. We'll review your website and give you a clear action plan — no pitch, no strings.",
    url: 'https://www.motionbite.com/free-consultation',
    images: ['/opengraph-image?v=3'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 30-Min Website Consultation | MotionBite',
    description:
      "Book a free 30-minute consultation. We'll review your website and give you a clear action plan — no pitch, no strings.",
    images: ['/opengraph-image?v=3'],
  },
}

export default function FreeConsultationPage() {
  return <ConsultationForm />
}
