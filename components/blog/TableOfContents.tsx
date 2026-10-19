'use client'

import { useEffect, useRef, useState } from 'react'
import type { SanityBlock } from '@/sanity/queries'
import { headingIds, headingKey, headingText } from '@/lib/slugify'
import { t, type Locale } from '@/lib/i18n'

interface TocItem {
  id: string
  text: string
  level: 'h2' | 'h3'
}

function extractHeadings(body: SanityBlock[]): TocItem[] {
  const ids = headingIds(body)
  return body
    .map((b, i) => ({ b, key: headingKey(b, i) }))
    .filter(({ b }) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map(({ b, key }) => {
      const text = headingText(b)
      return { id: ids.get(key) ?? '', text, level: b.style as 'h2' | 'h3' }
    })
    .filter((item) => item.text.length > 0 && item.id.length > 0)
}

interface TableOfContentsProps {
  body: SanityBlock[]
  variant?: 'desktop' | 'mobile'
  locale?: Locale
}

export default function TableOfContents({ body, variant, locale = 'en' }: TableOfContentsProps) {
  const strings = t(locale)
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const items = extractHeadings(body)

  // Highlight the currently visible heading
  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <>
      {/* ── Desktop sticky sidebar TOC ── */}
      {(!variant || variant === 'desktop') && (
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-28">
            <p className="font-heading text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
              {strings.onThisPage}
            </p>
            <nav aria-label={strings.tableOfContents}>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setActiveId(item.id)}
                      className={`block font-body text-xs leading-snug py-1 border-s-2 transition-all duration-150 ${
                        item.level === 'h3' ? 'ps-4' : 'ps-3'
                      } ${
                        activeId === item.id
                          ? 'border-purple-primary text-purple-primary'
                          : 'border-dark-border text-text-muted hover:text-text-primary hover:border-purple-primary/40'
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      )}

      {/* ── Mobile collapsible TOC (shown inside article column on non-xl) ── */}
      {(!variant || variant === 'mobile') && (
        <div className="xl:hidden mb-8 bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4 font-heading text-sm font-semibold text-text-primary"
            aria-expanded={isOpen}
            aria-controls="mobile-toc-nav"
          >
            <span className="flex items-center gap-2">
              {/* List icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              {strings.contents}
            </span>
            <span
              className={`text-purple-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

          {/* Animated expand/collapse */}
          <div
            id="mobile-toc-nav"
            ref={navRef}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav
              aria-label={strings.tableOfContents}
              className="px-5 pb-4 border-t border-dark-border"
            >
              <ul className="mt-3 space-y-0.5">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center font-body text-sm text-text-muted hover:text-purple-primary transition-colors py-2.5 border-s-2 ${
                        item.level === 'h3' ? 'ps-5 border-dark-border/40' : 'ps-3 border-dark-border'
                      } ${activeId === item.id ? 'text-purple-primary border-purple-primary' : ''}`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
