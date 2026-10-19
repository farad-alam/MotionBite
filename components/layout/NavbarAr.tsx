'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { t } from '@/lib/i18n'
import Arrow from '@/components/ui/Arrow'

// Arabic navbar (WP3 5.2). A separate component, not a patched copy of Navbar:
// logical utilities only (ms-/me-/ps-/pe-/start-/end-/inset-x), no left/right.
// Links come from siteSettings.navAr, so the menu never points at an unpublished page.

type NavLink = { label: string; href: string }

const strings = t('ar')

export default function NavbarAr({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      const past = y > window.innerHeight * 0.8
      setScrolled(past)
      if (!past) setVisible(true)
      else if (y > lastScrollY.current + 5) setVisible(false)
      else if (y < lastScrollY.current - 5) setVisible(true)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -80 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-4xl flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-[#0f0f12]/85 border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl'
              : 'bg-[#0f0f12]/70 border-transparent backdrop-blur-lg'
          }`}
        >
          {/* Logo: not mirrored */}
          <Link href="/ar" className="flex items-center gap-3 shrink-0" aria-label="MotionBite">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 border border-white/20">
              <Image src="/logo.jpg" alt="MotionBite" width={80} height={80} className="w-full h-full object-cover scale-125" priority />
            </div>
            <bdi dir="ltr" className="font-heading text-base font-semibold text-text-primary tracking-wide hidden sm:block">
              Motion<span className="text-purple-primary">Bite</span>
            </bdi>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-text-muted hover:text-text-primary text-sm font-body px-3.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-white/8"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Language switch + CTA */}
          <div className="hidden md:flex items-center gap-2 shrink-0 ms-auto">
            <Link href="/" hrefLang="en" lang="en" className="text-text-muted hover:text-text-primary text-sm font-body px-3 py-1.5">
              English
            </Link>
            <Link
              href={cta.href}
              className="text-text-primary font-body font-semibold text-sm px-4 py-2 rounded-xl border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              {cta.label}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5 ms-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={strings.menu}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-dark-base/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 end-6 text-text-muted hover:text-text-primary text-2xl transition-colors"
              aria-label={strings.closeMenu}
            >
              ×
            </button>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-3xl text-text-primary hover:text-purple-primary transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/" hrefLang="en" lang="en" onClick={() => setMenuOpen(false)} className="font-body text-lg text-text-muted hover:text-text-primary">
              English
            </Link>
            <Link
              href={cta.href}
              onClick={() => setMenuOpen(false)}
              className="text-white font-body font-bold text-base px-8 py-3.5 rounded-xl mt-4 transition-all duration-200"
              style={{ backgroundColor: '#712EFF', boxShadow: 'rgba(255,255,255,0.72) 0px 2px 3px 0px inset' }}
            >
              {cta.label}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`fixed bottom-0 inset-x-0 z-30 md:hidden bg-dark-base/95 backdrop-blur-md border-t border-dark-border px-4 py-3 transition-transform duration-200 ${menuOpen ? 'translate-y-full' : 'translate-y-0'}`}>
        <Link
          href={cta.href}
          className="block w-full text-center text-white font-body font-semibold text-sm py-3 rounded-xl transition-all duration-200"
          style={{ backgroundColor: '#712EFF', boxShadow: 'rgba(255,255,255,0.72) 0px 2px 3px 0px inset' }}
        >
          {cta.label} <Arrow />
        </Link>
      </div>
    </>
  )
}
