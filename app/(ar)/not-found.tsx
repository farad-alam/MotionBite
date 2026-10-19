import NotFoundView from '@/components/layout/NotFoundView'
import { hasArabicHome } from '@/lib/landing'

// notFound() anywhere under /ar renders here, inside the Arabic (RTL) root layout.
// "Back to home" points at /ar only once the Arabic home page is published.
export default async function NotFound() {
  let arHome = false
  try {
    arHome = await hasArabicHome()
  } catch {
    arHome = false
  }
  return <NotFoundView locale="ar" homeHref={arHome ? '/ar' : '/'} />
}
