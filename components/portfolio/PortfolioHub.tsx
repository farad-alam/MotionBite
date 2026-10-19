'use client'

import { useMemo, useState } from 'react'
import type { SanityPortfolioProject } from '@/sanity/queries'
import SanityVideoCard from '@/components/ui/SanityVideoCard'

const ALL = 'All'

function distinct(values: (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => !!v && v.trim() !== ''))).sort((a, b) =>
    a.localeCompare(b)
  )
}

function ChipRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div role="group" aria-label={label} className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
      {[ALL, ...options].map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={`shrink-0 whitespace-nowrap text-sm font-body px-4 py-2 rounded-full border transition-all duration-200 ${
              active
                ? 'bg-purple-primary text-dark-base border-purple-primary font-semibold'
                : 'bg-dark-card text-text-muted border-dark-border hover:border-purple-primary/40 hover:text-text-primary'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/**
 * WP6.3: industry (and, when any project has one, country) filter chips over the
 * case study grid. Filtering is client-side on the projects already loaded and
 * never touches the URL, so /portfolio keeps a single canonical.
 */
export default function PortfolioHub({ projects }: { projects: SanityPortfolioProject[] }) {
  const industries = useMemo(() => distinct(projects.map((p) => p.industry)), [projects])
  const countries = useMemo(() => distinct(projects.map((p) => p.clientCountry)), [projects])
  const [industry, setIndustry] = useState(ALL)
  const [country, setCountry] = useState(ALL)

  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(
      ({ project }) =>
        (industry === ALL || project.industry === industry) &&
        (country === ALL || project.clientCountry === country)
    )

  return (
    <>
      <div className="max-w-7xl mx-auto mb-10 space-y-3">
        <ChipRow label="Filter case studies by industry" options={industries} value={industry} onChange={setIndustry} />
        {countries.length > 0 && (
          <ChipRow label="Filter case studies by country" options={countries} value={country} onChange={setCountry} />
        )}
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {visible.map(({ project, index }) => (
          <SanityVideoCard key={project._id} project={project} priority={index < 2} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="text-center font-body text-text-muted mt-6">No case studies match this filter.</p>
      )}
    </>
  )
}
