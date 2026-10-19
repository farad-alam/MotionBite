import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { cloudinaryAssetSourcePlugin, cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import { postSchema } from './sanity/schemas/post'
import { categorySchema } from './sanity/schemas/category'
import { authorSchema } from './sanity/schemas/author'
import { siteSettingsSchema } from './sanity/schemas/siteSettings'
import { portfolioProjectSchema } from './sanity/schemas/portfolioProject'
import { landingPageSchema } from './sanity/schemas/landingPage'
import { OpenPreviewAction } from './sanity/previewAction'

const LANDING_TEMPLATES = [
  { section: 'services', title: 'Services page' },
  { section: 'uae', title: 'UAE page' },
  { section: 'saudi', title: 'Saudi page' },
  { section: 'partners', title: 'Partners page' },
  { section: 'resources', title: 'Resources page' },
  { section: 'research', title: 'Research page' },
  { section: 'ar', title: 'Arabic page' },
]

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
      structure: (S) => {
        const landingList = (id: string, title: string, section: string) =>
          S.listItem()
            .title(title)
            .id(id)
            .child(
              S.documentList()
                .title(title)
                .schemaType('landingPage')
                .filter('_type == "landingPage" && section == $section')
                .params({ section })
                .defaultOrdering([{ field: 'publishedAt', direction: 'asc' }])
                .initialValueTemplates([S.initialValueTemplateItem(`landingPage-${section}`)])
            )

        return S.list()
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
            // ── Queue of unpublished work ────────────────
            S.listItem()
              .title('⏳ Drafts waiting to go live')
              .id('drafts-waiting')
              .child(
                S.documentList()
                  .title('Drafts waiting to go live')
                  .filter('_type in ["landingPage","post"] && _id in path("drafts.**")')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'asc' }])
              ),
            S.divider(),
            // ── Pages ────────────────────────────────────
            S.listItem()
              .title('📄 Pages')
              .id('pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    landingList('pages-services', 'Services', 'services'),
                    landingList('pages-uae', 'UAE', 'uae'),
                    landingList('pages-saudi', 'Saudi', 'saudi'),
                    landingList('pages-partners', 'Partners', 'partners'),
                    landingList('pages-resources', 'Resources', 'resources'),
                    landingList('pages-research', 'Research', 'research'),
                    landingList('pages-ar', 'Arabic', 'ar'),
                  ])
              ),
            // ── Blog ─────────────────────────────────────
            S.listItem()
              .title('📝 Blog')
              .id('blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('English posts')
                      .id('posts-en')
                      .child(
                        S.documentList()
                          .title('English posts')
                          .schemaType('post')
                          .filter('_type == "post" && coalesce(language, "en") == "en"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Arabic posts')
                      .id('posts-ar')
                      .child(
                        S.documentList()
                          .title('Arabic posts')
                          .schemaType('post')
                          .filter('_type == "post" && language == "ar"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                          .initialValueTemplates([S.initialValueTemplateItem('post-ar')])
                      ),
                    S.listItem()
                      .title('👤 Authors')
                      .child(S.documentTypeList('author').title('Authors')),
                    S.listItem()
                      .title('🏷️ Categories')
                      .child(S.documentTypeList('category').title('Categories')),
                  ])
              ),
          ])
      },
    }),
  ],
  document: {
    actions: (prev, context) =>
      context.schemaType === 'landingPage' || context.schemaType === 'post' ? [...prev, OpenPreviewAction] : prev,
  },
  schema: {
    types: [
      siteSettingsSchema,
      portfolioProjectSchema,
      postSchema,
      authorSchema,
      categorySchema,
      landingPageSchema,
    ],
    templates: (prev) => [
      ...prev,
      ...LANDING_TEMPLATES.map(({ section, title }) => ({
        id: `landingPage-${section}`,
        title,
        schemaType: 'landingPage',
        value: { section, language: section === 'ar' ? 'ar' : 'en', schemaType: 'WebPage', noindex: false },
      })),
      {
        id: 'post-ar',
        title: 'Arabic blog post',
        schemaType: 'post',
        value: { language: 'ar', hreflang: 'ar' },
      },
    ],
  },
})

