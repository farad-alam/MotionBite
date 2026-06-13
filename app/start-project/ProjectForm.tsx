'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const projectTypes = [
  "New Website",
  "Website Redesign",
  "Landing Page",
  "E-commerce",
  "Other",
]

const budgets = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $8,000",
  "$8,000+",
]

const timelines = [
  "ASAP",
  "Within 1 month",
  "2-3 months",
  "Flexible",
]

export default function ProjectForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    projectType: '', 
    budget: '', 
    timeline: '', 
    description: '' 
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.projectType) e.projectType = 'Please select a project type'
    if (!form.budget) e.budget = 'Please select a budget range'
    if (!form.timeline) e.timeline = 'Please select a timeline'
    if (!form.description.trim()) e.description = 'Please tell us about your project'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-dark-base pt-20 lg:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="inline-flex items-center text-text-muted hover:text-text-primary text-sm font-body mb-8 transition-colors">
          ← Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Start Your <span className="text-purple-primary">Project</span>
          </h1>
          <p className="font-body text-text-muted text-lg mb-12 max-w-2xl">
            Tell us about what you want to build. We'll review your requirements and get back to you within 24 hours to discuss the next steps.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          {!submitted ? (
            <div className="bg-dark-card rounded-3xl p-6 sm:p-10 glow-border">
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-text-muted text-sm mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full bg-dark-base border rounded-xl px-4 py-3.5 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-purple-primary transition-colors ${errors.name ? 'border-state-error' : 'border-dark-border'}`}
                      placeholder="John Smith"
                    />
                    {errors.name && <p className="text-state-error text-xs mt-1.5 font-body">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block font-body text-text-muted text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full bg-dark-base border rounded-xl px-4 py-3.5 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-purple-primary transition-colors ${errors.email ? 'border-state-error' : 'border-dark-border'}`}
                      placeholder="john@yourcompany.com"
                    />
                    {errors.email && <p className="text-state-error text-xs mt-1.5 font-body">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-body text-text-muted text-sm mb-2">Company / Business Name</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-dark-base border border-dark-border rounded-xl px-4 py-3.5 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-purple-primary transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-body text-text-muted text-sm mb-2">Project Type *</label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className={`w-full bg-dark-base border rounded-xl px-4 py-3.5 text-text-primary font-body text-sm outline-none focus:border-purple-primary transition-colors ${errors.projectType ? 'border-state-error' : 'border-dark-border'}`}
                    >
                      <option value="" disabled>Select...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-dark-base">{t}</option>
                      ))}
                    </select>
                    {errors.projectType && <p className="text-state-error text-xs mt-1.5 font-body">{errors.projectType}</p>}
                  </div>
                  
                  <div>
                    <label className="block font-body text-text-muted text-sm mb-2">Budget Range *</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className={`w-full bg-dark-base border rounded-xl px-4 py-3.5 text-text-primary font-body text-sm outline-none focus:border-purple-primary transition-colors ${errors.budget ? 'border-state-error' : 'border-dark-border'}`}
                    >
                      <option value="" disabled>Select...</option>
                      {budgets.map((b) => (
                        <option key={b} value={b} className="bg-dark-base">{b}</option>
                      ))}
                    </select>
                    {errors.budget && <p className="text-state-error text-xs mt-1.5 font-body">{errors.budget}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-text-muted text-sm mb-2">Timeline *</label>
                    <select
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      className={`w-full bg-dark-base border rounded-xl px-4 py-3.5 text-text-primary font-body text-sm outline-none focus:border-purple-primary transition-colors ${errors.timeline ? 'border-state-error' : 'border-dark-border'}`}
                    >
                      <option value="" disabled>Select...</option>
                      {timelines.map((t) => (
                        <option key={t} value={t} className="bg-dark-base">{t}</option>
                      ))}
                    </select>
                    {errors.timeline && <p className="text-state-error text-xs mt-1.5 font-body">{errors.timeline}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-body text-text-muted text-sm mb-2">Project Description *</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`w-full bg-dark-base border rounded-xl px-4 py-3.5 text-text-primary font-body text-sm placeholder-text-muted/40 outline-none focus:border-purple-primary transition-colors resize-none ${errors.description ? 'border-state-error' : 'border-dark-border'}`}
                    placeholder="Tell us about your goals, features you need, and any existing websites or inspirations you have."
                  />
                  {errors.description && <p className="text-state-error text-xs mt-1.5 font-body">{errors.description}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-purple-primary hover:bg-purple-dark text-dark-base font-heading font-bold px-10 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] text-lg shadow-[0_0_30px_rgba(125,64,255,0.3)]"
                  >
                    Send My Project Brief →
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-card rounded-3xl p-12 glow-border text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
              <h3 className="font-heading text-3xl font-bold text-text-primary mb-4">Project Brief Received!</h3>
              <p className="font-body text-text-muted text-lg max-w-lg mx-auto leading-relaxed">
                Thank you for reaching out. We will review your project details and get back to you at <strong className="text-text-primary">{form.email}</strong> within 24 hours to discuss the next steps.
              </p>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  )
}
