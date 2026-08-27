import { siteData } from '@/data/site'
import type { SanityAuthor } from '@/sanity/queries'

const BASE = siteData.url // https://www.motionbite.com

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MotionBite',
  url: BASE,
  logo: `${BASE}/logo.jpg`,
  image: `${BASE}/logo.jpg`,
  description:
    'Web design and development agency for businesses and restaurants. Fast, professional websites designed and built end to end — delivered in 14 days.',
  email: siteData.contact.email,
  telephone: siteData.contact.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1st Floor, Afroza Tower, Uposhohor Newmarket',
    addressLocality: 'Rajshahi',
    postalCode: '6202',
    addressCountry: 'BD',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$$',
  sameAs: [
    siteData.socials.linkedin,
    siteData.socials.facebook,
    siteData.socials.twitter,
    siteData.socials.youtube,
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Design & Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Starter Site' },
        price: '1500',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Growth Package' },
        price: '3500',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Premium Build' },
        price: '6000',
        priceCurrency: 'USD',
      },
    ],
  },
}

// ─────────────────────────────────────────────
// Build a Person JSON-LD node from a SanityAuthor
// ─────────────────────────────────────────────

function buildPersonNode(author: SanityAuthor, avatarUrl?: string) {
  const name = `${author.firstName} ${author.lastName}`.trim()
  const sameAs = [author.linkedin, author.twitter, author.website, author.facebook].filter(Boolean)
  return {
    '@type': 'Person',
    name,
    url: `${BASE}/authors/${author.slug.current}`,
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.shortBio ? { description: author.shortBio } : {}),
    ...(avatarUrl
      ? { image: { '@type': 'ImageObject', url: avatarUrl } }
      : {}),
    ...(author.expertiseAreas && author.expertiseAreas.length > 0
      ? { knowsAbout: author.expertiseAreas }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

// ─────────────────────────────────────────────
// BlogPosting / Article schema
// ─────────────────────────────────────────────

export const articleSchema = ({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  keywords,
  image,
  wordCount,
  author,
  authorAvatarUrl,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  keywords?: string[]
  image?: string
  wordCount?: number
  author?: SanityAuthor
  authorAvatarUrl?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE}/blog/${slug}`,
  },
  headline: title,
  description,
  url: `${BASE}/blog/${slug}`,
  datePublished,
  dateModified: dateModified || datePublished,
  ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
  ...(image ? { image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 } } : {}),
  ...(wordCount ? { wordCount } : {}),
  author: author
    ? buildPersonNode(author, authorAvatarUrl)
    : {
        '@type': 'Organization',
        name: 'MotionBite',
        url: BASE,
        logo: { '@type': 'ImageObject', url: `${BASE}/logo.jpg` },
      },
  publisher: {
    '@type': 'Organization',
    name: 'MotionBite',
    url: BASE,
    logo: { '@type': 'ImageObject', url: `${BASE}/logo.jpg` },
  },
})

// ─────────────────────────────────────────────
// Person schema — for the /authors/[slug] page
// ─────────────────────────────────────────────

export const personSchema = (author: SanityAuthor, avatarUrl?: string) => ({
  '@context': 'https://schema.org',
  ...buildPersonNode(author, avatarUrl),
  worksFor: {
    '@type': 'Organization',
    name: 'MotionBite',
    url: BASE,
  },
})

// ─────────────────────────────────────────────
// FAQ schema
// ─────────────────────────────────────────────

export const faqSchema = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})

// ─────────────────────────────────────────────
// BreadcrumbList schema
// ─────────────────────────────────────────────

export const breadcrumbSchema = (
  crumbs: { name: string; path: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: `${BASE}${crumb.path}`,
  })),
})

// ─────────────────────────────────────────────
// WebPage schema — for static pages
// ─────────────────────────────────────────────

export const webPageSchema = ({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  description,
  url: `${BASE}${path}`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'MotionBite',
    url: BASE,
  },
  publisher: {
    '@type': 'Organization',
    name: 'MotionBite',
    url: BASE,
  },
})
