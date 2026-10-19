import { notFound } from 'next/navigation'

// Deeper unmatched /ar/... URLs (e.g. /ar/a/b) would otherwise reach the English
// global 404. Routing them here keeps them in the Arabic layout. Always 404.
export default function ArabicCatchAll() {
  notFound()
}
