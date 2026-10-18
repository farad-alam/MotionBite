// Provider-agnostic lead email delivery. Default provider: Resend (REST API via fetch,
// so no extra dependency). To swap providers, replace sendWithResend and keep the
// sendLeadEmail signature. Never log lead contents; only the provider's error code.

export type LeadEmail = {
  subject: string
  replyTo: string
  text: string
  html: string
}

export type SendResult = { ok: true } | { ok: false; code: string }

// Owner decision: leads go to this address unless LEADS_TO_EMAIL overrides it.
export const DEFAULT_LEADS_TO_EMAIL = 'farad.alam1997@gmail.com'

// Resend's shared test sender only delivers to the Resend account owner; set
// LEADS_FROM_EMAIL to a verified motionbite.com sender for production.
const FALLBACK_FROM = 'MotionBite Leads <onboarding@resend.dev>'

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function sendWithResend(mail: LeadEmail, apiKey: string): Promise<SendResult> {
  const to = process.env.LEADS_TO_EMAIL?.trim() || DEFAULT_LEADS_TO_EMAIL
  const from = process.env.LEADS_FROM_EMAIL?.trim() || FALLBACK_FROM
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      }),
      cache: 'no-store',
    })
    if (res.ok) return { ok: true }
    let code = `http_${res.status}`
    try {
      const body = (await res.json()) as { name?: string }
      if (body?.name) code = body.name
    } catch {
      /* keep http code */
    }
    return { ok: false, code }
  } catch {
    return { ok: false, code: 'network_error' }
  }
}

export async function sendLeadEmail(mail: LeadEmail): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return { ok: false, code: 'not_configured' }
  return sendWithResend(mail, apiKey)
}
