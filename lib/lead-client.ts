// Client-side helper used by the lead forms. Never fakes success: ok is true only
// after the server answers 2xx.
import { siteData } from '@/data/site'

export type LeadSubmission = {
  source: 'contact' | 'start-project' | 'free-consultation' | 'free-website-audit'
  name: string
  email: string
  phone?: string
  website?: string
  fields?: Record<string, string>
  hp: string
  startedAt: number
}

export type LeadResult =
  | { ok: true }
  | { ok: false; fieldErrors?: Record<string, string>; message?: string }

export const WHATSAPP_URL = `https://wa.me/${siteData.contact.phone.replace(/\D/g, '')}`
export const CONTACT_EMAIL = siteData.contact.email

export async function submitLead(data: LeadSubmission): Promise<LeadResult> {
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const v = params.get(k)
    if (v) utm[k] = v
  }
  const language = document.documentElement.lang?.startsWith('ar') ? 'ar' : 'en'
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, page: window.location.pathname, language, utm }),
    })
    if (res.ok) {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
      if (typeof gtag === 'function') gtag('event', 'generate_lead', { source: data.source, language })
      return { ok: true }
    }
    const json = (await res.json().catch(() => ({}))) as { fieldErrors?: Record<string, string>; message?: string }
    return { ok: false, fieldErrors: json.fieldErrors, message: json.message }
  } catch {
    return { ok: false }
  }
}
