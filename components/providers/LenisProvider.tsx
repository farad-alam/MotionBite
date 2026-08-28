'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export default function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  if (pathname?.startsWith('/studio')) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
