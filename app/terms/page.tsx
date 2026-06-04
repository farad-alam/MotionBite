import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | MotionBite',
  description: 'MotionBite terms of service — our policies for web design and development engagements.',
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-8">Terms of Service</h1>
        <div className="font-body text-text-muted leading-relaxed space-y-6">
          <p>Last updated: May 2026</p>
          <p>By engaging MotionBite for web design and development services, you agree to the following terms.</p>
          <h2 className="font-heading text-2xl text-text-primary mt-8">Services</h2>
          <p>MotionBite provides web design, development, and related digital services as agreed in each project scope. Deliverables, timelines, and pricing are confirmed in writing before work begins.</p>
          <h2 className="font-heading text-2xl text-text-primary mt-8">Payment</h2>
          <p>A 50% deposit is required to begin work. The remaining balance is due on the launch day. All prices are in USD unless otherwise agreed.</p>
          <h2 className="font-heading text-2xl text-text-primary mt-8">Revisions</h2>
          <p>Each package includes a defined number of revision rounds as stated in your proposal. Additional revisions beyond the included rounds are billed separately.</p>
          <h2 className="font-heading text-2xl text-text-primary mt-8">Intellectual Property</h2>
          <p>Upon full payment, you own all final deliverables. MotionBite retains the right to display completed work in our portfolio.</p>
          <h2 className="font-heading text-2xl text-text-primary mt-8">Contact</h2>
          <p>Questions? Email <a href="mailto:hello@motionbite.com" className="text-purple-primary hover:underline">hello@motionbite.com</a>.</p>
        </div>
      </div>
    </div>
  )
}
