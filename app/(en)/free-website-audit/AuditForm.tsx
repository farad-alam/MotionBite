'use client'

import { useState } from 'react'
import Honeypot from '@/components/forms/Honeypot'
import SubmitError from '@/components/forms/SubmitError'
import { submitLead } from '@/lib/lead-client'
import { AUDIT_COUNTRIES, BUSINESS_TYPES, CHALLENGES } from '@/data/leadOptions'
import { auditCopy, AUDIT_TURNAROUND } from '@/data/audit'

const inputBase =
  'w-full bg-dark-base border rounded-md px-4 py-3 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-purple-primary transition-colors'

type Form = {
  name: string
  email: string
  website: string
  businessType: string
  country: string
  challenge: string
  whatsapp: string
}

export default function AuditForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hp, setHp] = useState('')
  const [startedAt] = useState(() => Date.now())
  const [form, setForm] = useState<Form>({ name: '', email: '', website: '', businessType: '', country: '', challenge: '', whatsapp: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.website.trim()) e.website = 'Website URL is required'
    if (!form.businessType) e.businessType = 'Please select your business type'
    if (!form.country) e.country = 'Please select your country'
    if (!form.challenge) e.challenge = 'Please select your biggest problem'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitError(null)
    setSending(true)
    const result = await submitLead({
      source: 'free-website-audit',
      name: form.name,
      email: form.email,
      website: form.website,
      phone: form.whatsapp || undefined,
      fields: {
        businessType: form.businessType,
        country: form.country,
        challenge: form.challenge,
        ...(form.whatsapp ? { whatsapp: form.whatsapp } : {}),
      },
      hp,
      startedAt,
    })
    setSending(false)
    if (result.ok) { setSubmitted(true); return }
    if (result.fieldErrors) setErrors(result.fieldErrors)
    setSubmitError(result.message ?? '')
  }

  if (submitted) {
    return (
      <div className="bg-dark-card rounded-2xl p-10 glow-border text-center" role="status">
        <div className="w-16 h-16 rounded-full bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-3xl mx-auto mb-5">✓</div>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">{auditCopy.confirmationTitle}</h2>
        <p className="font-body text-text-muted text-sm leading-relaxed">
          {auditCopy.confirmation}
          {AUDIT_TURNAROUND && <> {AUDIT_TURNAROUND}</>}
        </p>
      </div>
    )
  }

  const err = (k: string) => errors[k] && <p className="text-state-error text-xs mt-1 font-body">{errors[k]}</p>
  const cls = (k: string) => `${inputBase} ${errors[k] ? 'border-state-error' : 'border-dark-border'}`

  return (
    <div className="bg-dark-card rounded-2xl p-8 glow-border">
      <h2 className="font-heading text-xl font-bold text-text-primary mb-6">{auditCopy.formHeading}</h2>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Honeypot value={hp} onChange={setHp} />
        <div>
          <label htmlFor="audit-name" className="block font-body text-text-muted text-sm mb-1.5">Your Name</label>
          <input id="audit-name" type="text" autoComplete="name" value={form.name} onChange={set('name')} className={cls('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="audit-email" className="block font-body text-text-muted text-sm mb-1.5">Email Address</label>
          <input id="audit-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} className={cls('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="audit-website" className="block font-body text-text-muted text-sm mb-1.5">Website URL</label>
          <input id="audit-website" type="url" autoComplete="url" value={form.website} onChange={set('website')} className={cls('website')} placeholder="https://yoursite.com" />
          {err('website')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="audit-business" className="block font-body text-text-muted text-sm mb-1.5">Business Type</label>
            <select id="audit-business" value={form.businessType} onChange={set('businessType')} className={cls('businessType')}>
              <option value="" disabled>Select...</option>
              {BUSINESS_TYPES.map((o) => <option key={o} value={o} className="bg-dark-base">{o}</option>)}
            </select>
            {err('businessType')}
          </div>
          <div>
            <label htmlFor="audit-country" className="block font-body text-text-muted text-sm mb-1.5">Country</label>
            <select id="audit-country" value={form.country} onChange={set('country')} className={cls('country')}>
              <option value="" disabled>Select...</option>
              {AUDIT_COUNTRIES.map((o) => <option key={o} value={o} className="bg-dark-base">{o}</option>)}
            </select>
            {err('country')}
          </div>
        </div>
        <div>
          <label htmlFor="audit-challenge" className="block font-body text-text-muted text-sm mb-1.5">Biggest Problem</label>
          <select id="audit-challenge" value={form.challenge} onChange={set('challenge')} className={cls('challenge')}>
            <option value="" disabled>Select your situation...</option>
            {CHALLENGES.map((o) => <option key={o} value={o} className="bg-dark-base">{o}</option>)}
          </select>
          {err('challenge')}
        </div>
        <div>
          <label htmlFor="audit-whatsapp" className="block font-body text-text-muted text-sm mb-1.5">
            WhatsApp Number <span className="text-text-muted/50">(optional)</span>
          </label>
          <input id="audit-whatsapp" type="tel" autoComplete="tel" value={form.whatsapp} onChange={set('whatsapp')} className={cls('phone')} />
          {err('phone')}
        </div>
        {submitError !== null && <SubmitError message={submitError || undefined} />}
        <button
          type="submit"
          disabled={sending}
          className="disabled:opacity-60 disabled:cursor-not-allowed w-full bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-bold py-4 rounded-md transition-all duration-200 hover:scale-[1.01] text-base"
        >
          {sending ? 'Sending...' : auditCopy.submitLabel}
        </button>
      </form>
    </div>
  )
}
