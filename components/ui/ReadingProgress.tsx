'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ReadingProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-dark-border">
      <div
        className="h-full bg-purple-primary transition-none"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
