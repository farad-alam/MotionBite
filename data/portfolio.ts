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
    name: 'Papa Roma Food Engineering',
    industry: 'Restaurant & Hospitality',
    result: 'Multi-menu restaurant site live in under 2 weeks',
    tags: ['Next.js', 'Framer Motion', 'CSS Modules'],
    image: '/images/portfolio/papa-roma.png',
    video: '/videos/portfolio/papa-roma.mp4',
    href: '/portfolio/papa-roma',
    challenge:
      'Papa Roma had no online presence and no way for new diners to discover their menus before visiting. Their four distinct dining experiences — including Texas-style BBQ, Bengali cuisine, and international flavours — were completely invisible to anyone searching online, and there was no way to make a reservation without calling.',
    solution:
      'We built a premium dark-themed restaurant website on Next.js with Framer Motion scroll-parallax animations, four dedicated menu pages, an online reservation form, and a lakeside dining atmosphere conveyed through full-screen food photography. Lenis smooth scroll, Schema.org LocalBusiness markup, and Vercel deployment ensured maximum speed and local SEO visibility.',
    results: [
      'Full 4-menu restaurant website live in under 2 weeks',
      'Page 1 Google ranking for relevant Dhanmondi restaurant searches within 45 days',
      'Online reservation form generating 20+ enquiries per week within 60 days of launch',
      'Google Business Profile impressions up 180% in the first month',
    ],
    testimonial:
      'We had zero online presence before MotionBite. Now we rank on Google, diners browse our full menu before visiting, and reservations come through the website every day. Exactly what we needed.',
    clientName: 'Nizhum, Owner — Papa Roma Food Engineering',
  },
  {
    id: 2,
    slug: 'baitullah-musafir',
    name: 'Baitullah Musafir',
    industry: 'Travel & Pilgrimage',
    result: 'Hajj enquiries doubled in the first season after launch',
    tags: ['Next.js', 'Framer Motion', 'SEO'],
    image: '/images/portfolio/baitullah-musafir.png',
    video: '/videos/portfolio/baitullah-musafir.mp4',
    href: '/portfolio/baitullah-musafir',
    challenge:
      "Baitullah Musafir was a Hajj & Umrah travel agency with no digital presence. Prospective pilgrims searching online for Hajj packages from Bangladesh couldn't find them. With three package tiers and years of experience, the agency had no way to showcase its value or provide pre-departure guidance to registered pilgrims.",
    solution:
      'We built a complete Bengali-language Hajj travel website on Next.js with animated package cards across three tiers (Economy ৳5.5L, Standard ৳6.75L, VIP ৳8.5L), a comprehensive Hajj guide, step-by-step training pages, duas sections, a dedicated women\'s guide, downloadable documents, FAQ, and a WhatsApp-integrated contact form — all with Framer Motion animations for a polished, trustworthy feel.',
    results: [
      'Complete 12-page Hajj agency website built and deployed within 3 weeks',
      'All three package tiers presented clearly with pricing — removing the need for an initial sales call',
      'Pilgrims can now access Hajj guides, duas, and training materials directly on the site',
      'WhatsApp enquiries from the site doubled package sign-ups in the first Hajj season',
    ],
    testimonial:
      'Families research Hajj for months before booking. Having a professional site with our packages, guides, and duas built their trust before they even contacted us. Our enquiries doubled in the first season.',
    clientName: 'Management Team — Baitullah Musafir',
  },
  {
    id: 3,
    slug: 'bismillah-auto',
    name: 'Bismillah Auto',
    industry: 'Automotive Tech',
    result: 'Page 1 Google ranking for GPS tracker searches within 30 days',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/images/portfolio/bismillah-auto.png',
    video: '/videos/portfolio/bismillah-auto.mp4',
    href: '/portfolio/bismillah-auto',
    challenge:
      'Bismillah Auto was the local dealer for MotoLock GPS trackers in Chapainawabganj but had zero online visibility. Motorcycle owners searching for GPS tracking and anti-theft protection were finding competitors from other cities instead. Walk-in traffic and word-of-mouth were their only acquisition channels.',
    solution:
      'We built a conversion-focused product landing page on Next.js with TypeScript, showcasing the MotoLock GPS tracker with feature breakdowns, real-time tracking and engine-lock capabilities, pricing, and a WhatsApp-first CTA. Schema.org Product markup with star ratings and pricing was implemented for rich Google search results, and the entire site was optimised for local GPS tracker keywords specific to Chapainawabganj.',
    results: [
      'Page 1 Google ranking for "GPS tracker Chapainawabganj" within 30 days of launch',
      'Rich results (star ratings, price) appearing in Google search within 2 weeks',
      'WhatsApp enquiries from the site converting at 35% in the first month',
      'First online sales channel established — no longer reliant solely on walk-in customers',
    ],
    testimonial:
      'Before the website, nobody could find us online. Now customers from across Chapainawabganj contact us through the site before even visiting the shop. The Google visibility alone paid for the site in the first month.',
    clientName: 'Owner — Bismillah Auto, Chapainawabganj',
  },
  {
    id: 4,
    slug: 'fitlife-bd',
    name: 'FitlifeBD',
    industry: 'Fitness & Wellness',
    result: 'Unified digital hub for a 7-location gym chain',
    tags: ['Next.js', 'TypeScript', 'Framer Motion'],
    image: '/images/portfolio/fitlife-bd.png',
    video: '/videos/portfolio/fitlife.mp4',
    href: '/portfolio/fitlife-bd',
    challenge:
      "FitlifeBD had grown to 7 gym locations across Bangladesh with 1,000+ members and 30+ certified trainers over 8 years — but had no unified website. Each branch was marketed separately, prospective members had no central place to explore membership plans, and the gym's track record of body transformations was completely invisible online.",
    solution:
      'We built a comprehensive gym website with Framer Motion scroll animations and CountUp stats, service breakdowns across six categories (weight training, cardio, group classes, personal training, nutrition coaching, body transformation), trainer profiles, three membership tiers, a before/after transformation gallery, branch locations map, FAQ, and a contact section — all mobile-first and performance-optimised.',
    results: [
      'All 7 branches unified under one professional website for the first time',
      'Membership enquiries increased as prospective members could browse plans and trainers before visiting',
      'Transformation gallery built social proof online and reduced front-desk sales friction',
      'Trainer profiles and certifications increased trust — new members arrived already knowing who they wanted to train with',
    ],
    testimonial:
      'We had 7 gyms and zero online presence. MotionBite built a site that finally matches the quality of our facilities. New members come in already knowing our trainers, our pricing, and what results to expect.',
    clientName: 'Abu Sufian Taj, Founder — FitlifeBD',
  },
  {
    id: 5,
    slug: 'reach-logic',
    name: 'ReachLogic',
    industry: 'Digital Marketing Agency',
    result: 'Premium agency site built to Awwwards-tier quality',
    tags: ['Next.js', 'GSAP', 'Tailwind CSS'],
    image: '/images/portfolio/reach-logic.png',
    video: '/videos/portfolio/reach-logic.mp4',
    href: '/portfolio/reach-logic',
    challenge:
      "ReachLogic was a full-service digital marketing agency offering social media management, paid ads (Facebook, TikTok, Google), and web development — but their website was generic and didn't reflect the premium brand they were building. High-value international clients weren't converting because the site didn't inspire the confidence the services deserved.",
    solution:
      'We built a premium agency site targeting Awwwards-tier quality: an interactive canvas particle network in the hero, GSAP ScrollTrigger animations throughout, Lenis smooth scroll, custom Fraunces serif display typography paired with Inter, and a deep teal/forest dark colour palette. Each section was conversion-engineered — from animated stat counters to structured service cards — to move visitors toward a lead form.',
    results: [
      'Complete brand-aligned website delivered at Awwwards / CSS Design Awards quality standard',
      'Bounce rate dropped significantly as scroll animations kept visitors engaged through every section',
      'High-value client enquiries increased — site now matches the agency\'s premium market positioning',
      'GSAP particle hero made the site a talking point — shared in the agency\'s own client case studies',
    ],
    testimonial:
      "We sell premium marketing but our old site looked like a free template. MotionBite built something we're genuinely proud to show prospects. The animations and overall craft make exactly the right impression.",
    clientName: 'Founder — ReachLogic Digital Agency',
  },
  {
    id: 6,
    slug: 'saudi-garej',
    name: 'Saudi Garej',
    industry: 'Automotive Services',
    result: 'WhatsApp leads flowing from day one of launch',
    tags: ['Next.js', 'TypeScript', 'Framer Motion'],
    image: '/images/portfolio/saudi-garej.png',
    video: '/videos/portfolio/saudi-garej.mp4',
    href: '/portfolio/saudi-garej',
    challenge:
      'Saudi Garej (مؤسسة سيارة الحد) was a 24/7 car service garage in Saudi Arabia with no website. Customers had no way to discover their oil change, tyre, battery, and car wash services online. The garage was invisible to the growing number of drivers who search for nearby service centres before calling.',
    solution:
      'We built a fully bilingual Arabic/English website with RTL layout support, a WhatsApp-first contact flow, animated service cards for engine oil and workshop services, a special offer section (free car wash with every oil change), product listings for tyres and oils, an image slider for the "Why Us" section, and a hero slider — all with Schema.org markup for local search in Saudi Arabia.',
    results: [
      'Bilingual Arabic/English website reaching both local and expat customers from day one',
      'WhatsApp contact button driving inbound enquiries within days of launch',
      'Free car wash offer featured prominently — reported increase in oil change bookings',
      'Local SEO foundations in place for car service searches in the garage\'s area',
    ],
    testimonial:
      'The website made us look like a proper business. Arabic and English customers both find us on Google now, and the WhatsApp button brings in new customers every day.',
    clientName: 'Owner — مؤسسة سيارة الحد, Saudi Arabia',
  },
  {
    id: 7,
    slug: 'omatic-social',
    name: 'Omatic Social',
    industry: 'SaaS / Social Media',
    result: 'Full social scheduling SaaS shipped with automated publishing',
    tags: ['Next.js', 'TypeScript', 'Prisma'],
    image: '/images/portfolio/omatic-social.png',
    video: '/videos/portfolio/omatic-social.mp4',
    href: '/portfolio/omatic-social',
    challenge:
      'The client needed a complete social media content management platform — not just a posting tool, but a full SaaS with Instagram-connected scheduling, calendar-based planning, draft management, and automated cron-job publishing. Existing tools were too expensive or too limited for their target users.',
    solution:
      'We built a full-stack SaaS on Next.js with TypeScript and Prisma, featuring an Instagram-like post creation UI, a dashboard with calendar view showing scheduled/published/draft/failed post statuses, Instagram account connection, bulk scheduling with per-post date/time control, automated cron-based publishing, and a phone-preview mode that renders posts exactly as they appear on a user\'s Instagram profile.',
    results: [
      'Complete social media scheduling SaaS built and deployed end-to-end',
      'Automated cron-based publishing running without manual intervention',
      'Calendar dashboard giving users a clear visual of their entire content pipeline',
      'Instagram-accurate phone preview mode reducing post errors before publishing',
    ],
    testimonial:
      'Every feature we asked for was built exactly as we described it. The bulk scheduling alone saves our team hours every week. The phone preview is a detail none of the competitors get right.',
    clientName: 'Founder — Omatic Social',
  },
  {
    id: 8,
    slug: 'muscle-flex',
    name: 'Muscle Flex Gym',
    industry: 'Fitness & Wellness',
    result: 'Membership sign-ups increased within weeks of launch',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/portfolio/muscle-flex.png',
    video: '/videos/portfolio/muscle-flex-gym.mp4',
    href: '/portfolio/muscle-flex',
    challenge:
      "Muscle Flex Gym was relying entirely on word-of-mouth and walk-in traffic to grow their membership base. They had no website, no way to showcase their facilities, and no online presence to capture people searching for a gym in their area. Potential members were choosing competitors simply because they could find them online.",
    solution:
      'We built a high-energy gym website with Framer Motion animations, a facilities showcase with photography, membership plan comparison, trainer profiles, a transformation gallery, class schedule, and a WhatsApp-integrated sign-up CTA. The site was built mobile-first on Next.js with Tailwind CSS and optimised for local gym searches from day one.',
    results: [
      'First professional online presence — gym discoverable on Google within weeks of launch',
      'Membership enquiries through the site within the first month of going live',
      'Facilities and transformation results visible online for the first time — building trust before members walk in',
      'Positive Google Business Profile reviews increased after launch as online credibility grew',
    ],
    testimonial:
      'Before the site, people would drive past our gym and not know what was inside. Now they find us on Google, see our results, and come in ready to sign up. The difference was immediate.',
    clientName: 'Owner — Muscle Flex Gym',
  },
  {
    id: 9,
    slug: 'pethygene-lab',
    name: 'PethyGene Lab',
    industry: 'Healthcare & Diagnostics',
    result: 'Professional diagnostic lab site with online appointment booking',
    tags: ['Next.js', 'Tailwind CSS', 'SEO'],
    image: '/images/portfolio/pethygene-lab.png',
    video: '/videos/portfolio/pethygenelab.mp4',
    href: '/portfolio/pethygene-lab',
    challenge:
      'PethyGene Lab was a diagnostic and genetics laboratory with no web presence. Patients and referring physicians could not find information about their test panels, pricing, or how to book appointments online. In a sector where trust is everything, the lack of a professional online presence was directly costing them referrals.',
    solution:
      'We built a clean, trust-first laboratory website on Next.js with a services/test panel directory, online appointment booking system, doctor referral portal, blog for health & research content, and a contact section with embedded map. The site was built with healthcare SEO best practices — structured data, fast loading, and clear E-E-A-T signals — to rank for diagnostic searches in their area.',
    results: [
      'Professional website live for the first time — lab now findable on Google',
      'Online appointment booking reducing front-desk call volume',
      'Doctor referral portal streamlining the physician-to-lab workflow',
      'Health blog establishing the lab as an authority in diagnostics and genetic testing',
    ],
    testimonial:
      'Our patients kept asking if we had a website. Now we do — and referring doctors can send patients directly from the appointment booking page. MotionBite understood the trust requirements of a healthcare brand and built accordingly.',
    clientName: 'Director — PethyGene Lab',
  },
]
