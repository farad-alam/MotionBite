'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

// Routes where the Footer should be hidden
const HIDDEN_ROUTES = ['/free-consultation', '/start-project', '/studio']

export default function FooterWrapper() {
  const pathname = usePathname()
  if (pathname && HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null
  return <Footer />
}
