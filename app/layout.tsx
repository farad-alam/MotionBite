import type { Metadata } from 'next'
import { Oswald, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'
import { defaultMetadata } from '@/lib/seo'
import { organizationSchema } from '@/lib/schema'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
