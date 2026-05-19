# MotionBite — Complete Website Build Plan
> **"We Build Websites That Mean Business"**
> A step-by-step Claude Code execution plan for a world-class agency website
> _Last updated: 2026-05-19 — All critical issues and improvements applied_

---

## 🧠 Research Summary

### What Awwwards Top Agency Sites Do
- Visual-first storytelling — design and animation explain before text does
- Horizontal/parallax scroll for immersive narrative flow
- Micro-interactions everywhere — cursor effects, hover states, magnetic buttons
- Bold typography (Oswald-style condensed fonts) as a design element
- Dark-mode first aesthetics with vibrant accent colors
- GSAP + Framer Motion for buttery smooth scroll and animations _(both required, not optional)_
- Minimal nav — max 5 items, transparent on scroll, solid on scroll-down

### What Converts (CRO Research)
- Users decide to stay or leave in 5 seconds — hero must answer: who, what, why you
- Problem → Solution → Proof → Action is the proven scroll rhythm
- Social proof (testimonials, logos, numbers) must appear before the fold break
- One primary CTA above the fold — never two competing CTAs
- "Get My Free Audit" converts 202% better than "Submit"
- Clear visual hierarchy generates 38% more conversions than cluttered designs
- Trust signals reduce exit rate — show them where doubt surfaces (after price/offer)

### Best Tech Stack for SEO + Speed
- **Next.js 15** (App Router) — best SEO framework, SSG/SSR, crawlable HTML
- **Framer Motion** — production-grade animations, scroll-triggered reveals, stagger effects
- **GSAP** — required for hero timeline animations, word-by-word stagger, complex sequences
- **Tailwind CSS** — utility-first, no unused CSS in production
- **next/image** — automatic WebP, lazy loading, Core Web Vitals
- **next-sitemap** — auto-generate sitemap.xml + robots.txt
- **Schema.org JSON-LD** — structured data for rich snippets
- **Vercel** — CDN edge deployment, fastest hosting for Next.js
- **Crisp** (free tier) — live chat to bridge time zone gap for international leads

---

## 🏗️ Site Architecture

```
motionbite.com/              → Homepage (main conversion page)
motionbite.com/services      → Services detail page
motionbite.com/portfolio     → Portfolio / case studies
motionbite.com/pricing       → Transparent pricing page (improves SEO + reduces friction)
motionbite.com/about         → Team + story
motionbite.com/blog          → SEO blog (long-term traffic)
motionbite.com/contact       → Contact + booking
motionbite.com/free-audit    → Landing page (high-intent CTA destination — full blueprint below)
```

---

## 📄 Homepage — Section-by-Section Blueprint

**The Psychology Flow:**
`AWARENESS → INTEREST → DESIRE → TRUST → ACTION`

---

### Section 1 — NAV (Sticky)
**Purpose:** Orientation + first trust signal

- Logo: MB monogram + "MotionBite" wordmark in Oswald
- Links: Services | Portfolio | Pricing | About | Blog
- CTA Button: "Get Free Audit" (green `#00C896`, high contrast)
- **Behavior:** Transparent on top → dark solid `#0A0F0D` + blur backdrop on scroll
- **Mobile:** Hamburger with full-screen overlay menu
- **Mobile sticky bar:** `position: fixed; bottom: 0` strip — "Get Free Audit →" button — persists on all mobile scroll positions (20 lines of CSS, highest-impact mobile conversion add)

---

### Section 2 — HERO
**Purpose:** Answer 3 questions in 5 seconds: Who are you? What do you do? Why should I care?

**Content:**
- Eyebrow tag: `"Web Design Agency for Small Businesses"`
- H1 (Oswald, 96px desktop): `"We Build Websites That Mean Business"`
- Subheadline: `"Small businesses and restaurants that need to win online — we build the site that makes it happen. Fast, sharp, and built to convert."`
- Primary CTA: `"Get Your Free Website Audit →"`
- Secondary: `"See Our Work ↓"`
- Trust bar below hero: `★★★★★ "50+ Websites Launched" | "14-Day Delivery" | "100% Satisfaction"`
- Floating badge: `"🟢 Currently accepting clients"`

