import { defineType, defineField } from 'sanity'

export const authorSchema = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the /authors/[slug] page URL. Click Generate.',
      options: {
        source: (doc: Record<string, unknown>) => {
          const firstName = (doc.firstName as string) ?? ''
          const lastName = (doc.lastName as string) ?? ''
          return `${firstName} ${lastName}`.trim()
        },
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar / Profile Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Use a real headshot (not a logo). Square, min 400×400px recommended.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'e.g. "Farad Alam – MotionBite CEO"',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title / Role',
      type: 'string',
      description: 'e.g. "CEO & Lead Web Developer" — shown below the name and in JSON-LD.',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description:
        'Shown inline on blog posts. Keep under 200 characters. Focus on experience and expertise.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: 'array',
      description: 'Rich text bio shown on the /authors/[slug] profile page.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'string', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: true },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'expertiseAreas',
      title: 'Expertise Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Topics this author is authoritative on (e.g. "Web Design", "SEO", "Conversion Rate"). Used in JSON-LD knowsAbout.',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'e.g. 7 — shown on the author profile page as a trust signal.',
    }),
    // ── Social / External Links ──────────────────────────────────────────
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile URL',
      type: 'url',
      description: 'e.g. https://www.linkedin.com/in/yourname — used in JSON-LD sameAs.',
    }),
    defineField({
      name: 'twitter',
      title: 'X / Twitter Profile URL',
      type: 'url',
      description: 'e.g. https://x.com/yourhandle — used in JSON-LD sameAs.',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'website',
      title: 'Personal Website URL',
      type: 'url',
      description: 'Optional personal site — used in JSON-LD sameAs.',
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      media: 'avatar',
      subtitle: 'jobTitle',
    },
    prepare({ firstName, lastName, media, subtitle }: Record<string, string>) {
      return {
        title: `${firstName ?? ''} ${lastName ?? ''}`.trim(),
        subtitle,
        media,
      }
    },
  },
})
