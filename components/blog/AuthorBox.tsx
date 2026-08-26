import Link from 'next/link'

export default function AuthorBox() {
  return (
    <div className="flex items-start gap-4 bg-dark-card border border-dark-border rounded-xl p-5 mb-10">
      {/* Avatar */}
      <div className="shrink-0 w-12 h-12 rounded-full bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center text-xl font-heading font-bold text-purple-primary select-none">
        MB
      </div>

      {/* Info */}
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
            aria-label="MotionBite on LinkedIn"
          >
            LinkedIn
          </Link>
          <span className="text-dark-border">·</span>
          <Link
            href="https://x.com/motionbiteit"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-purple-primary hover:underline transition-colors"
            aria-label="MotionBite on X / Twitter"
          >
            X / Twitter
          </Link>
          <span className="text-dark-border">·</span>
          <Link
            href="https://motionbite.com"
            className="font-body text-xs text-purple-primary hover:underline transition-colors"
          >
            motionbite.com
          </Link>
        </div>
      </div>
    </div>
  )
}