**Design:**
- Dark background (`#0A0F0D`)
- GSAP timeline: staggered word-by-word reveal on load (H1 first, then subheadline, then CTAs)
- Subtle animated mesh/gradient in background (CSS only — no heavy lib)
- "Bite" in the headline = green (`#00C896`)
- **Note:** The hero copy and eyebrow tag must make it unmistakably clear this is a web agency — no ambiguity about motion graphics or video. "Web Design Agency" in the eyebrow resolves any brand name confusion immediately.

---

### Section 3 — PROBLEM (Story Hook)
**Purpose:** Make the visitor feel SEEN. If they feel understood, they trust you.

**Content:**
- Headline: `"Most Small Business Websites Don't Work. Here's Why."`
- 3 pain point cards:
  - 🔴 `"No website (or it looks like it's from 2010)"`
  - 🔴 `"Customers search for you online and find nothing"`
  - 🔴 `"Competitors with better sites are winning your customers"`
- Transition line: `"That's exactly why MotionBite exists."`

**Design:**
- Light section break (`#F4FAF7`) for contrast
- Cards with red problem indicators
- Smooth scroll-triggered fade-in (Framer Motion `useInView`)

---

### Section 4 — SOLUTION (What We Do)
**Purpose:** Position MotionBite as the obvious answer

**Content:**
- Headline: `"We Fix That. Here's How."`
- 3 service cards (flip on hover):
  - ⚡ **Starter Site** — "Your business, online in 10 days" — **From $1,500**
  - 🚀 **Growth Package** — "Built to rank, built to convert" — **From $3,500** ⭐ Most Popular
  - 🔥 **Premium Build** — "Custom web app or advanced site" — **From $6,000**
  - Each card: icon, name, 2-line description, price, `"Learn More →"`
- CTA below: `"Not sure which? Get a free consultation →"`
- Small note under pricing: `"See full breakdown →"` linking to `/pricing`

**Design:**
- Dark background returns (`#0A0F0D`)
- Cards with green glow hover effect (`rgba(0,200,150,0.25)`)
- "Most Popular" badge with pulse animation

**Pricing rationale:** These prices are competitive against US/EU agencies (who charge $5,000–$20,000+) while being premium enough to filter tire-kickers and signal quality to international clients.

---

### Section 5 — PROCESS (How It Works)
**Purpose:** Remove fear of the unknown. Clients hesitate because they don't know what happens next.

**Content:**
- Headline: `"From First Call to Live Site in 14 Days"`
- 4-step horizontal timeline:
  1. 📞 **Discovery Call** — "We learn your business in 30 min"
  2. 🎨 **Design Sprint** — "First mockup in 48 hours"
  3. 🔨 **Build & Review** — "You see everything, approve every step"
  4. 🚀 **Go Live** — "Launch day — your business is online"
- Sub-copy: `"No surprises. No disappearing acts. Just results."`
- **Video embed:** 60-second Loom-style "How it works" walkthrough (the single highest trust-building addition — record after launch and drop in here)

**Design:**
- Horizontal scroll on mobile
- GSAP-animated connecting line between steps (draw-on effect using `ScrollTrigger`)
- Steps animate in on scroll (staggered)

---

### Section 6 — PORTFOLIO (Social Proof via Work)
**Purpose:** Show, don't tell. Real work = real trust.

**Content:**
- Headline: `"Websites That Worked"`
- 3 featured case study cards:
  - Project name + industry
  - Before/after toggle
  - Result stat: `"3x more inquiries after launch"`
  - Tech stack used
  - `"View Case Study →"`
- CTA: `"See All Projects →"` → `/portfolio`

**Design:**
- Masonry/bento grid layout
- Image hover: slight zoom + green overlay with stats
- Lazy loaded via `next/image`

---

### Section 7 — TECH STACK (Credibility Signal)
**Purpose:** Builds credibility with technical buyers and signals modern capability

**Content:**
- Small eyebrow: `"Built with industry-standard tools"`
- Logo row (greyscale → color on hover): Next.js | React | Tailwind CSS | Vercel | Framer Motion | GSAP | Figma
- One-liner below: `"The same stack used by Vercel, Linear, and Loom."`

**Design:**
- Full-width band, subtle background
- Logos with grayscale filter, remove on hover
- Infinite marquee scroll on mobile

---

### Section 8 — NUMBERS (Trust via Data)
**Purpose:** Credibility at a glance

