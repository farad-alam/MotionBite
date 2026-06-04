'use client'

import { useCounter } from '@/hooks/useCounter'

const stats = [
  { target: 50, suffix: '+', label: 'Websites Launched' },
  { target: 14, suffix: '', label: 'Days Average Delivery' },
  { target: 100, suffix: '%', label: 'Client Satisfaction' },
  { target: 0, suffix: '$', label: 'Hidden Fees', prefix: '$' },
]

function StatItem({ target, suffix, label, prefix }: { target: number; suffix: string; label: string; prefix?: string }) {
  const { count, ref } = useCounter(target)

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-purple-primary mb-2">
        {prefix}{count}{suffix}
      </p>
      <p className="font-body text-text-muted text-sm uppercase tracking-wider">{label}</p>
    </div>
  )
}

export default function Numbers() {
  return (
    <section className="bg-light-bg section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
