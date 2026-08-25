'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

// Routes where the Navbar should be hidden
const HIDDEN_ROUTES = ['/free-consultation', '/start-project', '/studio']

export default function NavbarWrapper() {
  const pathname = usePathname()
  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null
  return <Navbar />
}
