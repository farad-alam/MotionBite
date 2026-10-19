import type { Metadata } from 'next'
import { LandingRoute, landingMetadata } from '@/components/landing/route'

// /ar renders the Arabic home page: a landingPage with section "ar" and the
// reserved slug "home" (WP3 5.4). 404 until that document is published.
export const revalidate = false

export async function generateMetadata(): Promise<Metadata> {
  return landingMetadata('ar', 'home')
}

export default async function ArabicHomePage() {
  return <LandingRoute section="ar" slug="home" />
}
