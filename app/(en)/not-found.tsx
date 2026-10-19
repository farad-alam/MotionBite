import NotFoundView from '@/components/layout/NotFoundView'

// notFound() anywhere in the English section renders here, inside the English root layout.
export default function NotFound() {
  return <NotFoundView locale="en" />
}
