import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { safeDraftPath } from '@/lib/draft-redirect'

export const dynamic = 'force-dynamic'

// Turning preview off is harmless, so no secret is needed.
export async function GET(request: Request) {
  ;(await draftMode()).disable()
  const path = safeDraftPath(new URL(request.url).searchParams.get('path')) ?? '/'
  return new NextResponse(null, { status: 303, headers: { Location: path, 'Cache-Control': 'no-store' } })
}
