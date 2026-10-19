import { draftMode } from 'next/headers'
import { createClient } from 'next-sanity'
import { client } from '@/sanity/client'

// Draft preview client: perspective 'drafts' needs a Viewer token. Server-only
// (never import from client components). The token is never sent to the browser.
const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-08-01',
  useCdn: false,
  perspective: 'drafts',
  token: process.env.SANITY_API_READ_TOKEN,
})

// True only for a real request with Draft Mode on. Outside a request
// (build time, generateStaticParams) draftMode() throws, which means "off".
export async function isDraftMode(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

// Fetch published content normally (cached, tagged). In Draft Mode, with a read
// token configured, fetch the drafts perspective with no caching at all.
// In the drafts perspective the `!(_id in path("drafts.**"))` guard must go,
// so callers pass the published-only clause as a marker we strip here.
export const PUBLISHED_ONLY = '&& !(_id in path("drafts.**"))'

export async function fetchContent<T>(
  query: string,
  params: Record<string, unknown>,
  tags: string[]
): Promise<T> {
  if ((await isDraftMode()) && process.env.SANITY_API_READ_TOKEN) {
    return previewClient.fetch<T>(query.replace(PUBLISHED_ONLY, ''), params, {
      cache: 'no-store',
      next: { revalidate: 0 },
    })
  }
  return client.fetch<T>(query, params, { next: { tags } })
}
