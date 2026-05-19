import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | MotionBite',
  description: 'MotionBite privacy policy — how we collect, use, and protect your personal information.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none font-body text-text-muted leading-relaxed space-y-6">
          <p>Last updated: May 2026</p>
          <p>MotionBite (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights.</p>
          <h2 className="font-heading text-2xl text-text-primary mt-8">Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email address, and website URL when you submit the free audit form or contact us.</p>
          <h2 className="font-heading text-2xl text-text-primary mt-8">How We Use It</h2>
          <p>We use your information solely to respond to your enquiry, deliver the audit you requested, and improve our services. We do not sell or share your data with third parties.</p>
          <h2 className="font-heading text-2xl text-text-primary mt-8">Contact</h2>
          <p>Questions? Email us at <a href="mailto:hello@motionbite.com" className="text-green-primary hover:underline">hello@motionbite.com</a>.</p>
        </div>
      </div>
    </div>
  )
}
