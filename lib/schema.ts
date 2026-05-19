export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MotionBite',
  url: 'https://motionbite.com',
  logo: 'https://motionbite.com/logo.png',
  description: 'Web design agency for small businesses. Fast, professional websites delivered in 14 days.',
  email: 'hello@motionbite.com',
  sameAs: [
    'https://www.linkedin.com/company/motionbite',
    'https://www.instagram.com/motionbite',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Design Services',
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
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  url: `https://motionbite.com/blog/${slug}`,
  datePublished,
  dateModified: dateModified || datePublished,
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