**Content (animated counter on scroll):**
- `50+` Websites Launched
- `14` Days Average Delivery
- `100%` Client Satisfaction
- `$0` Hidden Fees

**Design:**
- Full-width dark band
- Large Oswald numbers in green (`#00C896`)
- **Implementation:** Native `IntersectionObserver` + `requestAnimationFrame` counter — no CountUp.js dependency needed (15 lines of code, zero extra bundle weight)

---

### Section 9 — TESTIMONIALS (Social Proof via People)
**Purpose:** Humans trust humans. This is where decisions get made.

**Content:**
- Headline: `"What Our Clients Say"`
- 3 testimonial cards (carousel on mobile):
  - Client photo (or initials avatar)
  - Full quote (2–3 sentences)
  - Name, business type _(no city — international positioning)_
  - ★★★★★ rating

**Example testimonials (replace with real ones):**
> _"MotionBite built our restaurant website in 12 days. We went from zero online presence to getting 15 new reservations per week through the site."_ — **Ahmed R., Restaurant Owner**

> _"I was sceptical about the 14-day promise but they delivered. The site looks better than competitors who spent 3x more."_ — **Sarah L., Boutique Owner**

> _"The whole process was clear from day one. No chasing, no surprises, just a great result."_ — **Marcus T., Local Services Business**

**Design:**
- Cards with subtle border glow (`rgba(0,200,150,0.15)`)
- Auto-scroll carousel (pauses on hover)
- Green quote mark icon

---

### Section 10 — WHY US (Differentiation)
**Purpose:** Answer "Why MotionBite and not someone else?"

**Content:**
- Headline: `"Why Small Businesses Choose MotionBite"`
- 6 differentiators in a 2-column grid:
  - ⚡ **Fast Delivery** — "Live in 14 days, not 3 months"
  - 🎯 **Built to Convert** — "Every design decision drives action"
  - 📈 **SEO Ready** — "Google can find you from day one"
  - 💬 **Clear Communication** — "You're never left guessing"
  - 💰 **Transparent Pricing** — "What you see is what you pay"
  - 🔒 **Satisfaction Guaranteed** — "We don't stop until you love it"

**Design:**
- Icon + headline + 1-line description
- Alternating card layout
- Subtle check/tick animation on scroll-in (Framer Motion stagger)

---

### Section 11 — BLOG PREVIEW (SEO + Authority)
**Purpose:** Builds trust AND feeds Google with indexed content

**Content:**
- Headline: `"Web Tips for Small Business Owners"`
- 3 latest blog post cards (dynamic, pulled from `/blog`)
- `"Read All Articles →"` → `/blog`

**Design:**
- Clean card grid
- Tag + read time + date
- Image with green overlay on hover

---

### Section 12 — FAQ
**Purpose:** Kill remaining doubt before the final CTA. The user who scrolls this far is considering — answer their last objections here.

**Content:**
- Headline: `"Questions We Get Asked a Lot"`
- 6 accordion items:
  1. **"How does the 14-day delivery actually work?"** — "Day 1: discovery call. Day 2–3: design mockup. Day 4–10: build with daily check-ins. Day 11–13: review and revisions. Day 14: live."
  2. **"What if I don't like the design?"** — "You approve every stage before we move forward. We iterate until you're happy — that's the satisfaction guarantee."
  3. **"Do I need to provide anything?"** — "Just your logo (or we design one), brand colors if you have them, and your content. We guide you through the rest."
  4. **"Do you offer maintenance after launch?"** — "Yes — optional monthly care plans cover hosting support, updates, and small content changes."
  5. **"How much does a website really cost?"** — "Our packages start at $1,500 for a Starter Site. Full pricing is on our [Pricing page](/pricing). No hidden fees."
  6. **"Can I see examples of your work?"** — "Yes — full case studies are on our [Portfolio page](/portfolio)."

**Design:**
- Smooth accordion expand/collapse (Framer Motion `AnimatePresence`)
- Schema.org `FAQPage` JSON-LD markup (boosts Google rich snippets)
- Subtle green left border on open item

---

### Section 13 — CTA BANNER (Final Push)
**Purpose:** Last chance to convert before footer. High intent visitors who scrolled this far are ready.

**Content:**
- Headline: `"Ready to Get Found Online?"`
- Sub: `"Join 50+ small businesses that chose MotionBite to build their online presence."`
- CTA: `"Get My Free Website Audit →"` (large, green button)
- Risk reversal: `"Free. No commitment. 30-minute call."`

