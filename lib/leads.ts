import { escapeHtml, type LeadEmail } from '@/lib/email'

export const LEAD_SOURCES = ['contact', 'start-project', 'free-consultation', 'free-website-audit'] as const
export type LeadSource = (typeof LEAD_SOURCES)[number]

export type LeadInput = {
  source: LeadSource
  name: string
  email: string
  phone?: string
  website?: string
  fields: Record<string, string>
  page: string
  language: 'en' | 'ar'
  utm: Record<string, string>
}

export type ValidationResult =
  | { ok: true; lead: LeadInput }
  | { ok: false; fieldErrors: Record<string, string> }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
export const MAX = { name: 120, email: 254, phone: 40, website: 300, value: 4000, fieldKey: 60, fields: 20, page: 200, utm: 200 }

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

function normaliseWebsite(raw: string): string | null {
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  try {
    const u = new URL(candidate)
    if (!/^https?:$/.test(u.protocol) || !u.hostname.includes('.')) return null
    return u.toString()
  } catch {
    return null
  }
}

export function validateLead(body: unknown): ValidationResult {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>
  const errors: Record<string, string> = {}

  const source = str(b.source) as LeadSource
  if (!LEAD_SOURCES.includes(source)) errors.source = 'Unknown form'

  const name = str(b.name)
  if (!name) errors.name = 'Name is required'
  else if (name.length > MAX.name) errors.name = `Name must be at most ${MAX.name} characters`

  const email = str(b.email)
  if (!EMAIL_RE.test(email) || email.length > MAX.email) errors.email = 'Valid email required'

  const phone = str(b.phone)
  if (phone.length > MAX.phone) errors.phone = `Phone must be at most ${MAX.phone} characters`

  let website: string | undefined
  const rawWebsite = str(b.website)
  if (rawWebsite) {
    const normalised = rawWebsite.length <= MAX.website ? normaliseWebsite(rawWebsite) : null
    if (!normalised) errors.website = 'Enter a valid website address'
    else website = normalised
  }

  // WP5.2: the audit form needs the site to audit.
  if (source === 'free-website-audit' && !rawWebsite && !errors.website) errors.website = 'Website URL is required'

  const fields: Record<string, string> = {}
  const rawFields = b.fields && typeof b.fields === 'object' && !Array.isArray(b.fields) ? (b.fields as Record<string, unknown>) : {}
  const keys = Object.keys(rawFields)
  if (keys.length > MAX.fields) {
    errors.fields = `At most ${MAX.fields} extra fields`
  } else {
    for (const k of keys) {
      const v = rawFields[k]
      if (typeof v !== 'string') continue
      if (k.length > MAX.fieldKey) {
        errors.fields = 'Field name too long'
        break
      }
      if (v.length > MAX.value) {
        errors[k] = `Must be at most ${MAX.value} characters`
        continue
      }
      fields[k] = v.trim()
    }
  }

  const page = str(b.page)
  const language = str(b.language) === 'ar' ? 'ar' : 'en'

  const utm: Record<string, string> = {}
  const rawUtm = b.utm && typeof b.utm === 'object' ? (b.utm as Record<string, unknown>) : {}
  for (const k of UTM_KEYS) {
    const v = str(rawUtm[k])
    if (v) utm[k] = v.slice(0, MAX.utm)
  }

  if (Object.keys(errors).length) return { ok: false, fieldErrors: errors }
  return {
    ok: true,
    lead: {
      source,
      name,
      email,
      phone: phone || undefined,
      website,
      fields,
      page: page.startsWith('/') ? page.slice(0, MAX.page) : '',
      language,
      utm,
    },
  }
}

function oneLine(v: string): string {
  return v.replace(/[\r\n]+/g, ' ')
}

export function buildLeadEmail(lead: LeadInput): LeadEmail {
  const rows: [string, string][] = [
    ['Source', lead.source],
    ['Name', lead.name],
    ['Email', lead.email],
  ]
  if (lead.phone) rows.push(['Phone', lead.phone])
  if (lead.website) rows.push(['Website', lead.website])
  for (const [k, v] of Object.entries(lead.fields)) rows.push([k, v])
  rows.push(['Page', lead.page || '(unknown)'], ['Language', lead.language])
  for (const [k, v] of Object.entries(lead.utm)) rows.push([k, v])

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  const html =
    '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">' +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="vertical-align:top;font-weight:bold;white-space:nowrap">${escapeHtml(k)}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
      )
      .join('') +
    '</table>'

  return {
    subject: oneLine(`[MotionBite lead] ${lead.source}: ${lead.name}`).slice(0, 200),
    replyTo: lead.email,
    text,
    html,
  }
}
