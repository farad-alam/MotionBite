import { SectionIndex, sectionIndexMetadata } from '@/components/landing/route'

export const revalidate = false

export const metadata = sectionIndexMetadata('saudi')

export default function Page() {
  return <SectionIndex section="saudi" />
}