**Design:**
- Full-width green-to-dark gradient section
- Button: white on green (`#00C896`), large, with arrow
- Subtle floating particles or animated grid background

**Exit-intent popup:** When the user's cursor moves toward the browser close/back button, trigger a modal: `"Wait — before you go. Get a free 30-minute website audit. No strings attached."` with the same form as `/free-audit`. Recovers 5–15% of exits.

---

### Section 14 — FOOTER
**Content:**
- Logo + tagline
- Links: Services | Portfolio | Pricing | About | Blog | Contact
- Contact: hello@motionbite.com
- Social: LinkedIn | Instagram
- **Location: © 2026 MotionBite. All rights reserved.** _(location appears here only, if needed)_
- Legal: Privacy Policy | Terms

---

## 📄 `/free-audit` Page — Full Blueprint

**Purpose:** Highest-intent landing page. Every CTA on the site points here. Must convert at 20%+.

**URL:** `motionbite.com/free-audit`
**No nav links** — isolated landing page (remove distractions)

### free-audit Section 1 — Hero
- Eyebrow: `"Free 30-Minute Website Audit"`
- H1: `"Find Out Exactly Why Your Website Isn't Converting"`
- Sub: `"We'll review your site (or your competitors') and tell you specifically what's costing you customers — for free, no pitch, no obligation."`
- Form (right side or below on mobile):
  - Name
  - Email
  - Website URL (or "I don't have one yet")
  - Biggest challenge (dropdown: No website / Low traffic / Poor conversions / Other)
  - CTA button: `"Book My Free Audit →"`
- Trust signals next to form: `★★★★★ 50+ audits delivered | No spam | Reply within 24 hours`

### free-audit Section 2 — What You Get
- 3 cards:
  - 🔍 **Speed & Performance Check** — "See your real Core Web Vitals score"
  - 📈 **SEO Gap Analysis** — "Why Google can't find you"
  - 🎯 **Conversion Review** — "What's stopping visitors from contacting you"

### free-audit Section 3 — What Happens Next
- 3-step mini timeline:
  1. Submit the form
  2. We review your site within 24 hours
  3. You get a recorded video walkthrough + written report — free

### free-audit Section 4 — Testimonial (1, short)
- One strong quote specifically about the audit or the process

### free-audit Section 5 — FAQ (3 items)
- "Is this really free?" — Yes, always.
- "Will you try to sell me something?" — We'll share what we found. If you want help fixing it, that's a separate conversation.
- "What if I don't have a website yet?" — Even better — we'll audit your competitors and show you what to beat.

---

## 🔍 SEO Implementation Plan

### On-Page SEO (Per Page)

| Tag | Value |
|-----|-------|
| Title | `Web Design for Small Businesses \| MotionBite` |
| Meta Description | `MotionBite builds fast, professional websites for small businesses and restaurants. Delivered in 14 days. Get your free audit today.` |
| H1 | One per page, includes primary keyword |
| H2/H3 | Supporting keywords in subheadings |
| Alt Text | All images descriptive (e.g. `"restaurant website designed by MotionBite"`) |
| URL | `/web-design-small-business` (clean, keyword-rich) |
| Canonical | Set on every page |

### Technical SEO Checklist
- ✅ Next.js App Router (SSG for static pages)
- ✅ `next/image` for all images (WebP auto, lazy load)
- ✅ `next-sitemap` → `sitemap.xml` + `robots.txt` (add `postbuild` script in `package.json`)
- ✅ Schema.org JSON-LD: `LocalBusiness`, `Service`, `FAQPage` (FAQ section)
- ✅ Open Graph + Twitter Card meta tags
- ✅ HTTPS (Vercel default)
- ✅ Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- ✅ Mobile-first responsive design
- ✅ Internal linking (every page linked from nav/footer)
- ✅ Blog for long-tail keywords
- ✅ Google Search Console setup post-launch
- ✅ Google Analytics 4 setup
- ✅ `@vercel/analytics` for real-time edge metrics

### Target Keywords

**Primary:**
- `web design for small businesses`
- `website builder for restaurants`
- `affordable web development agency`

**Secondary:**
- `professional website for local business`
- `web agency for restaurants`
- `small business website design`
- `custom website for small business`
- `web design agency for food businesses`

