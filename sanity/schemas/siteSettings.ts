import { defineField, defineType } from 'sanity'

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
  ],
})
