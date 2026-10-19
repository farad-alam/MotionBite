import { SectionIndex, sectionIndexMetadata } from '@/components/landing/route'

export const revalidate = false

export const metadata = sectionIndexMetadata('resources')

export default function Page() {
  return <SectionIndex section="resources" />
}
