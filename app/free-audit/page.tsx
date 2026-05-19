import type { Metadata } from 'next'
import AuditForm from './AuditForm'

export const metadata: Metadata = {
  title: 'Free Website Audit — Find Out Why Your Site Isn\'t Converting',
  description:
    'Get a free 30-minute website audit. We\'ll review your site and tell you exactly what\'s costing you customers — no pitch, no obligation.',
}

export default function FreeAuditPage() {
  return <AuditForm />
}
