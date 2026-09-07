import { revalidateTag, revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

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
    // detail pages, and related projects queries) and refresh the sitemap.
    if (_type === 'portfolioProject') {
      revalidateTag('portfolio', PURGE)
      revalidatePath('/sitemap.xml')
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

    // ─── post (default) ─────────────────────────────────────────────────
    // Blog post published or updated — purge posts tag (covers blog listing,
    // individual post pages, and the slug list used by generateStaticParams),
    // refresh the sitemap so new posts appear, and touch the homepage layout
    // so any homepage section that surfaces recent content stays current.
    revalidateTag('posts', PURGE)
    revalidatePath('/sitemap.xml')
    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, type: _type ?? 'post', slug, now: Date.now() })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
