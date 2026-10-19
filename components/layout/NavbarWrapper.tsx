'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

// Routes where the Navbar should be hidden
const HIDDEN_ROUTES = ['/free-consultation', '/free-website-audit', '/start-project', '/studio']

export default function NavbarWrapper({ showArabic = false }: { showArabic?: boolean }) {
  const pathname = usePathname()
  if (pathname && HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null
  return <Navbar showArabic={showArabic} />
}
