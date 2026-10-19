'use client'

import { PortableText as SanityPortableText, PortableTextComponents } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from './image'
import { SanityBlock } from './queries'
import { useMemo } from 'react'
import { headingIds } from '@/lib/slugify'

// Anchor ids come from headingIds() (lib/slugify.ts), shared with the table of
// contents, so Arabic headings get non-empty ids and repeats get -2, -3.
function buildComponents(ids: Map<string, string>): PortableTextComponents {
  const idFor = (value: { _key?: string } | undefined) => (value?._key ? ids.get(value._key) : undefined)
  return {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={idFor(value)}
        className="font-heading text-2xl md:text-3xl font-bold text-text-primary mt-12 mb-4 leading-snug scroll-mt-28"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={idFor(value)}
        className="font-heading text-xl md:text-2xl font-bold text-text-primary mt-10 mb-3 leading-snug scroll-mt-28"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-lg font-bold text-text-primary mt-8 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="font-body text-text-muted leading-relaxed text-base mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-s-2 border-purple-primary/50 ps-5 my-8 italic font-body text-text-muted text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="font-body text-text-muted list-disc list-inside space-y-2 mb-6 ms-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="font-body text-text-muted list-decimal list-inside space-y-2 mb-6 ms-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-purple-primary hover:underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    table: ({ value }) => {
      const rows = ((value?.rows ?? []) as { _key?: string; cells?: string[] }[]).filter(
        (r) => Array.isArray(r?.cells)
      )
      if (rows.length === 0) return null
      const hasHeader = Boolean(value?.hasHeader)
      const header = hasHeader ? rows[0] : null
      const bodyRows = hasHeader ? rows.slice(1) : rows
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse font-body text-sm text-text-muted text-start">
            {header && (
              <thead>
                <tr className="border-b border-dark-border">
                  {header.cells!.map((cell, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-4 py-3 text-start font-semibold text-text-primary whitespace-nowrap"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={row._key ?? ri} className="border-b border-dark-border/60">
                  {row.cells!.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-start align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-dark-border">
            <Image
              src={urlFor(value).width(900).format('webp').url()}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="font-body text-text-muted text-xs text-center mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}
}

interface PortableTextProps {
  value: SanityBlock[]
}

export function PortableText({ value }: PortableTextProps) {
  const components = useMemo(() => buildComponents(headingIds(value)), [value])
  return <SanityPortableText value={value} components={components} />
}
