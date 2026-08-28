import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const slug: string | undefined = typeof body?.slug === 'string' ? body.slug : body?.slug?.current
    const _type = body?._type

    // If global site settings changed, revalidate the entire layout
    if (_type === 'siteSettings') {
      revalidatePath('/', 'layout')
      return NextResponse.json({ revalidated: true, type: _type, now: Date.now() })
    }

    // If a portfolio project changed, revalidate listing + detail page
    if (_type === 'portfolioProject') {
      revalidatePath('/portfolio', 'page')
      if (slug) {
        revalidatePath(`/portfolio/${slug}`)
      }
      return NextResponse.json({ revalidated: true, type: _type, slug, now: Date.now() })
    }

    // Blog: always revalidate the listing page
    revalidatePath('/blog', 'page')
    if (slug) {
      revalidatePath(`/blog/${slug}`)
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
