import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { cloudinaryAssetSourcePlugin, cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import { postSchema } from './sanity/schemas/post'
import { categorySchema } from './sanity/schemas/category'
import { authorSchema } from './sanity/schemas/author'
import { siteSettingsSchema } from './sanity/schemas/siteSettings'
import { portfolioProjectSchema } from './sanity/schemas/portfolioProject'

export default defineConfig({
  basePath: '/studio',
  name: 'motionbite',
  title: 'MotionBite Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    cloudinaryAssetSourcePlugin(),
    cloudinarySchemaPlugin(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('MotionBite')
          .items([
            // ── Settings ─────────────────────────────────
            S.listItem()
              .title('⚙️ Global Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Global Settings')
              ),
            S.divider(),
            // ── Portfolio ────────────────────────────────
            S.listItem()
              .title('🖥️ Portfolio Projects')
              .child(S.documentTypeList('portfolioProject').title('Portfolio Projects')),
            S.divider(),
            // ── Blog ─────────────────────────────────────
            S.listItem()
              .title('📝 Blog Posts')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('👤 Authors')
              .child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('🏷️ Categories')
              .child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
  ],
  schema: {
    types: [siteSettingsSchema, portfolioProjectSchema, postSchema, authorSchema, categorySchema],
  },
})

