import { SectionIndex, sectionIndexMetadata } from '@/components/landing/route'

export const revalidate = false

export const metadata = sectionIndexMetadata('research')

export default function Page() {
  return <SectionIndex section="research" />
}
