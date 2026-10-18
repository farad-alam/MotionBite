import { defineField, defineType } from 'sanity'

const linkItem = () => ({
  type: 'object' as const,
  name: 'navLink',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Path',
      type: 'string',
      description: 'Internal path starting with /, e.g. /ar/web-design-riyadh',
      validation: (Rule) =>
        Rule.required().custom((v) => (typeof v === 'string' && v.startsWith('/') ? true : 'Must start with /')),
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
})

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'The global/home page meta title for the website.',
      validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'The global/home page meta description for the website.',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'text',
      rows: 2,
      description: 'Keywords that describe the overall website focus. Separate them with commas.',
    }),
    defineField({
      name: 'seoImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'The default image used when sharing the home page on social media.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary call to action: label',
      type: 'string',
      description: 'Defaults to "Get a free consultation" when empty.',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary call to action: link',
      type: 'string',
      description: 'Defaults to /free-consultation when empty. Internal path starting with /.',
      validation: (Rule) =>
        Rule.custom((v) => (!v || v.startsWith('/') || /^https?:\/\//.test(v) ? true : 'Use a path starting with / or a full URL')),
    }),
    defineField({
      name: 'primaryCtaLabelAr',
      title: 'Primary call to action (Arabic): label',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaHrefAr',
      title: 'Primary call to action (Arabic): link',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((v) => (!v || v.startsWith('/') || /^https?:\/\//.test(v) ? true : 'Use a path starting with / or a full URL')),
    }),
    defineField({
      name: 'navAr',
      title: 'Arabic navigation links',
      type: 'array',
      description: 'Add a link when its page goes live, so the menu never points at an unpublished page.',
      of: [linkItem()],
    }),
    defineField({
      name: 'footerAr',
      title: 'Arabic footer links',
      type: 'array',
      of: [linkItem()],
    }),
  ],
})
