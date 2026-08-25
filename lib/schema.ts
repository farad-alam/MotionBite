import { siteData } from '@/data/site'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MotionBite',
  url: 'https://motionbite.com',
  logo: 'https://motionbite.com/logo.png',
  description: 'Web design and development agency for small businesses and restaurants. Fast, professional websites designed and built end to end — delivered in 14 days.',
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

export const articleSchema = ({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  keywords,
  image,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
  keywords?: string[]
  image?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url: `https://motionbite.com/blog/${slug}`,
  datePublished,
  dateModified: dateModified || datePublished,
  ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
  ...(image ? { image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 } } : {}),
  author: { '@type': 'Organization', name: 'MotionBite', url: 'https://motionbite.com' },
  publisher: {
    '@type': 'Organization',
    name: 'MotionBite',
    url: 'https://motionbite.com',
    logo: { '@type': 'ImageObject', url: 'https://motionbite.com/logo.png' },
  },
})

export const faqSchema = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})
