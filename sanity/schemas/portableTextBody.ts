import { defineArrayMember } from 'sanity'

/**
 * Shared Portable Text body, used by `post.body` and `landingPage.body`.
 * H2-H4, quote, bold/italic, link annotation, images with required alt, and a table block.
 */
export const portableTextBodyMembers = [
  defineArrayMember({
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'H4', value: 'h4' },
      { title: 'Quote', value: 'blockquote' },
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
            {
              name: 'href',
              type: 'string',
              title: 'URL',
              validation: (rule) => rule.required(),
            },
            {
              name: 'blank',
              type: 'boolean',
              title: 'Open in new tab',
              initialValue: false,
            },
          ],
        },
      ],
    },
  }),
  defineArrayMember({
    type: 'image',
    options: { hotspot: true },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alt Text',
        validation: (rule) => rule.required(),
      },
      {
        name: 'caption',
        type: 'string',
        title: 'Caption (optional)',
      },
    ],
  }),
  defineArrayMember({
    name: 'table',
    title: 'Table',
    type: 'object',
    fields: [
      {
        name: 'hasHeader',
        title: 'First row is a header',
        type: 'boolean',
        initialValue: true,
      },
      {
        name: 'rows',
        title: 'Rows',
        type: 'array',
        validation: (rule) => rule.required().min(1),
        of: [
          {
            name: 'tableRow',
            title: 'Row',
            type: 'object',
            fields: [
              {
                name: 'cells',
                title: 'Cells',
                type: 'array',
                of: [{ type: 'string' }],
                validation: (rule) => rule.required().min(1),
              },
            ],
            preview: {
              select: { cells: 'cells' },
              prepare: (value: Record<string, unknown>) => ({
                title: ((value.cells as string[] | undefined) ?? []).join(' | '),
              }),
            },
          },
        ],
      },
    ],
    preview: {
      select: { rows: 'rows' },
      prepare: (value: Record<string, unknown>) => {
        const rows = (value.rows as { cells?: string[] }[] | undefined) ?? []
        return {
          title: 'Table',
          subtitle: `${rows.length} row${rows.length === 1 ? '' : 's'}`,
        }
      },
    },
  }),
]
