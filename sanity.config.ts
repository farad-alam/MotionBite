import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { postSchema } from './sanity/schemas/post'
import { categorySchema } from './sanity/schemas/category'

export default defineConfig({
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
              .title('Blog Posts')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
  ],
  schema: {
    types: [postSchema, categorySchema],
  },
})
