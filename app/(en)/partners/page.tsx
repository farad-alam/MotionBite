import { SectionIndex, sectionIndexMetadata } from '@/components/landing/route'

export const revalidate = false

export const metadata = sectionIndexMetadata('partners')

export default function Page() {
  return <SectionIndex section="partners" />
}
