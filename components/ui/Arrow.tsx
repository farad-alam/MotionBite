// An arrow that follows the reading direction: mirrored under dir="rtl" (WP3 5.3).
// On English pages it renders exactly the same character as before.
export default function Arrow({ back = false, className = '' }: { back?: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-block rtl:-scale-x-100 ${className}`.trim()}>
      {back ? '←' : '→'}
    </span>
  )
}
