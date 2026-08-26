export type BlogSection = {
  heading?: string
  body: string
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  tag: string
  readTime: string
  date: string
  image: string
  sections: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'signs-small-business-needs-new-website',
    title: '5 Signs Your Business Needs a New Website',
    excerpt: "If your site is slow, looks outdated, or isn't generating leads — it's costing you money every day.",
    tag: 'Web Design',
    readTime: '4 min read',
    date: '2026-05-10',
    image: '/images/blog/signs-new-website.jpg',
    sections: [
      {
        body: "If your website isn't bringing in customers, it's probably losing them. Most business owners know their site \"isn't great\" but don't know exactly what to fix. Here are the five clearest signs you need a new one.",
      },
      {
        heading: 'Your Website Takes More Than 3 Seconds to Load',
        body: "Google's research shows 53% of mobile users abandon a site that takes more than three seconds to load. If your site is slow, visitors leave before they see what you offer — and Google ranks you lower because of it. A modern, properly built website typically loads in under 1.5 seconds.",
      },
      {
        heading: "It Doesn't Look Right on Mobile",
        body: 'More than 60% of web traffic now comes from smartphones. If your website looks cramped, has text too small to read, or forces users to zoom sideways, you lose more than half your potential customers the moment they land. Mobile-first is no longer optional — it is the baseline.',
      },
      {
        heading: "You're Not Showing Up on Google",
        body: "Type your business category into Google. If you're not on the first page, your competitors are getting your customers. A site built with modern SEO foundations — proper headings, fast loading, clean code — gives Google what it needs to rank you.",
      },
      {
        heading: "Visitors Arrive But Don't Contact You",
        body: 'Traffic without conversions means your site is not doing its job. If people visit but never call, email, or book, the issue is usually poor design hierarchy, weak calls-to-action, or a site that does not build trust quickly. A conversion-focused redesign can double your inquiry rate.',
      },
      {
        heading: "Your Competitors' Sites Look Better",
        body: "Perception is reality online. If a potential customer visits your site and then your competitor's, they'll form a judgment about professionalism in seconds. If your site looks dated compared to who you're competing against, you're starting every customer interaction at a disadvantage.",
      },
      {
        heading: 'What to Do Next',
        body: 'If any of these sound familiar, the cost of doing nothing is higher than the cost of a new website. At MotionBite, a complete Starter Site starts at $1,500 and is delivered in 10 days. Not sure what is holding your current site back? Get a free audit — we will tell you specifically what to fix.',
      },
    ],
  },
  {
    slug: 'how-much-does-small-business-website-cost',
    title: 'How Much Does a Business Website Cost? (Honest 2026 Guide)',
    excerpt: "From $300 templates to $20,000 custom builds — here's what you actually get at each price point.",
    tag: 'Pricing',
    readTime: '6 min read',
    date: '2026-05-05',
    image: '/images/blog/website-cost.jpg',
    sections: [
      {
        body: 'Search "website cost" and you\'ll find everything from "free with Wix" to "$50,000 custom builds". The real answer depends on what you actually need. Here is an honest breakdown of what different budgets buy you in 2026.',
      },
      {
        heading: 'Free / DIY ($0–$200)',
        body: 'Wix, Squarespace, and Google Sites let you launch for free or very cheap. What you get: a basic site that looks like a template, limited SEO control, and no custom functionality. Fine for testing a concept. Not suitable for a business that wants to compete seriously online.',
      },
      {
        heading: 'Template Builders With a Designer ($300–$1,200)',
        body: "Hire a freelancer to set up a Wix or Squarespace template. You get a cleaner result than DIY, but you're still on a platform with limitations — page speed suffers, your SEO ceiling is lower, and you pay monthly forever. Total cost after 3 years is often higher than a custom site.",
      },
      {
        heading: 'Small Agency / Specialist ($1,500–$6,000)',
        body: "This is where real websites live. A specialist agency builds your site on a proper framework (Next.js, custom WordPress), giving you full control and SEO performance from the ground up. At MotionBite, this range covers our Starter Site ($1,500) through Growth Package ($3,500) and Premium Build ($6,000+).",
      },
      {
        heading: 'Large Agency ($8,000–$50,000+)',
        body: 'Top-tier agencies charge this for brand strategy, UX research, custom design systems, and complex functionality. Unless you are a scaling e-commerce brand or enterprise business, this is overkill for most businesses.',
      },
      {
        heading: 'The Hidden Cost of Cheap',
        body: 'A $300 template that does not convert costs you every month it is live. If your website should generate 5 new inquiries per month and does not, that is 5 customers going to your competitor. A proper website pays for itself — usually within weeks. The question is not "how cheap can I go?" It is "what is it worth to win customers online?"',
      },
    ],
  },
  {
    slug: 'why-google-cant-find-your-business',
    title: "Why Google Can't Find Your Business (And How to Fix It)",
    excerpt: "Most business websites are invisible to Google. Here are the 5 most common reasons — and the fixes.",
    tag: 'SEO',
    readTime: '5 min read',
    date: '2026-04-28',
    image: '/images/blog/google-seo.jpg',
    sections: [
      {
        body: "Most business websites are essentially invisible to Google. Not because the business is bad — but because nobody told the owner what Google actually needs. Here are the five most common reasons, and what to do about each one.",
      },
      {
        heading: "You Don't Have a Google Business Profile",
        body: 'Google Business Profile (formerly Google My Business) is free, takes 20 minutes to set up, and is the fastest way to appear in local searches. Without it, your business will not show up on Google Maps or in the local search pack at the top of results. Set it up today at business.google.com.',
      },
      {
        heading: "Your Website Isn't Mobile-Friendly",
        body: "Google uses mobile-first indexing — it crawls and ranks your mobile site, not your desktop site. If your site isn't optimised for mobile, Google will rank it lower regardless of everything else. Check Google's Mobile-Friendly Test tool to see where you stand.",
      },
      {
        heading: 'Your Pages Are Too Slow',
        body: 'Page speed is a direct Google ranking factor. If your site takes more than 3 seconds to load, Google sees that visitors leave quickly, interprets it as a poor user experience, and ranks you lower. Common culprits: unoptimised images, cheap hosting, and outdated themes.',
      },
      {
        heading: "You're Missing the Right Words",
        body: 'Google matches search queries to web pages. If your website does not contain the exact words people search for — "restaurant in [city]", "web designer for business" — it cannot rank for them. Every page needs a clear H1 heading, descriptive paragraphs, and page titles that include your target keyword.',
      },
      {
        heading: 'No Other Sites Link to You',
        body: 'Backlinks — links from other websites to yours — are Google\'s strongest trust signal. A new site with zero backlinks will struggle to rank even with perfect on-page SEO. Start simple: get listed in industry directories, ask local partners to link to you, and write one useful blog post people will share.',
      },
      {
        heading: 'The Fix',
        body: 'Most of these issues can be resolved without rebuilding your entire site. But if your website has multiple problems at once, a fresh build on a modern stack like Next.js solves them permanently — fast loading, mobile-first, clean code that Google loves. Not sure what is wrong with your site? Get a free SEO audit from MotionBite.',
      },
    ],
  },
  {
    slug: 'restaurant-website-design-guide-2026',
    title: 'Restaurant Website Design: Complete Guide for 2026',
    excerpt: 'A restaurant without a proper website is leaving reservations on the table every day. Here is exactly what yours needs.',
    tag: 'Restaurant',
    readTime: '7 min read',
    date: '2026-04-20',
    image: '/images/blog/restaurant-guide.jpg',
    sections: [
      {
        body: "A restaurant without a good website in 2026 is leaving reservations, takeaway orders, and event bookings on the table every single day. This guide covers exactly what a restaurant website needs — and why most of them get it wrong.",
      },
      {
        heading: 'Why Most Restaurant Websites Fail',
        body: "The most common mistake: the website looks like a business card instead of a sales tool. It has an address and phone number, maybe a PDF menu — and nothing else. No clear call-to-action, no online booking, no story that makes customers feel something. Visitors land and leave within seconds.",
      },
      {
        heading: 'The Must-Have Pages',
        body: "Every restaurant website needs: a homepage that makes you hungry, a menu page with real prices (not a PDF), a reservations page with online booking, an about/story page, and a contact page with a map. Missing even one of these costs you customers.",
      },
      {
        heading: 'Menu Design Is Everything',
        body: "Your menu is your number-one sales tool online. It needs to be an actual webpage — not a PDF scan. Proper HTML menus load fast, are readable on mobile, rank in Google, and can be updated instantly. PDFs do none of this.",
      },
      {
        heading: 'Online Reservations Are Non-Negotiable',
        body: "If visitors have to call to book, a significant percentage won't bother. Integrate a booking tool like OpenTable, Resy, or a simple contact form with date and time selection. The easier you make it to book, the more bookings you get.",
      },
      {
        heading: 'Photos Make or Break It',
        body: "Food photography is the highest-ROI investment a restaurant can make for its website. Poor lighting and bad angles signal low quality — even if your food is exceptional. Professional photos of your signature dishes can double your online inquiry rate.",
      },
      {
        heading: 'Local SEO for Restaurants',
        body: 'Every restaurant website needs its address in structured data (Schema.org LocalBusiness), a connected Google Business Profile, and pages that mention the cuisine type and service area naturally. These signals together determine where you show up in "restaurants near me" searches.',
      },
    ],
  },
  {
    slug: 'small-business-seo-get-found-google',
    title: 'Business SEO: How to Get Found on Google Without Paying for Ads',
    excerpt: 'Paid ads stop the moment you stop paying. Organic SEO delivers free traffic month after month. Here is how to start.',
    tag: 'SEO',
    readTime: '5 min read',
    date: '2026-04-12',
    image: '/images/blog/seo-guide.jpg',
    sections: [
      {
        body: 'Paid ads stop working the moment you stop paying. SEO — getting your website to rank organically — keeps delivering traffic for free, month after month. Here is how businesses can build real Google visibility without a marketing budget.',
      },
      {
        heading: 'Start With Your Google Business Profile',
        body: 'Before anything else: claim and complete your Google Business Profile. Add your business name, category, address, phone, hours, and photos, and encourage customers to leave reviews. This profile is what appears in Google Maps and the local search pack — and it is completely free.',
      },
      {
        heading: 'Target Keywords Your Customers Actually Use',
        body: 'Think about what your customers type into Google when they need what you sell. Use free tools like Google autocomplete or Ubersuggest to find these terms, then build pages that specifically target them. The more specific, the better.',
      },
      {
        heading: 'Each Page Should Target One Topic',
        body: 'Most business websites have everything crammed into one homepage with no dedicated service pages. Create a separate page for each service you offer. Each page should have a clear H1 heading with the keyword, 300+ words of relevant content, and a call to action.',
      },
      {
        heading: 'Write One Helpful Blog Post Per Month',
        body: "You do not need to publish daily. One well-researched blog post per month on a topic your customers search for — \"how to choose a [your service]\", \"signs you need [your product]\" — builds authority over time. After 12 months, you'll have 12 pages ranking for different keywords.",
      },
      {
        heading: 'Get Listed in Directories',
        body: 'Every listing of your business name, address, and phone number on a reputable directory is a signal to Google. Start with the big ones: Yelp, Yellow Pages, your local business directory, and any industry-specific directories. Consistency matters — use the exact same format everywhere.',
      },
    ],
  },
  {
    slug: 'landing-page-vs-website',
    title: 'Landing Page vs Website: What Does Your Business Actually Need?',
    excerpt: 'A landing page and a website serve very different purposes. Choosing the wrong one wastes money. Here is how to decide.',
    tag: 'Strategy',
    readTime: '4 min read',
    date: '2026-04-05',
    image: '/images/blog/landing-vs-website.jpg',
    sections: [
      {
        body: 'A "website" and a "landing page" are often confused — they serve very different purposes. Choosing the wrong one for your stage of business wastes money. Here is how to decide.',
      },
      {
        heading: 'What Is a Landing Page?',
        body: 'A landing page is a single page with one goal: get visitors to take one specific action — fill in a form, call a number, or make a purchase. There are no navigation links to other pages, no distractions — just a focused offer and a CTA. Used for campaigns, ads, and specific product promotions.',
      },
      {
        heading: 'What Is a Full Website?',
        body: 'A website is a multi-page presence — homepage, about, services, contact, blog. It is designed to be discovered via Google search, build trust over time, and serve multiple types of visitors at different stages of the buying journey. It works 24/7 as a permanent, searchable asset.',
      },
      {
        heading: 'When to Use a Landing Page',
        body: 'If you are launching a specific campaign, testing a new offer, or running paid ads to a single product, a landing page is the right tool. It converts better than a homepage because it is focused. Use it alongside your main website, not instead of it.',
      },
      {
        heading: 'When You Need a Full Website',
        body: 'If you want to show up in Google search, build long-term brand trust, and serve customers who are researching before they buy, you need a full website. This is especially true for service businesses — restaurants, consultants, local services — where customers want to browse before they contact you.',
      },
      {
        heading: 'The Bottom Line',
        body: 'For most businesses: you need a full website as your permanent foundation, and you can add landing pages on top for specific promotions. Starting with just a landing page limits your SEO potential and can make your business look less established. A proper website from $1,500 is the right first move.',
      },
    ],
  },
  {
    slug: '14-day-website-launch-how-motionbite-delivers',
    title: '14-Day Website Launch: How MotionBite Delivers Fast Without Cutting Corners',
    excerpt: '14 days sounds like a bold promise. Here is exactly how we do it, and why speed and quality are not mutually exclusive.',
    tag: 'Process',
    readTime: '4 min read',
    date: '2026-03-28',
    image: '/images/blog/14-day-launch.jpg',
    sections: [
      {
        body: '"14 days" sounds like a bold promise. Most agencies take 2–3 months for a similar project. Here is exactly how we do it, and why speed and quality are not mutually exclusive.',
      },
      {
        heading: 'The Problem With Long Timelines',
        body: 'Traditional agency timelines are padded with project management overhead, unnecessary internal review rounds, and clients chasing progress updates. The actual build time for a 5–10 page website — for an experienced team — is 5–7 days. Everything else is process waste.',
      },
      {
        heading: 'Day 1–2: Discovery and Design Direction',
        body: 'We start with a 30-minute call to understand your business, competitors, and goals. Within 48 hours we deliver a first design mockup — not a wireframe, not a mood board, an actual design in your real brand. You give feedback. We have direction.',
      },
      {
        heading: 'Day 3–10: Build With Daily Check-Ins',
        body: 'While you focus on running your business, we build. We work in public — you can see the live preview at any point. At the end of each day we send a short update. No disappearing acts. No "we will check in when it is done." You always know exactly what state the project is in.',
      },
      {
        heading: 'Day 11–13: Review and Revisions',
        body: 'Once the build is complete, we do a thorough review pass — testing every link, form, and animation across mobile, tablet, and desktop. Then we give you access for your review. Revisions are handled same-day when possible.',
      },
      {
        heading: 'Day 14: Launch',
        body: 'We deploy to Vercel\'s global CDN, connect your domain, verify SSL, submit to Google Search Console, and hand over access. From first call to live site: 14 days.',
      },
      {
        heading: 'Why This Works',
        body: 'Focus. We do not run 20 projects simultaneously. Each project gets the attention it deserves, which makes iteration fast and quality high. The 14-day model forces discipline on both sides — no scope creep, no endless approval loops. It works because it has to.',
      },
    ],
  },
  {
    slug: 'how-1500-website-made-shop-12000',
    title: 'How a $1,500 Website Made This Shop $12,000 in 90 Days',
    excerpt: 'A real story of a boutique shop that went from zero online presence to $12,000 in attributable revenue in 90 days.',
    tag: 'Case Study',
    readTime: '3 min read',
    date: '2026-03-15',
    image: '/images/blog/roi-case-study.jpg',
    sections: [
      {
        body: 'Numbers do not usually lie. But a website ROI story like this deserves context — so here is exactly what happened, what we built, and why it worked.',
      },
      {
        heading: 'The Business',
        body: 'Yashfeen Boutique is a fashion retail shop. Before working with MotionBite, they had no website — just an Instagram page and word-of-mouth. They had inventory to sell but no way for customers to find them online or browse products before visiting.',
      },
      {
        heading: 'What We Built',
        body: 'In 10 days, we built a Starter Site: a clean, mobile-first website with a product gallery, a "Visit Us" section with map and hours, an Instagram feed integration, and a WhatsApp contact button for instant inquiries. Simple. Focused. Fast.',
      },
      {
        heading: 'The Result',
        body: 'Within the first 90 days, the owner tracked 47 new customer inquiries that came directly through the website — people who found them via Google search. At an average order value of approximately $255, that is over $12,000 in attributable revenue from a $1,500 investment.',
      },
      {
        heading: 'Why It Worked',
        body: 'Three things: (1) Being indexed by Google meant customers searching the category could find them for the first time. (2) The product gallery gave visitors a reason to visit — they arrived knowing what they wanted. (3) The WhatsApp button removed friction — one tap to start a conversation.',
      },
      {
        heading: 'What This Means for You',
        body: "Not every business will see these exact numbers. But every business without an online presence is invisible to customers who are actively searching. The cost of not having a proper website is not zero — it is every customer who found your competitor instead.",
      },
    ],
  },
  {
    slug: 'what-makes-restaurant-website-work',
    title: 'What Makes a Restaurant Website Actually Work (With Examples)',
    excerpt: 'Most restaurant websites exist. Very few work. Here are the specific decisions that separate booking machines from digital brochures.',
    tag: 'Restaurant',
    readTime: '5 min read',
    date: '2026-03-05',
    image: '/images/blog/restaurant-website.jpg',
    sections: [
      {
        body: 'Most restaurant websites exist. Very few actually work. The difference between a website that drives bookings and one that just takes up hosting space comes down to a handful of specific design and content decisions.',
      },
      {
        heading: 'A Hero That Makes You Hungry',
        body: "The first thing a visitor sees should make them want to eat there. Not your logo, not your address — a full-width photo of your best dish with a reservation button front and centre. You have 3 seconds to make them stay. Use them.",
      },
      {
        heading: 'Menu Visibility and Format',
        body: "Your menu is the most-visited page on a restaurant website. It needs to be a real webpage — not a PDF, not an image. Text-based menus are searchable, accessible, and load instantly on mobile. Google can also index your menu items and show them in search results.",
      },
      {
        heading: 'One Clear Call to Action Per Page',
        body: "Every page should guide visitors toward one action: 'Book a Table,' 'Order Online,' or 'See Our Menu.' When a page has five competing CTAs, visitors do nothing. When there is one clear next step, conversions go up.",
      },
      {
        heading: 'Social Proof Where It Counts',
        body: "Testimonials, TripAdvisor ratings, or Google review screenshots placed near your booking button give undecided visitors the push they need. People trust other customers more than marketing. Show the reviews — especially on mobile where visitors are often making a same-day decision.",
      },
      {
        heading: 'Location and Hours Front and Centre',
        body: 'This sounds obvious, but many restaurant websites bury their address and opening hours. Your location and hours should be visible without scrolling on every page, or at minimum in the footer — formatted so Google Maps can auto-link the address.',
      },
    ],
  },
  {
    slug: '7-pages-every-small-business-needs',
    title: 'The 7 Pages Every Business Website Must Have',
    excerpt: 'A lot of business websites are missing pages customers expect to find. Without them, visitors leave confused — and confusion kills conversions.',
    tag: 'Web Design',
    readTime: '4 min read',
    date: '2026-02-20',
    image: '/images/blog/7-pages.jpg',
    sections: [
      {
        body: 'A lot of business websites are missing pages that customers expect to find. Without them, visitors leave confused — and confusion kills conversions. Here are the seven pages that should be on every business website.',
      },
      {
        heading: '1. Homepage',
        body: "Your homepage answers three questions instantly: who you are, what you do, and who it is for. It should have a clear headline, a brief description, your primary call-to-action, and a visual that establishes your brand. This is your first impression — it needs to be fast, clean, and focused.",
      },
      {
        heading: '2. Services or Products Page',
        body: "Visitors need to know exactly what you offer and what it costs. A vague 'we do everything' page loses trust. Specific service pages — each focused on one offering — rank better in Google and convert better with visitors.",
      },
      {
        heading: '3. About Page',
        body: "People buy from people. An about page that shows your face, explains why you started the business, and describes what you care about builds trust that no testimonial can replace. Short, human, and honest beats corporate copy every time.",
      },
      {
        heading: '4. Contact Page',
        body: "A contact page with a form, your email address, phone number, and a map. Make it easy to get in touch. Every additional step between 'I want to contact you' and 'I've contacted you' costs you inquiries.",
      },
      {
        heading: '5. Testimonials or Reviews',
        body: "Dedicated social proof. Include full quotes, client names, and their business or industry. If you have Google reviews, embed them. If you have before-and-after results, show them. This page is what visitors check when they are almost convinced but not quite.",
      },
      {
        heading: '6. Blog or Resources',
        body: "Not mandatory on day one, but essential for long-term SEO. One blog post per month targeting questions your customers ask gives Google new content to index and positions you as an authority. Start with the top 3 questions you get asked in person.",
      },
      {
        heading: '7. Privacy Policy and Terms',
        body: 'Often overlooked, always necessary. If you collect any data — even just an email from a contact form — you are legally required in most countries to have a privacy policy. It also signals professionalism. Takes 20 minutes to set up.',
      },
    ],
  },
  {
    slug: 'wix-vs-custom-website',
    title: 'Wix vs Custom Website: Which Is Right for Your Business?',
    excerpt: 'The honest answer is not always "go custom." But understanding the real limitations of website builders will help you decide.',
    tag: 'Strategy',
    readTime: '5 min read',
    date: '2026-02-10',
    image: '/images/blog/wix-vs-custom.jpg',
    sections: [
      {
        body: 'The honest answer is not "always go custom." Wix and other website builders serve a real purpose for certain businesses. But understanding their limitations will help you make the right decision for where your business is right now.',
      },
      {
        heading: 'What Wix Does Well',
        body: 'Wix is fast to set up, requires no technical knowledge, and works well for very simple use cases: event pages, personal portfolios, basic brochure sites with fewer than 5 pages. For a business that just needs a digital business card — phone number, location, a few photos — Wix is fine.',
      },
      {
        heading: 'Where Wix Falls Short',
        body: "Wix sites consistently score poorly on Google's Core Web Vitals — the performance metrics Google uses to rank websites. A slow site ranks lower in search results and loses visitors. You also have zero control over your code, meaning technical SEO has a hard ceiling. And you are renting space — if Wix changes its pricing or shuts down, your site goes with it.",
      },
      {
        heading: 'What a Custom Website Gives You',
        body: 'Built on Next.js, a custom site loads in under 1 second, scores 90+ on Lighthouse, and gives you full control over every element. The code is yours. The design is unique to your brand. SEO is built in from the ground up. You can add any feature you need.',
      },
      {
        heading: 'The Cost Comparison Over 3 Years',
        body: 'Wix: ~$20/month plan = $720 over 3 years, plus a designer setup fee of $500–$1,000. Total: ~$1,200. Custom site from MotionBite: $1,500 one-time, hosted on Vercel for ~$20/month = $720 in hosting. Total: ~$2,220. But the custom site ranks better, converts better, and is an asset you own. The ROI difference is typically 5–10x.',
      },
      {
        heading: 'The Verdict',
        body: 'If you have been trading for less than 6 months and are testing whether your business works: start with Wix. If you are established and want to grow online: invest in a custom website. The businesses that consistently win online own their digital infrastructure — they do not rent it.',
      },
    ],
  },
  {
    slug: 'how-to-write-perfect-homepage',
    title: 'How to Write the Perfect Homepage (Business Edition)',
    excerpt: 'Your homepage is your best salesperson — and most business homepages say everything except what customers need to hear.',
    tag: 'Copywriting',
    readTime: '4 min read',
    date: '2026-01-25',
    image: '/images/blog/homepage-copy.jpg',
    sections: [
      {
        body: "Your homepage is your best salesperson — and most business homepages say everything except what customers need to hear. Here is how to write copy that keeps visitors reading, builds trust, and converts them into enquiries.",
      },
      {
        heading: 'Lead With What You Do for Them',
        body: "The most common mistake: the headline is about you, not the customer. 'Welcome to Johnson's Plumbing' tells me nothing. 'Burst pipe? Fixed today, guaranteed' tells me everything. Your headline should answer: what problem do you solve, and who do you solve it for? Make it specific and fast.",
      },
      {
        heading: 'The Subheadline Earns the Next Click',
        body: "Your subheadline's job is to add one piece of crucial detail and keep the reader moving. It can expand on the headline, overcome an objection, or state your key differentiator. One sentence. One job.",
      },
      {
        heading: 'Structure the Page Like a Conversation',
        body: "Think about the questions your customer has as they scroll: 'What do they do? Is it for me? Can I trust them? What will it cost? How do I get started?' Your homepage should answer these questions in order, one section at a time. Each section earns the scroll to the next.",
      },
      {
        heading: 'Social Proof Early',
        body: "Don't put testimonials at the bottom where nobody reads them. Place one strong testimonial or a stat — '★★★★★ 50+ happy clients' — above the fold, right next to your headline or CTA. First-time visitors need trust signals before they'll do anything.",
      },
      {
        heading: 'One CTA, Consistently Placed',
        body: "Every section of your homepage should point toward the same action: 'Book a free call,' 'Get a quote,' 'View our work.' Using multiple different CTAs dilutes focus and reduces conversions. Pick one. Use it everywhere.",
      },
      {
        heading: 'Edit Until It Hurts',
        body: "The best homepage copy is not what you wrote first — it is what is left after you have cut everything that does not earn its place. Read every sentence and ask: does a first-time visitor need this? If not, delete it. Clarity converts. Length does not.",
      },
    ],
  },
]
