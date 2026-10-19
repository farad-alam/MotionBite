import Link from 'next/link'
import Image from 'next/image'
import { siteData } from '@/data/site'
import { t } from '@/lib/i18n'

// Arabic footer (WP3 5.2): logical utilities only. Links come from
// siteSettings.footerAr. Phone and email read left to right inside <bdi dir="ltr">.

type NavLink = { label: string; href: string }

const strings = t('ar')

const socials = [
  { href: siteData.socials.facebook, label: 'Facebook' },
  { href: siteData.socials.twitter, label: 'X' },
  { href: siteData.socials.linkedin, label: 'LinkedIn' },
  { href: siteData.socials.youtube, label: 'YouTube' },
]

export default function FooterAr({ links }: { links: NavLink[] }) {
  return (
    <footer className="bg-dark-base pt-16 md:pt-24 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 border-t border-dark-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-8 text-start">
            <Link href="/ar" className="inline-flex items-center gap-3 mb-6" aria-label="MotionBite">
              <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center overflow-hidden p-1 shrink-0">
                <Image src="/logo.jpg" alt="" width={96} height={96} className="w-full h-full object-contain" />
              </span>
              <bdi dir="ltr" className="font-heading text-2xl font-bold text-text-primary">
                Motion<span className="text-purple-primary">Bite</span>
              </bdi>
            </Link>
            <ul className="space-y-2 font-body text-sm text-text-muted">
              <li>
                <a href={`tel:${siteData.contact.phone}`} className="hover:text-text-primary">
                  <bdi dir="ltr">{siteData.contact.phone}</bdi>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteData.contact.email}`} className="hover:text-text-primary">
                  <bdi dir="ltr">{siteData.contact.email}</bdi>
                </a>
              </li>
            </ul>
          </div>

          <nav className="bg-dark-card border border-dark-border rounded-3xl p-8 text-start">
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-muted hover:text-purple-primary text-base font-heading font-semibold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/" hrefLang="en" lang="en" className="text-text-muted hover:text-purple-primary text-base font-heading font-semibold transition-colors">
                  English
                </Link>
              </li>
            </ul>
          </nav>

          <div className="bg-dark-card border border-dark-border rounded-3xl p-8 text-start">
            <ul className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-dark-border rounded-xl px-4 py-2 text-sm font-body text-text-muted hover:text-purple-primary hover:border-purple-primary"
                  >
                    <bdi dir="ltr">{s.label}</bdi>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs font-body text-text-muted text-center border-t border-dark-border/50 pt-8">
          © <bdi dir="ltr">{new Date().getFullYear()} MotionBite</bdi>. {strings.allRightsReserved}
        </p>
      </div>
    </footer>
  )
}
