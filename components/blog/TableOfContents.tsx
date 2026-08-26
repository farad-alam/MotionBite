'use client'

import { useEffect, useState } from 'react'
import { SanityBlock } from '@/sanity/queries'

interface TocItem {
  id: string
  text: string
  level: 'h2' | 'h3'
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function extractHeadings(body: SanityBlock[]): TocItem[] {
  return body
    .filter((b) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map((b) => {
      const children = (b.children as { text?: string }[] | undefined) ?? []
      const text = children.map((c) => c?.text ?? '').join('')
      return { id: slugify(text), text, level: b.style as 'h2' | 'h3' }
    })
    .filter((item) => item.text.length > 0)
}

interface TableOfContentsProps {
  body: SanityBlock[]
}

export default function TableOfContents({ body }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
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
      <aside className="hidden xl:block w-56 shrink-0">
        <div className="sticky top-28">
          <p className="font-heading text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
            On this page
          </p>
          <nav aria-label="Table of contents">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setActiveId(item.id)}
                    className={`block font-body text-xs leading-snug py-1 border-l-2 transition-all duration-150 ${
                      item.level === 'h3' ? 'pl-4' : 'pl-3'
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

      {/* ── Mobile collapsible TOC ── */}
      <div className="xl:hidden mb-8 bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 font-heading text-sm font-semibold text-text-primary"
          aria-expanded={isOpen}
        >
          <span>Contents</span>
          <span
            className={`text-purple-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            ▾
          </span>
        </button>
        {isOpen && (
          <nav
            aria-label="Table of contents"
            className="px-5 pb-4 border-t border-dark-border"
          >
            <ul className="mt-3 space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block font-body text-sm text-text-muted hover:text-purple-primary transition-colors ${
                      item.level === 'h3' ? 'pl-4' : 'pl-0'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  )
}
