import type { DocumentActionComponent, DocumentActionProps } from 'sanity'

// Studio "Open preview" action for landingPage and post.
// It opens /api/draft/enable?path=... on this same site WITHOUT the secret:
// the Studio bundle is public, so the secret is never put in it. The enable
// route asks for the secret in a password form (the browser can remember it)
// and only then turns Draft Mode on.

const SECTIONS = ['services', 'uae', 'saudi', 'partners', 'resources', 'research', 'ar']

type Doc = { section?: string; slug?: { current?: string }; language?: string }

export function previewPath(type: string, doc: Doc | null | undefined): string | null {
  const slug = doc?.slug?.current
  if (!slug) return null
  if (type === 'landingPage') {
    const section = doc?.section
    if (!section || !SECTIONS.includes(section)) return null
    if (section === 'ar') return slug === 'home' ? '/ar' : `/ar/${slug}`
    return `/${section}/${slug}`
  }
  if (type === 'post') {
    // English blog only for now; Arabic post routes arrive with WP3.
    if ((doc?.language ?? 'en') !== 'en') return null
    return `/blog/${slug}`
  }
  return null
}

export const OpenPreviewAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const doc = (props.draft ?? props.published) as Doc | null
  const path = previewPath(props.type, doc)
  return {
    label: 'Open preview',
    title: path ? `Preview ${path} with unpublished changes` : 'Set a slug (and section) first',
    disabled: !path,
    onHandle: () => {
      if (!path) return
      window.open(`/api/draft/enable?path=${encodeURIComponent(path)}`, '_blank', 'noopener')
      props.onComplete()
    },
  }
}
