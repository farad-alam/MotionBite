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

    // Always revalidate the listing page
    revalidatePath('/blog', 'page')

    if (slug) {
      // Revalidate the specific article URL (omit 'page' type to revalidate literal URL path)
      revalidatePath(`/blog/${slug}`)
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
