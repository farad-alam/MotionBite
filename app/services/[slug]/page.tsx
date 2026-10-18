import type { Metadata } from 'next'
import { getLandingSlugs } from '@/lib/landing'
import { LandingRoute, landingMetadata } from '@/components/landing/route'

export const revalidate = false

export async function generateStaticParams() {
  const slugs = await getLandingSlugs('services')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return landingMetadata('services', slug)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <LandingRoute section="services" slug={slug} />
}
