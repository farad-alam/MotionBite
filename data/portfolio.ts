export type PortfolioItem = {
  id: number
  slug: string
  name: string
  industry: string
  result: string
  tags: string[]
  image: string
  href: string
  challenge: string
  solution: string
  results: string[]
  testimonial?: string
  clientName?: string
  video?: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    slug: 'papa-roma',
    name: 'Papa Roma Smoke House',
    industry: 'Restaurant',
    result: '3x more reservations after launch',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/portfolio/papa-roma.jpg',
    video: '/videos/portfolio/omatic.mp4',
    href: '/portfolio/papa-roma',
    challenge:
      'Papa Roma had no online presence — no website, no Google profile, no way for new customers to discover them. Walk-in traffic was the only source of new business, and the owners knew they were missing out on the growing number of diners who search online before deciding where to eat.',
    solution:
      'We built a full restaurant website in 12 days: a visually rich homepage with full-screen food photography, an HTML menu page (not a PDF), an online reservation form, and a story section about the owners. The site was built on Next.js for maximum speed and SEO, with Schema.org LocalBusiness markup for local search visibility.',
    results: [
      '3x increase in reservations within 60 days of launch',
      'Ranked on page 1 of Google for "smoke house restaurant" in their area within 45 days',
      'Online reservations now account for 40% of total bookings',
      'Google Business Profile impressions up 220% in the first month',
    ],
    testimonial:
      'MotionBite built our restaurant website in 12 days. We went from zero online presence to getting 15 new reservations per week through the site. Best investment we made this year.',
    clientName: 'Ahmed R., Owner — Papa Roma Smoke House',
  },
  {
    id: 2,
    slug: 'yashfeen-boutique',
    name: 'Yashfeen Boutique',
    industry: 'Fashion Retail',
    result: '2x increase in online inquiries',
    tags: ['Next.js', 'E-commerce', 'SEO'],
    image: '/images/portfolio/yashfeen.jpg',
    video: '/videos/portfolio/vechile.mp4',
    href: '/portfolio/yashfeen-boutique',
    challenge:
      "Yashfeen Boutique was operating entirely through Instagram and word-of-mouth. While their loyal customers loved them, new customers couldn't find them online. They had a full inventory of products but no way to showcase them to people searching Google.",
    solution:
      'We built a mobile-first website with a curated product gallery, an Instagram feed integration, a WhatsApp inquiry button, and a store location page with embedded map. The SEO foundations — fast loading, proper headings, descriptive alt text, and Google Business Profile integration — were built in from day one.',
    results: [
      '2x increase in online inquiries within 90 days',
      '47 new customer inquiries tracked directly from the website in the first 3 months',
      'Over $12,000 in attributable revenue from a $1,500 investment',
      'Now appearing in Google search results for boutique and fashion searches in their area',
    ],
    testimonial:
      "I was sceptical about the 14-day promise but they delivered. The site looks better than competitors who spent 3x more. The WhatsApp button alone doubled our inquiry rate.",
    clientName: 'Sarah L., Owner — Yashfeen Boutique',
  },
  {
    id: 3,
    slug: 'nexlint-digital',
    name: 'NexLint Digital',
    industry: 'B2B Services',
    result: '40% lower bounce rate',
    tags: ['Next.js', 'GSAP', 'Tailwind CSS'],
    image: '/images/portfolio/nexlint.jpg',
    video: '/videos/portfolio/nexlint.mp4',
    href: '/portfolio/nexlint-digital',
    challenge:
      "NexLint Digital had an existing website, but it was slow, visually generic, and not converting. Their bounce rate was over 70%, and their Google Ads traffic was being wasted because the landing experience wasn't good enough to generate leads. They needed a complete rebuild.",
    solution:
      'We rebuilt the site from scratch on Next.js with GSAP-powered animations, a completely redesigned homepage that clearly communicated their value proposition, individual service pages targeting specific B2B keywords, and a contact form that actually converted. The new site scored 96 on Lighthouse.',
    results: [
      '40% reduction in bounce rate within 30 days of launch',
      'Lighthouse performance score: 96 (up from 54)',
      '3x increase in contact form submissions from the same ad traffic',
      'Average session duration increased from 42 seconds to 2 minutes 18 seconds',
    ],
    testimonial:
      'The whole process was clear from day one. No chasing, no surprises, just a great result. Our bounce rate dropped 40% and leads from Google Ads tripled. I wish we had done this sooner.',
    clientName: 'Marcus T., Director — NexLint Digital',
  },
]
