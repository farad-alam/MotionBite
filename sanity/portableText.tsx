'use client'

import { PortableText as SanityPortableText, PortableTextComponents } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from './image'
import { SanityBlock } from './queries'

// Converts heading text to a URL-safe anchor id
function slugify(text: unknown): string {
  if (!text) return ''
  const str = Array.isArray(text)
    ? text.map((t) => (typeof t === 'string' ? t : (t as { text?: string })?.text ?? '')).join('')
    : String(text)
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={slugify((value?.children as { text?: string }[] | undefined)?.map((c) => c?.text))}
        className="font-heading text-2xl md:text-3xl font-bold text-text-primary mt-12 mb-4 leading-snug scroll-mt-28"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={slugify((value?.children as { text?: string }[] | undefined)?.map((c) => c?.text))}
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
      <blockquote className="border-l-2 border-purple-primary/50 pl-5 my-8 italic font-body text-text-muted text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="font-body text-text-muted list-disc list-inside space-y-2 mb-6 ml-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="font-body text-text-muted list-decimal list-inside space-y-2 mb-6 ml-2">
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

interface PortableTextProps {
  value: SanityBlock[]
}

export function PortableText({ value }: PortableTextProps) {
  return <SanityPortableText value={value} components={components} />
}
