import { siteData } from '@/data/site'
import type { SanityAuthor } from '@/sanity/queries'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MotionBite',
  url: 'https://motionbite.com',
  logo: 'https://motionbite.com/logo.png',
  description:
    'Web design and development agency for small businesses and restaurants. Fast, professional websites designed and built end to end — delivered in 14 days.',
  email: siteData.contact.email,
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
    url: `https://motionbite.com/authors/${author.slug.current}`,
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
    '@id': `https://motionbite.com/blog/${slug}`,
  },
  headline: title,
  description,
  url: `https://motionbite.com/blog/${slug}`,
  datePublished,
  dateModified: dateModified || datePublished,
  ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
  ...(image ? { image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 } } : {}),
  ...(wordCount ? { wordCount } : {}),
  // Use real Person if author exists, fall back to Organization
  author: author
    ? buildPersonNode(author, authorAvatarUrl)
    : {
        '@type': 'Organization',
        name: 'MotionBite',
        url: 'https://motionbite.com',
        logo: { '@type': 'ImageObject', url: 'https://motionbite.com/logo.png' },
      },
  publisher: {
    '@type': 'Organization',
    name: 'MotionBite',
    url: 'https://motionbite.com',
    logo: { '@type': 'ImageObject', url: 'https://motionbite.com/logo.png' },
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
    url: 'https://motionbite.com',
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
