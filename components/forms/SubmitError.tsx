import { CONTACT_EMAIL, WHATSAPP_URL } from '@/lib/lead-client'

export default function SubmitError({ message }: { message?: string }) {
  return (
    <div role="alert" className="rounded-md border border-state-error/40 bg-state-error/10 p-4 text-sm font-body text-text-primary">
      <p className="font-semibold mb-1">{message || 'Sorry, your message could not be sent.'}</p>
      <p className="text-text-muted">
        Please message us on{' '}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-purple-primary underline">
          WhatsApp
        </a>{' '}
        or email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-purple-primary underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </div>
  )
}
