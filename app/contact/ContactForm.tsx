'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const subjects = [
  'I want a new website',
  'I want to redesign my existing site',
  'I have a question about pricing',
  'I want to discuss a custom project',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.subject) e.subject = 'Please select a subject'
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Please add a bit more detail (min 20 characters)'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark-card rounded-2xl p-10 glow-border text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-primary/10 border border-green-primary/20 flex items-center justify-center text-3xl mx-auto mb-5">
          ✓
        </div>
        <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">Message sent!</h3>
        <p className="font-body text-text-muted text-sm leading-relaxed">
          We have received your message and will reply to{' '}
          <strong className="text-text-primary">{form.email}</strong> within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-dark-card rounded-2xl p-8 glow-border">
      <h2 className="font-heading text-xl font-bold text-text-primary mb-6">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block font-body text-text-muted text-sm mb-1.5">Your Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full bg-dark-base border rounded-md px-4 py-3 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-green-primary transition-colors ${errors.name ? 'border-state-error' : 'border-dark-border'}`}
              placeholder="John Smith"
            />
            {errors.name && <p className="text-state-error text-xs mt-1 font-body">{errors.name}</p>}
          </div>
          <div>
            <label className="block font-body text-text-muted text-sm mb-1.5">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full bg-dark-base border rounded-md px-4 py-3 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-green-primary transition-colors ${errors.email ? 'border-state-error' : 'border-dark-border'}`}
              placeholder="john@yourcompany.com"
            />
            {errors.email && <p className="text-state-error text-xs mt-1 font-body">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block font-body text-text-muted text-sm mb-1.5">Subject</label>
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={`w-full bg-dark-base border rounded-md px-4 py-3 text-text-primary font-body text-sm outline-none focus:border-green-primary transition-colors ${errors.subject ? 'border-state-error' : 'border-dark-border'}`}
          >
            <option value="" disabled>Select a subject...</option>
            {subjects.map((s) => (
              <option key={s} value={s} className="bg-dark-base">{s}</option>
            ))}
          </select>
          {errors.subject && <p className="text-state-error text-xs mt-1 font-body">{errors.subject}</p>}
        </div>

        <div>
          <label className="block font-body text-text-muted text-sm mb-1.5">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            className={`w-full bg-dark-base border rounded-md px-4 py-3 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-green-primary transition-colors resize-none ${errors.message ? 'border-state-error' : 'border-dark-border'}`}
            placeholder="Tell us about your business and what you need..."
          />
          {errors.message && <p className="text-state-error text-xs mt-1 font-body">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-primary hover:bg-green-deep text-dark-base font-heading font-bold py-4 rounded-md transition-all duration-200 hover:scale-[1.01] text-base"
        >
          Send Message →
        </button>
      </form>
    </div>
  )
}
