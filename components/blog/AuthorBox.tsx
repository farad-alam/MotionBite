import Image from 'next/image'
import Link from 'next/link'
import type { SanityAuthor } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

interface AuthorBoxProps {
  author?: SanityAuthor | null
}

export default function AuthorBox({ author }: AuthorBoxProps) {
  // Fallback when no author is assigned yet
  if (!author) {
    return (
      <div className="flex items-start gap-4 bg-dark-card border border-dark-border rounded-xl p-5 mb-10">
        <div className="shrink-0 w-12 h-12 rounded-full bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-xl font-heading font-bold text-purple-primary select-none">
          MB
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading font-semibold text-text-primary text-sm leading-tight mb-0.5">
            MotionBite Team
          </p>
          <p className="font-body text-text-muted text-xs leading-relaxed mb-2">
            Web design &amp; development agency helping small businesses and restaurants get found
            online. We build fast, professional websites — delivered in 14 days.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="https://www.linkedin.com/company/motionbiteit/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-purple-primary hover:underline transition-colors"
            >
              LinkedIn
            </Link>
            <span className="text-dark-border">·</span>
            <Link
              href="https://x.com/motionbiteit"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-purple-primary hover:underline transition-colors"
            >
              X / Twitter
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const fullName = `${author.firstName} ${author.lastName}`.trim()
  const avatarUrl = author.avatar?.asset
    ? urlFor(author.avatar).width(96).height(96).format('webp').url()
    : null

  const socials = [
    { label: 'LinkedIn', href: author.linkedin },
    { label: 'X / Twitter', href: author.twitter },
    { label: 'Website', href: author.website },
    { label: 'Facebook', href: author.facebook },
  ].filter((s) => s.href)

  const initials = `${author.firstName?.[0] ?? ''}${author.lastName?.[0] ?? ''}`.toUpperCase()

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-10">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={author.avatar?.alt ?? fullName}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover border border-dark-border"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-lg font-heading font-bold text-purple-primary select-none">
              {initials || 'MB'}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <p className="font-heading font-semibold text-text-primary text-sm leading-tight">
              {fullName}
            </p>
            {author.yearsExperience && (
              <span className="font-body text-xs text-text-muted">
                · {author.yearsExperience}+ yrs experience
              </span>
            )}
          </div>

          {author.jobTitle && (
            <p className="font-body text-purple-primary text-xs mb-2">{author.jobTitle}</p>
          )}

          {author.shortBio && (
            <p className="font-body text-text-muted text-xs leading-relaxed mb-3">
              {author.shortBio}
            </p>
          )}

          {/* Expertise tags */}
          {author.expertiseAreas && author.expertiseAreas.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {author.expertiseAreas.map((area) => (
                <span
                  key={area}
                  className="font-body text-[10px] px-2 py-0.5 rounded-full bg-purple-primary/10 border border-purple-primary/20 text-purple-primary"
                >
                  {area}
                </span>
              ))}
            </div>
          )}

          {/* Social links + author page */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
            {socials.map((s, i) => (
              <span key={s.label} className="flex items-center gap-3">
                {i > 0 && <span className="text-dark-border">·</span>}
                <Link
                  href={s.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs text-purple-primary hover:underline transition-colors"
                >
                  {s.label}
                </Link>
              </span>
            ))}
            {socials.length > 0 && <span className="text-dark-border">·</span>}
            <Link
              href={`/authors/${author.slug.current}`}
              className="font-body text-xs text-purple-primary hover:underline transition-colors"
            >
              View all posts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
