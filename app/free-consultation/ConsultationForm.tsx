'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const challenges = [
  "No website yet",
  "Low traffic / hard to find on Google",
  "Poor conversions (visitors don't contact)",
  "Outdated or slow website",
  "Other",
]

const whatYouGet = [
  { icon: '🔍', title: 'Site & Strategy Review', desc: "We look at your current site (or competitors') and map out exactly where you are losing customers." },
  { icon: '📈', title: 'SEO Gap Analysis', desc: "Find out exactly why Google can't find you — and what to fix first." },
  { icon: '🎯', title: 'Clear Action Plan', desc: "You leave the call with a specific, prioritised list of changes — even if we never work together." },
]

const consultFaq = [
  { q: 'Is this really free?', a: 'Yes, always. No credit card, no trial, no catch.' },
  { q: 'Will you try to sell me something?', a: "We'll share what we found. If you want help building it, that's a separate conversation — your choice entirely." },
  { q: "What if I don't have a website yet?", a: "Even better — we'll review your top competitors and show you exactly what you need to beat them from day one." },
]

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', website: '', challenge: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.challenge) e.challenge = 'Please select your biggest challenge'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-dark-base pt-16">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 bg-purple-primary/10 border border-purple-primary/20 text-purple-primary text-xs font-body px-3 py-1.5 rounded-full mb-6">
                Free 30-Minute Consultation
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                Find Out Exactly Why Your Website{' '}
                <span className="text-purple-primary">Isn&apos;t Converting</span>
              </h1>
              <p className="font-body text-text-muted text-lg leading-relaxed mb-8">
                We&apos;ll review your site (or your competitors&apos;) and tell you specifically what&apos;s costing you customers — for free, no pitch, no obligation.
              </p>
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2 text-text-muted text-sm font-body">
                  <span className="text-purple-primary">★★★★★</span> 50+ consultations delivered
                </div>
                <div className="flex items-center gap-2 text-text-muted text-sm font-body">
                  <span className="text-purple-primary">✓</span> No spam, ever
                </div>
                <div className="flex items-center gap-2 text-text-muted text-sm font-body">
                  <span className="text-purple-primary">⚡</span> Reply within 24 hours
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {!submitted ? (
                <div className="bg-dark-card rounded-2xl p-8 glow-border">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-6">Book Your Free Consultation</h2>
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                      <label className="block font-body text-text-muted text-sm mb-1.5">Your Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full bg-dark-base border rounded-md px-4 py-3 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-purple-primary transition-colors ${errors.name ? 'border-state-error' : 'border-dark-border'}`}
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
                        className={`w-full bg-dark-base border rounded-md px-4 py-3 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-purple-primary transition-colors ${errors.email ? 'border-state-error' : 'border-dark-border'}`}
                        placeholder="john@yourcompany.com"
                      />
                      {errors.email && <p className="text-state-error text-xs mt-1 font-body">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block font-body text-text-muted text-sm mb-1.5">Website URL <span className="text-text-muted/50">(optional)</span></label>
                      <input
                        type="url"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        className="w-full bg-dark-base border border-dark-border rounded-md px-4 py-3 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-purple-primary transition-colors"
                        placeholder="https://yoursite.com  (or leave blank)"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-text-muted text-sm mb-1.5">Biggest Challenge</label>
                      <select
                        value={form.challenge}
                        onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                        className={`w-full bg-dark-base border rounded-md px-4 py-3 text-text-primary font-body text-sm outline-none focus:border-purple-primary transition-colors ${errors.challenge ? 'border-state-error' : 'border-dark-border'}`}
                      >
                        <option value="" disabled>Select your situation...</option>
                        {challenges.map((c) => (
                          <option key={c} value={c} className="bg-dark-base">{c}</option>
                        ))}
                      </select>
                      {errors.challenge && <p className="text-state-error text-xs mt-1 font-body">{errors.challenge}</p>}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-bold py-4 rounded-md transition-all duration-200 hover:scale-[1.01] text-base"
                    >
                      Book My Free Consultation →
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-dark-card rounded-2xl p-10 glow-border text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-3xl mx-auto mb-5">✓</div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">You&apos;re booked!</h3>
                  <p className="font-body text-text-muted text-sm leading-relaxed">
                    We&apos;ll review your site and reach out within 24 hours to confirm your consultation slot.
                    Check <strong className="text-text-primary">{form.email}</strong> — we&apos;ll be in touch soon.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-dark-card section-padding">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary text-center mb-10">
            What&apos;s Included in Your Free Consultation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatYouGet.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-dark-base rounded-xl p-6 glow-border text-center">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="bg-dark-base section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-10">What Happens Next</h2>
          <div className="space-y-6">
            {[
              { n: '1', t: 'Submit the form', d: 'Takes 2 minutes. No card required.' },
              { n: '2', t: 'We confirm your slot', d: 'Our team will reach out within 24 hours to book a time that works for you.' },
              { n: '3', t: 'You get clarity', d: 'A focused 30-minute call — you leave knowing exactly what to do next.' },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-5 text-left">
                <div className="w-10 h-10 rounded-full bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center shrink-0">
                  <span className="font-heading text-purple-primary font-bold text-sm">{s.n}</span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">{s.t}</h3>
                  <p className="font-body text-text-muted text-sm">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dark-card section-padding">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-primary text-center mb-8">Quick Questions</h2>
          <div className="space-y-4">
            {consultFaq.map((item, i) => (
              <div key={i} className="bg-dark-base rounded-xl p-5 glow-border">
                <h3 className="font-heading text-base font-semibold text-text-primary mb-1">{item.q}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
