// Copy for /free-website-audit (WP5.2, sheet row R026, live 2 Dec 2026).
//
// PLACEHOLDER COPY. The final copy (headline, intro, what the audit covers, FAQ,
// confirmation text, title and description) comes from sheet row R026 and is due
// before 27 Nov 2026. Replace the values below, then set AUDIT_COPY_IS_PLACEHOLDER
// to false: that removes the noindex and adds the page to the sitemap.
//
// Nothing here may promise a turnaround time or show a sample report until the
// owner confirms them (open questions 8 in the spec, due 20 Nov).

export const AUDIT_COPY_IS_PLACEHOLDER = true

// TODO(owner, open question 8): turnaround the page may promise, e.g. "within 3 working days".
// Rendered only when set.
export const AUDIT_TURNAROUND: string | null = null

// TODO(owner, open question 8): sample report to show (R026 "sample report" block).
// Rendered only when set.
export const AUDIT_SAMPLE_REPORT: { label: string; href: string } | null = null

export const auditCopy = {
  title: 'Free Website Audit', // TODO(R026): final <title>
  description: 'Request a free audit of your website from MotionBite.', // TODO(R026): final meta description
  badge: 'Free Website Audit',
  headline: 'Request a free website audit', // TODO(R026)
  intro: 'Tell us about your website and we will reply by email with what we find.', // TODO(R026)
  formHeading: 'Request your free audit',
  submitLabel: 'Request My Free Audit →',
  // TODO(R026): what the audit covers. Section hidden while empty.
  covers: [] as { title: string; desc: string }[],
  // TODO(R026): FAQ. Section and FAQPage JSON-LD hidden while empty.
  faq: [] as { q: string; a: string }[],
  confirmationTitle: 'Request received',
  confirmation: 'Thank you. We have your request and will reply by email with the findings.', // TODO(R026)
}
