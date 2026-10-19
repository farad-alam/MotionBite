import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { organizationSchema } from '@/lib/schema'
import CrispProvider from '@/components/providers/CrispProvider'
import LenisProvider from '@/components/providers/LenisProvider'

/**
 * Shared by both root layouts (app/(en)/layout.tsx and app/(ar)/layout.tsx).
 * Renders the Organization JSON-LD. Place it inside <head>.
 */
export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}

/**
 * Shared by both root layouts: smooth scrolling, Google Analytics,
 * Vercel Analytics and the Crisp chat widget. Wrap the page body with it.
 */
export default function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      {children}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-4MZ7PGKCX1" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-4MZ7PGKCX1');
            `}
      </Script>
      <Analytics />
      <CrispProvider />
    </LenisProvider>
  )
}