**Long-tail (international — no "near me"):**
- `how much does a small business website cost`
- `fast website design 14 days`
- `affordable restaurant website design`
- `web design agency for food businesses`
- `best web agency for small business owners`

### Blog Content Plan (12 posts at launch — minimum for domain traction)

**Pillar posts (long, 2,000+ words):**
1. `"How Much Does a Small Business Website Cost? (Honest 2026 Guide)"`
2. `"Restaurant Website Design: Complete Guide for 2026"`
3. `"Small Business SEO: How to Get Found on Google Without Paying for Ads"`

**Cluster posts (supporting, 800–1,200 words):**
4. `"5 Signs Your Small Business Needs a New Website"`
5. `"Why Your Business Isn't Showing Up on Google (And How to Fix It)"`
6. `"Landing Page vs Website: What Does Your Business Actually Need?"`
7. `"14-Day Website Launch: How MotionBite Delivers Fast Without Cutting Corners"`
8. `"How a $1,500 Website Made This Shop $12,000 in 90 Days"`
9. `"What Makes a Restaurant Website Actually Work (With Examples)"`
10. `"The 7 Pages Every Small Business Website Must Have"`
11. `"Wix vs Custom Website: Which Is Right for Your Business?"`
12. `"How to Write the Perfect Homepage (Small Business Edition)"`

---

## 🎨 Design System

### Complete Brand Tokens (`tailwind.config.js`)

```js
colors: {
  green: {
    primary: '#00C896',
    deep:    '#00A878',
    light:   '#B8FFE8',
    glow:    'rgba(0,200,150,0.25)',
  },
  dark: {
    base:    '#0A0F0D',
    card:    '#111813',
    border:  'rgba(0,200,150,0.15)',
  },
  light: {
    bg:      '#F4FAF7',
    card:    '#FFFFFF',
  },
  // Text scale
  text: {
    primary:  '#F0F5F2',   // Main body text on dark bg
    muted:    '#8A9E94',   // Secondary / caption text
    inverse:  '#0A0F0D',   // Text on light sections
  },
  // Form states
  state: {
    error:   '#E05252',    // Input validation error
    success: '#00C896',    // Form success (reuse green.primary)
    warning: '#F0A500',    // Warning states
  },
},

borderRadius: {
  sm:   '4px',
  md:   '8px',
  lg:   '16px',
  xl:   '24px',
  full: '9999px',
},

fontFamily: {
  heading: ['Oswald', 'sans-serif'],
  body:    ['DM Sans', 'sans-serif'],
},
```

### Font Loading (`app/layout.tsx`)
Use `next/font/google` — local hosting, no DNS lookup, no layout shift:
```ts
import { Oswald, DM_Sans } from 'next/font/google'

const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
```

### Animation Library
- **GSAP** — hero timeline, word-by-word text stagger, connecting line draw animation, complex scroll sequences (required)
- **Framer Motion** — page transitions, scroll-triggered reveals, accordion, stagger grids, exit-intent modal
- **CSS only** — background gradients, button hovers, card glows, mobile sticky bar (keep JS bundle small)
- **No CountUp.js** — native `IntersectionObserver` + `requestAnimationFrame` for number counters

---

## ⚡ Performance Plan

### Core Web Vitals Targets
| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Lighthouse Score | 90+ all categories |

### Speed Techniques
- ✅ SSG (Static Site Generation) for all pages
- ✅ `next/image` — WebP, responsive sizes, `priority` on hero image
- ✅ `next/font` — local font hosting (no Google Fonts DNS lookup)
- ✅ Dynamic imports for heavy components (GSAP animations, modals, exit-intent)
- ✅ Tailwind CSS purge (zero unused CSS in production)
- ✅ Vercel CDN edge caching
- ✅ No jQuery, no Bootstrap, no CountUp.js
- ✅ Defer non-critical JS (Crisp chat, analytics)
- ✅ Preconnect to critical origins

---

## 📁 Folder Structure

