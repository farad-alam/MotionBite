import { client } from './client'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type SanitySiteSettings = {
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  seoImage?: { asset: { _ref: string }; alt: string }
}

export type CloudinaryAsset = {
  public_id: string
  secure_url: string
  format: string
  resource_type: string
}

export type SanityPortfolioProject = {
  _id: string
  name: string
  slug: { current: string }
  status: 'published' | 'draft'
  industry: string
  services?: string[]
  result: string
  liveUrl?: string
  deliveryDays?: number
  completedAt?: string
  order?: number
  thumbnail: { asset: { _ref: string }; alt: string }
  demoVideo?: CloudinaryAsset
  youtubeUrl?: string
  challenge: string
  solution: string
  results: string[]
  metrics?: { label: string; value: string }[]
  testimonial?: string
  clientName?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}


export type SanityAuthor = {
  firstName: string
  lastName: string
  slug: { current: string }
  avatar?: { asset: { _ref: string }; alt: string }
  jobTitle?: string
  shortBio?: string
  fullBio?: SanityBlock[]
  expertiseAreas?: string[]
  yearsExperience?: number
  linkedin?: string
  twitter?: string
  facebook?: string
  website?: string
}

export type SanityPost = {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: {
    asset: { _ref: string }
    alt: string
  }
  category?: { title: string; slug?: { current: string } }
  author?: SanityAuthor
  keywords?: string[]
  publishedAt: string
  updatedAt?: string
  readTime?: string
  wordCount?: number
  body?: SanityBlock[]
  faqItems?: { question: string; answer: string }[]
  canonicalUrl?: string
  related?: SanityPostCard[]
}

export type SanityPostCard = {
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: { asset: { _ref: string }; alt: string }
  category?: { title: string }
  author?: Pick<SanityAuthor, 'firstName' | 'lastName' | 'slug' | 'avatar'>
  publishedAt: string
  readTime?: string
}

export type SanityBlock = {
  _type: string
  _key: string
  [key: string]: unknown
}

// ─────────────────────────────────────────────
// Author GROQ fragment (reused in multiple queries)
// ─────────────────────────────────────────────

const AUTHOR_FIELDS = `
  "author": author->{
    firstName,
    lastName,
    slug,
    avatar { asset, alt },
    jobTitle,
    shortBio,
    expertiseAreas,
    yearsExperience,
    linkedin,
    twitter,
    facebook,
    website
  }
`

// ─────────────────────────────────────────────
// Listing page query — minimal fields for fast load
// ─────────────────────────────────────────────

export async function getAllPosts(): Promise<SanityPostCard[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      excerpt,
      mainImage { asset, alt },
      "category": category->{ title },
      "author": author->{ firstName, lastName, slug, avatar { asset, alt } },
      publishedAt,
      "readTime": round(length(pt::text(body)) / 1500) + " min read"
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

// ─────────────────────────────────────────────
// All post slugs — for generateStaticParams
// ─────────────────────────────────────────────

export async function getAllPostSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post"]{ slug }`,
    {},
    { cache: 'no-store' }
  )
  return results.map((r) => r.slug.current)
}

// ─────────────────────────────────────────────
// Single post — full fields for article page
// ─────────────────────────────────────────────

export async function getPost(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage { asset, alt },
      "category": category->{ title, slug },
      ${AUTHOR_FIELDS},
      keywords,
      publishedAt,
      updatedAt,
      "readTime": round(length(pt::text(body)) / 1500) + " min read",
      "wordCount": length(string::split(pt::text(body), " ")),
      body,
      faqItems,
      canonicalUrl,
      "related": *[_type == "post" && category._ref == ^.category._ref && slug.current != $slug][0..1] {
        title,
        slug,
        excerpt,
        "category": category->{ title },
        publishedAt,
        "readTime": round(length(pt::text(body)) / 1500) + " min read"
      }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}

// ─────────────────────────────────────────────
// All author slugs — for generateStaticParams on /authors/[slug]
// ─────────────────────────────────────────────

export async function getAllAuthorSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "author"]{ slug }`,
    {},
    { cache: 'no-store' }
  )
  return results.map((r) => r.slug.current)
}

// ─────────────────────────────────────────────
// Single author + all their posts — for /authors/[slug]
// ─────────────────────────────────────────────

export type SanityAuthorWithPosts = SanityAuthor & {
  fullBio?: SanityBlock[]
  posts: SanityPostCard[]
}

export async function getAuthor(slug: string): Promise<SanityAuthorWithPosts | null> {
  return client.fetch(
    `*[_type == "author" && slug.current == $slug][0] {
      firstName,
      lastName,
      slug,
      avatar { asset, alt },
      jobTitle,
      shortBio,
      fullBio,
      expertiseAreas,
      yearsExperience,
      linkedin,
      twitter,
      facebook,
      website,
      "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
        title,
        slug,
        excerpt,
        mainImage { asset, alt },
        "category": category->{ title },
        publishedAt,
        "readTime": round(length(pt::text(body)) / 1500) + " min read"
      }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}

// ─────────────────────────────────────────────
// Site Settings Queries
// ─────────────────────────────────────────────

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      seoTitle,
      seoDescription,
      seoKeywords,
      seoImage { asset, alt }
    }`,
    {},
    { next: { revalidate: 86400 } } // 24 hours — global SEO settings rarely change; webhook handles instant updates
  )
}

// ─────────────────────────────────────────────
// Portfolio Queries
// ─────────────────────────────────────────────

const PORTFOLIO_FIELDS = `
  _id,
  name,
  slug,
  status,
  industry,
  services,
  result,
  liveUrl,
  deliveryDays,
  completedAt,
  order,
  thumbnail { asset, alt },
  demoVideo,
  youtubeUrl,
  challenge,
  solution,
  results,
  metrics,
  testimonial,
  clientName,
  seoTitle,
  seoDescription,
  seoKeywords
`

export async function getPortfolioProjects(): Promise<SanityPortfolioProject[]> {
  return client.fetch(
    `*[_type == "portfolioProject" && status == "published"] | order(order asc, completedAt desc) {
      ${PORTFOLIO_FIELDS}
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getPortfolioProject(slug: string): Promise<SanityPortfolioProject | null> {
  return client.fetch(
    `*[_type == "portfolioProject" && slug.current == $slug][0] {
      ${PORTFOLIO_FIELDS}
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}
