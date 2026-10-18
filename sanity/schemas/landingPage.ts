import { defineType, defineField } from 'sanity'
import { portableTextBodyMembers } from './portableTextBody'
import {
  HREFLANG_OPTIONS,
  LANDING_SECTIONS,
  isUniqueInSection,
  warnIfFuture,
} from '../lib/validation'

const isArabic = ({ document }: { document?: Record<string, unknown> }) =>
  document?.language !== 'ar'

export const landingPageSchema = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  groups: [
    { name: 'content', title: '📌 Content', default: true },
    { name: 'seo', title: '🔍 SEO' },
    { name: 'links', title: '🔗 Links & Proof' },
    { name: 'language', title: '🌐 Language' },
  ],
  fields: [
    // ── Content ────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title (H1)',
      type: 'string',
      group: 'content',
      description: 'Rendered as the page H1.',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      group: 'content',
      description: 'Decides the URL: /<section>/<slug>. Arabic pages use section "ar".',
      options: { list: LANDING_SECTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hubGroup',
      title: 'Services hub group',
      type: 'string',
      group: 'content',
      description: 'Used only for pages in the Services section: where the page is listed on /services.',
      options: {
        list: [
          { title: 'Industry', value: 'industry' },
          { title: 'Development', value: 'development' },
          { title: 'SEO & marketing', value: 'seo-marketing' },
        ],
      },
      hidden: ({ document }) => document?.section !== 'services',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96, isUnique: isUniqueInSection },
      description: 'Unique within its section.',
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const current = value?.current
          if (current && context.document?.section === 'ar' && (current === 'blog' || current === 'home')) {
            return current === 'blog'
              ? 'The slug "blog" is reserved: /ar/blog is a separate route.'
              : 'The slug "home" is reserved for the /ar home page and cannot be used here.'
          }
          return true
        }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
      description: 'Display and sort date. It is not a publishing switch: the page goes live when you press Publish.',
      validation: (rule) => [rule.required(), warnIfFuture(rule)],
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated At',
      type: 'datetime',
      group: 'content',
      description: 'Shown as "Updated" and used as the sitemap lastmod.',
    }),
    defineField({
      name: 'parent',
      title: 'Parent page',
      type: 'reference',
      group: 'content',
      to: [{ type: 'landingPage' }],
      description: 'Drives the breadcrumb and the "Part of" link.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: portableTextBodyMembers,
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Section',
      type: 'array',
      group: 'content',
      description: 'Renders an FAQ section and FAQPage JSON-LD.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: { title: 'question' },
            prepare: (value: Record<string, unknown>) => ({ title: value.title as string }),
          },
        },
      ],
    }),
    // ── SEO ────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Optional. Falls back to Title. The "| MotionBite" suffix is added automatically.',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image (Open Graph)',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      description: 'Falls back to the Global Settings Open Graph image.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'schemaType',
      title: 'Schema.org type',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          { title: 'Service', value: 'Service' },
          { title: 'WebPage', value: 'WebPage' },
          { title: 'CollectionPage', value: 'CollectionPage' },
          { title: 'Report', value: 'Report' },
        ],
      },
      initialValue: 'WebPage',
    }),
    defineField({
      name: 'areaServed',
      title: 'Area served',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'For local pages, e.g. Dubai, United Arab Emirates. Output as Service.areaServed.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (optional override)',
      type: 'url',
      group: 'seo',
      description: 'Default is a self-referencing canonical.',
    }),
    defineField({
      name: 'noindex',
      title: 'noindex',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
      description: 'Tell search engines not to index this page (previews).',
    }),
    // ── Links & proof ──────────────────────────────────────
    defineField({
      name: 'relatedCaseStudies',
      title: 'Case studies to feature',
      type: 'array',
      group: 'links',
      of: [{ type: 'reference', to: [{ type: 'portfolioProject' }] }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'relatedLinks',
      title: 'Related links',
      type: 'array',
      group: 'links',
      validation: (rule) => rule.max(8),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'href',
              title: 'Path',
              type: 'string',
              description: 'Internal path starting with /, e.g. /pricing',
              validation: (rule) =>
                rule.required().custom((value) =>
                  typeof value === 'string' && value.startsWith('/') ? true : 'Must start with /'
                ),
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'links',
      to: [{ type: 'author' }],
      description: 'Shows the author box when set.',
    }),
    // ── Language ───────────────────────────────────────────
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'language',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Arabic (العربية)', value: 'ar' },
        ],
        layout: 'radio',
      },
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const section = context.document?.section
          if (!value || !section) return true
          if (section === 'ar' && value !== 'ar') return 'Language must be "ar" when the section is Arabic.'
          if (section !== 'ar' && value !== 'en') return 'Language must be "en" unless the section is Arabic.'
          return true
        }),
    }),
    defineField({
      name: 'translationOf',
      title: 'Translation of (English page)',
      type: 'reference',
      group: 'language',
      to: [{ type: 'landingPage' }],
      description: 'The English twin of this Arabic page. Used for hreflang.',
      hidden: isArabic,
    }),
    defineField({
      name: 'translationOfPath',
      title: 'Translation of (hard-coded path)',
      type: 'string',
      group: 'language',
      description: 'Use instead of the reference when the English twin is a hard-coded page: "/" or "/pricing".',
      hidden: isArabic,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!value) return true
          if (!value.startsWith('/')) return 'Must start with /'
          if (context.document?.translationOf) return 'Set either the reference or the path, not both.'
          return true
        }),
    }),
    defineField({
      name: 'hreflang',
      title: 'hreflang value',
      type: 'string',
      group: 'language',
      options: { list: HREFLANG_OPTIONS },
      initialValue: 'ar',
      description: 'Use ar-SA for Saudi-targeted pages.',
      hidden: isArabic,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      section: 'section',
      publishedAt: 'publishedAt',
      media: 'mainImage',
    },
    prepare({ title, section, publishedAt, media }) {
      const date = publishedAt ? String(publishedAt).slice(0, 10) : 'no date'
      const future = publishedAt && new Date(publishedAt).getTime() > Date.now()
      return {
        title,
        subtitle: `${section ?? 'no section'} / ${date}${future ? ' · Future date' : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date (oldest first)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Published Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
