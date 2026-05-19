import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About — MotionBite' }

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 flex items-center justify-center">
      <p className="font-heading text-text-muted text-2xl">About — coming soon</p>
    </div>
  )
}
