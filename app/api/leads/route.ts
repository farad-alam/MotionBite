import { NextResponse } from 'next/server'
import { sendLeadEmail } from '@/lib/email'
import { buildLeadEmail, validateLead } from '@/lib/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MIN_FILL_MS = 3000
const MAX_AGE_MS = 24 * 60 * 60 * 1000
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const MAX_BODY_BYTES = 40_000

// Best-effort, per server instance only (serverless instances do not share memory).
const hits = new Map<string, number[]>()

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k)
  }
  return false
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  return (fwd?.split(',')[0] ?? req.headers.get('x-real-ip') ?? 'unknown').trim()
}

export async function POST(req: Request) {
  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 })
  }
  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw)
    if (!body || typeof body !== 'object') throw new Error('bad')
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot: bots fill the hidden field. Pretend success, send nothing.
  if (typeof body.hp === 'string' && body.hp.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const result = validateLead(body)
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: 'validation', fieldErrors: result.fieldErrors }, { status: 400 })
  }

  const now = Date.now()
  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : NaN
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS || now - startedAt > MAX_AGE_MS) {
    return NextResponse.json(
      { ok: false, error: 'too_fast', message: 'Please wait a moment and submit again.' },
      { status: 400 }
    )
  }

  if (rateLimited(clientIp(req), now)) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited', message: 'Too many submissions. Please try again later.' },
      { status: 429 }
    )
  }

  const sent = await sendLeadEmail(buildLeadEmail(result.lead))
  if (!sent.ok) {
    // Log only the source and the provider's error code: never names or emails.
    console.error(`[leads] delivery failed source=${result.lead.source} code=${sent.code}`)
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
