import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { getLandingSlugs } from '@/lib/landing'
import { LandingRoute, landingMetadata } from '@/components/landing/route'

export const revalidate = false

// "home" is served at /ar; next.config.ts also redirects /ar/home -> /ar.
export async function generateStaticParams() {
  const slugs = await getLandingSlugs('ar')
  return slugs.filter((slug) => slug !== 'home').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'home') return {}
  return landingMetadata('ar', slug)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug === 'home') permanentRedirect('/ar')
  return <LandingRoute section="ar" slug={slug} />
}
