'use client'

import Link from 'next/link'
import { createContext, useContext, type CSSProperties, type MouseEventHandler, type ReactNode } from 'react'

// WP5.3: the site's primary call to action, set in Studio (siteSettings
// primaryCtaHref / primaryCtaLabel) and filled into this provider by each root layout.
//
// href always comes from here (fallback /free-consultation). label is null while
// Studio has no label, and then every button keeps its own current wording, so
// shipping this changes nothing visible. Setting the Studio label (planned for
// 2 Dec 2026) switches every button to that label at once.
export type PrimaryCtaValue = { href: string; label: string | null }

const PrimaryCtaContext = createContext<PrimaryCtaValue>({ href: '/free-consultation', label: null })

export function PrimaryCtaProvider({ value, children }: { value: PrimaryCtaValue; children: ReactNode }) {
  return <PrimaryCtaContext.Provider value={value}>{children}</PrimaryCtaContext.Provider>
}

export function usePrimaryCta(): PrimaryCtaValue {
  return useContext(PrimaryCtaContext)
}

export function PrimaryCtaLink({
  defaultLabel,
  after,
  className,
  style,
  onClick,
}: {
  /** Wording used while Studio has no primaryCtaLabel (today's text). */
  defaultLabel: string
  /** Decoration kept after the label, e.g. " →". */
  after?: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLAnchorElement>
}) {
  const cta = usePrimaryCta()
  return (
    <Link href={cta.href} className={className} style={style} onClick={onClick}>
      {cta.label ?? defaultLabel}
      {after}
    </Link>
  )
}
