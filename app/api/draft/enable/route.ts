import { timingSafeEqual } from 'node:crypto'
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { safeDraftPath } from '@/lib/draft-redirect'

export const dynamic = 'force-dynamic'

function secretMatches(given: string, expected: string): boolean {
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

function text(message: string, status: number) {
  return new NextResponse(message, { status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })
}

function escapeAttr(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Studio links here with only ?path=... (no secret in the Studio bundle).
// With no secret supplied we show a tiny form so the owner types it once.
function secretForm(path: string) {
  const html = `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Open preview</title>
<body style="font-family:sans-serif;max-width:420px;margin:60px auto">
<h1 style="font-size:20px">Open draft preview</h1>
<form method="POST" action="/api/draft/enable">
<input type="hidden" name="path" value="${escapeAttr(path)}">
<label>Preview secret<br><input type="password" name="secret" autocomplete="current-password" autofocus required style="width:100%;padding:8px;margin:8px 0"></label>
<button type="submit" style="padding:8px 16px">Open preview</button>
</form></body>`
  return new NextResponse(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
}

async function enable(secret: string | null, rawPath: string | null) {
  const expected = process.env.SANITY_PREVIEW_SECRET
  if (!expected || !process.env.SANITY_API_READ_TOKEN) {
    return text('Preview is not configured: SANITY_PREVIEW_SECRET and SANITY_API_READ_TOKEN must be set.', 500)
  }
  const path = safeDraftPath(rawPath)
  if (!path) return text('Invalid path. It must start with a single "/".', 400)
  if (!secret || !secretMatches(secret, expected)) return text('Invalid secret.', 401)
  ;(await draftMode()).enable()
  return new NextResponse(null, { status: 303, headers: { Location: path, 'Cache-Control': 'no-store' } })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')
  if (!secret) {
    if (!process.env.SANITY_PREVIEW_SECRET || !process.env.SANITY_API_READ_TOKEN) {
      return text('Preview is not configured: SANITY_PREVIEW_SECRET and SANITY_API_READ_TOKEN must be set.', 500)
    }
    const safe = safeDraftPath(path)
    return safe ? secretForm(safe) : text('Invalid path. It must start with a single "/".', 400)
  }
  return enable(secret, path)
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null)
  const secret = form?.get('secret')
  const path = form?.get('path')
  return enable(typeof secret === 'string' ? secret : null, typeof path === 'string' ? path : null)
}
