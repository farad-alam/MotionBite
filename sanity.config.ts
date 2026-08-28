import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { postSchema } from './sanity/schemas/post'
import { categorySchema } from './sanity/schemas/category'
import { authorSchema } from './sanity/schemas/author'
import { siteSettingsSchema } from './sanity/schemas/siteSettings'

export default defineConfig({
  basePath: '/studio',
  name: 'motionbite',
  title: 'MotionBite Blog Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Global Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Global Settings')
              ),
            S.divider(),
            S.listItem()
              .title('Blog Posts')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
  ],
  schema: {
    types: [siteSettingsSchema, postSchema, authorSchema, categorySchema],
  },
})
