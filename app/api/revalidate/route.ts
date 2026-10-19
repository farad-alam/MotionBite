import { revalidateTag, revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// The sitemap renders per request and reads tagged, cached Sanity queries, so
// purging the content tags below refreshes it too (revalidatePath('/sitemap.xml')
// never cleared the prerendered sitemap on Vercel and is no longer needed).
//
// In Next.js 16, revalidateTag requires a second `profile` argument.
// Passing { expire: 0 } ensures the tag is purged immediately (no TTL).
const PURGE: { expire: number } = { expire: 0 }

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const slug: string | undefined = typeof body?.slug === 'string' ? body.slug : body?.slug?.current
    const _type = body?._type

    // ─── siteSettings ──────────────────────────────────────────────────
    // Global SEO settings changed — purge siteSettings tag and
    // force a layout-level rebuild so metadata propagates everywhere.
    if (_type === 'siteSettings') {
      revalidateTag('siteSettings', PURGE)
      revalidatePath('/', 'layout')
      return NextResponse.json({ revalidated: true, type: _type, now: Date.now() })
    }

    // ─── portfolioProject ───────────────────────────────────────────────
    // Portfolio content changed — purge portfolio tag (covers listing page,
    // detail pages, and related projects queries), which also refreshes the sitemap.
    if (_type === 'portfolioProject') {
      revalidateTag('portfolio', PURGE)
      return NextResponse.json({ revalidated: true, type: _type, slug, now: Date.now() })
    }

    // ─── author ─────────────────────────────────────────────────────────
    // Author profile changed — purge authors tag and also posts tag
    // because individual post pages embed author data inline.
    if (_type === 'author') {
      revalidateTag('authors', PURGE)
      revalidateTag('posts', PURGE) // post pages embed author data
      return NextResponse.json({ revalidated: true, type: _type, slug, now: Date.now() })
    }

    // ─── landingPage ────────────────────────────────────────────────────
    // Landing page published, edited, unpublished or deleted — purge the
    // landingPages tag (pages, hubs, hreflang lookups), which also refreshes the sitemap.
    if (_type === 'landingPage') {
      revalidateTag('landingPages', PURGE)
      return NextResponse.json({ revalidated: true, type: _type, slug, now: Date.now() })
    }

    // ─── unknown / missing type ─────────────────────────────────────────
    // Delete events can arrive without _type. Purge every content tag
    // (which also refreshes the sitemap) instead of assuming the document was a post.
    if (_type !== 'post') {
      revalidateTag('posts', PURGE)
      revalidateTag('landingPages', PURGE)
      revalidateTag('portfolio', PURGE)
      revalidatePath('/', 'layout')
      return NextResponse.json({ revalidated: true, type: _type ?? 'unknown', slug, now: Date.now() })
    }

    // ─── post ─────────────────────────────────────────────────
    // Blog post published or updated — purge posts tag (covers blog listing,
    // individual post pages, and the slug list used by generateStaticParams),
    // which also refreshes the sitemap, and touch the homepage layout
    // so any homepage section that surfaces recent content stays current.
    revalidateTag('posts', PURGE)
    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, type: _type, slug, now: Date.now() })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
