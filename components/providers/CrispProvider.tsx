'use client'

import { useEffect } from 'react'

/**
 * Crisp live chat — deferred load so it never blocks render.
 *
 * Setup:
 * 1. Go to https://crisp.chat → create a free account → get your Website ID
 * 2. Add NEXT_PUBLIC_CRISP_WEBSITE_ID=your-id-here to .env.local
 * 3. Redeploy
 */
export default function CrispProvider() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    if (!id) return // silently skip if no ID configured

    // Defer Crisp load to after page is interactive (non-blocking)
    const timer = setTimeout(async () => {
      try {
        const { Crisp } = await import('crisp-sdk-web')
        Crisp.configure(id)
      } catch {
        // Crisp load failure should never break the site
      }
    }, 3000) // 3s delay — chat isn't needed immediately

    return () => clearTimeout(timer)
  }, [])

  return null
}
