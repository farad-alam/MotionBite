'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

// Routes where the Navbar should be hidden (isolated landing pages)
const HIDDEN_ROUTES = ['/free-consultation']

export default function NavbarWrapper() {
  const pathname = usePathname()
  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null
  return <Navbar />
}
