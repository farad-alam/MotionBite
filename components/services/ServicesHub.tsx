import Link from 'next/link'
import { SERVICES_HUB_GROUPS, landingPath, type ServicesHubItem } from '@/lib/landing'

const BASE = 'https://www.motionbite.com'

type Group = { key: string; title: string; pages: ServicesHubItem[] }

// Pages whose hubGroup is unset or unknown still get listed, in a last group,
// so a published services page never goes missing from the hub.
export function groupServicesHubPages(pages: ServicesHubItem[]): Group[] {
  const known = new Set<string>(SERVICES_HUB_GROUPS.map((g) => g.value))
  const groups: Group[] = SERVICES_HUB_GROUPS.map((g) => ({
    key: g.value,
    title: g.title,
    pages: pages.filter((p) => p.hubGroup === g.value),
  }))
  groups.push({ key: 'other', title: 'More services', pages: pages.filter((p) => !p.hubGroup || !known.has(p.hubGroup)) })
  return groups.filter((g) => g.pages.length > 0)
}

export function servicesHubItemListSchema(groups: Group[]) {
  const ordered = groups.flatMap((g) => g.pages)
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MotionBite Services by Industry and Topic',
    url: `${BASE}/services`,
    itemListElement: ordered.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${BASE}${landingPath('services', p.slug)}`,
    })),
  }
}

/** WP6.2 "Services by industry and topic". Renders nothing when no page is published. */
export default function ServicesHub({ groups }: { groups: Group[] }) {
  if (groups.length === 0) return null
  return (
    <section id="services-by-industry-and-topic" className="section-padding px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesHubItemListSchema(groups)) }}
      />
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Services by industry and topic
        </h2>
        <div className="space-y-12">
          {groups.map((g) => (
            <div key={g.key}>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-5">{g.title}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {g.pages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={landingPath('services', p.slug)}
                      className="block h-full bg-dark-card rounded-xl p-6 glow-border hover:border-purple-primary/30 transition-all duration-200"
                    >
                      <p className="font-heading font-semibold text-text-primary mb-2">{p.title}</p>
                      {p.metaDescription && (
                        <p className="font-body text-text-muted text-sm leading-relaxed">{p.metaDescription}</p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