```
motionbite/
├── app/
│   ├── layout.tsx               ← Root layout, fonts, metadata, Crisp chat
│   ├── page.tsx                 ← Homepage
│   ├── services/page.tsx
│   ├── portfolio/page.tsx
│   ├── pricing/page.tsx         ← Transparent pricing page
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx             ← Blog index
│   │   └── [slug]/page.tsx      ← Individual posts
│   ├── contact/page.tsx
│   └── free-audit/page.tsx      ← High-intent landing page (no nav)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           ← Includes mobile sticky CTA bar
│   │   └── Footer.tsx
│   ├── sections/                ← One file per homepage section
│   │   ├── Hero.tsx
│   │   ├── Problem.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Portfolio.tsx
│   │   ├── TechStack.tsx        ← Tech logos row
│   │   ├── Numbers.tsx          ← Native counter, no CountUp.js
│   │   ├── Testimonials.tsx
│   │   ├── WhyUs.tsx
│   │   ├── BlogPreview.tsx
│   │   ├── FAQ.tsx              ← Accordion + FAQPage JSON-LD
│   │   └── CTABanner.tsx
│   └── ui/                      ← Reusable atoms
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── AnimatedText.tsx
│       ├── Accordion.tsx        ← For FAQ section
│       └── ExitIntentModal.tsx  ← Exit popup (lazy-loaded)
│
├── hooks/                       ← Custom React hooks
│   ├── useScrollProgress.ts
│   ├── useInView.ts
│   ├── useCounter.ts            ← Replaces CountUp.js
│   └── useExitIntent.ts         ← Detects cursor moving to close button
│
├── data/                        ← Static content (easy to update)
│   ├── services.ts
│   ├── testimonials.ts
│   ├── portfolio.ts
│   ├── faq.ts
│   └── blog-posts.ts
│
├── lib/
│   ├── seo.ts                   ← Shared metadata helpers
│   └── schema.ts                ← JSON-LD structured data
│
├── public/
│   ├── images/
│   ├── og-image.png             ← Social share image (1200×630)
│   └── favicon.ico
│
├── styles/
│   └── globals.css
│
├── next.config.js
├── tailwind.config.js
└── next-sitemap.config.js       ← Add postbuild script in package.json
```

---

## 📄 `/pricing` Page — Blueprint

**Purpose:** Dedicated page for transparent pricing. Improves SEO (people search "web design cost"), reduces friction, filters tire-kickers.

### pricing Section 1 — Header
- H1: `"Simple, Transparent Pricing"`
- Sub: `"No hourly rates. No surprise invoices. Pick your package."`

### pricing Section 2 — Pricing Table
3 cards side by side (same as homepage but expanded):

**Starter Site — From $1,500**
- Up to 5 pages
- Mobile responsive
- Basic SEO setup
- Contact form
- Delivered in 10 days
- 1 round of revisions
- CTA: `"Get Started →"`

**Growth Package — From $3,500** ⭐ Most Popular
- Up to 10 pages
- Advanced SEO + blog setup
- Performance optimized (90+ Lighthouse)
- Analytics integration
- Delivered in 14 days
- 2 rounds of revisions
- CTA: `"Get Started →"`

**Premium Build — From $6,000**
- Unlimited pages
- Custom features / web app functionality
- E-commerce integration (if needed)
- Full SEO strategy
- Priority delivery
- Unlimited revisions
- CTA: `"Let's Talk →"`

### pricing Section 3 — FAQ (3 pricing-specific items)
- "Are these one-time fees or monthly?" — One-time. Optional monthly care plan available.
- "What's included in the care plan?" — Hosting support, security updates, small content changes.
- "Can I upgrade my package later?" — Yes, always.

### pricing Section 4 — CTA
- `"Not sure which fits? Get a free consultation →"` → `/free-audit`

---

## 🔧 Quick Wins Checklist

| Feature | Where | Impact | Effort |
|---------|-------|--------|--------|
| Mobile sticky CTA bar | `Navbar.tsx` | High | Low |
| Exit-intent popup | `ExitIntentModal.tsx` (lazy) | +5–15% lead recovery | Low |
| Tech stack logos row | `TechStack.tsx` | Trust signal | Low |
| Crisp live chat (free) | `layout.tsx` (deferred) | Async international leads | Low |
| FAQ section + JSON-LD | `FAQ.tsx` | SEO rich snippets | Low |
| `/pricing` page | `app/pricing/page.tsx` | SEO + conversion | Medium |
| 60-sec "How it works" video | `Process.tsx` | Highest trust builder | Medium (record post-launch) |
| 12 blog posts at launch | `/blog` | Domain crawl traction | High effort, high return |
