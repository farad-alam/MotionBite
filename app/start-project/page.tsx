import type { Metadata } from 'next'
import ProjectForm from './ProjectForm'

export const metadata: Metadata = {
  title: 'Start Your Web Design Project | MotionBite',
  description:
    'Ready to start your project? Tell us about your business, budget, and timeline. We\'ll get back to you within 24 hours to map out your success.',
  keywords: [
    'start web design project',
    'hire web design agency',
    'hire web developer',
    'start website project',
    'web design project inquiry',
  ],
  openGraph: {
    type: 'website',
    title: 'Start Your Web Design Project | MotionBite',
    description:
      'Ready to start your project? Tell us about your business, budget, and timeline. We\'ll get back to you within 24 hours to map out your success.',
    url: 'https://motionbite.com/start-project',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Your Web Design Project | MotionBite',
    description:
      'Ready to start your project? Tell us about your business, budget, and timeline. We\'ll get back to you within 24 hours to map out your success.',
  },
}

export default function StartProjectPage() {
  return <ProjectForm />
}
