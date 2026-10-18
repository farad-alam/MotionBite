import { defineType, defineField } from 'sanity'
import { portableTextBodyMembers } from './portableTextBody'
import { isUniquePerLanguage, warnIfFuture, HREFLANG_OPTIONS } from '../lib/validation'

export const postSchema = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Arabic (العربية)', value: 'ar' },
        ],
        layout: 'radio',
      },
      initialValue: 'en',
      description: 'Existing posts without a value are treated as English.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'translationOf',
      title: 'Translation of (English post)',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'The English twin of this Arabic post. Used for hreflang.',
      hidden: ({ document }) => document?.language !== 'ar',
    }),
    defineField({
      name: 'hreflang',
      title: 'hreflang value',
      type: 'string',
      options: { list: HREFLANG_OPTIONS },
      initialValue: 'ar',
      hidden: ({ document }) => document?.language !== 'ar',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The article headline. Used as <title>, og:title, and H1.',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96, isUnique: isUniquePerLanguage },
      description: 'Auto-generated URL path. Click Generate. Must be unique within the post language.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (Meta Description)',
      type: 'text',
      rows: 3,
      description: 'Used as meta description and OG description. Keep under 160 characters for best SEO.',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Used as og:image (1200×630 recommended). Always add alt text.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers and Google Image Search.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Select the person who wrote this article. Create authors under the Authors section.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Target keywords for this article. Include long-tail phrases your customers search.',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => [rule.required(), warnIfFuture(rule)],
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated At',
      type: 'datetime',
      description: 'Update this when making significant edits — improves Google freshness signal.',
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: portableTextBodyMembers,
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Section (SEO Bonus)',
      type: 'array',
      description: 'Add FAQs to get Google FAQ rich results in search — dramatically increases visibility.',
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
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (optional override)',
      type: 'url',
      description: 'Only set this if the article is cross-posted elsewhere and you need to point canonical to a different URL.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'publishedAt',
    },
  },
  orderings: [
    {
      title: 'Published Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
