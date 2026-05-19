'use client'

import { useEffect, useState } from 'react'

export function useExitIntent(delay = 3000) {
  const [triggered, setTriggered] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const handler = (e: MouseEvent) => {
        if (e.clientY <= 0 && !shown) {
          setTriggered(true)
          setShown(true)
        }
      }
      document.addEventListener('mouseleave', handler)
      return () => document.removeEventListener('mouseleave', handler)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, shown])

  return { triggered, dismiss: () => setTriggered(false) }
}
