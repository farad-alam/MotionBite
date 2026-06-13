'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'mb_exit_popup_shown'

export function useExitIntent(delay = 3000) {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    // If already shown in a previous session, never attach the listener
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) {
      return
    }

    let listenerAttached = false

    const timer = setTimeout(() => {
      const handler = (e: MouseEvent) => {
        if (e.clientY <= 0 && !listenerAttached) {
          listenerAttached = true
          // Persist so it never shows again across page loads / sessions
          localStorage.setItem(STORAGE_KEY, '1')
          setTriggered(true)
          document.removeEventListener('mouseleave', handler)
        }
      }
      document.addEventListener('mouseleave', handler)
    }, delay)

    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { triggered, dismiss: () => setTriggered(false) }
}
